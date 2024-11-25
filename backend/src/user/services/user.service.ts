import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { EncryptionService } from './encryption.service';
import { GetUserDTO } from '../dto/get-user.dto';
import { UserHasConsent } from 'src/user_has_consent/entities/user_has_consent.entity';
import { SessionService } from '../../session/services/session.service'; // Ivan Germano: Importando o serviço de sessão
import * as crypto from 'crypto';
import { PasswordEncryptionService } from 'src/password/services/passwordEncryption.service';
import { BlacklistService } from '../../blacklist/services/blacklist.service';  // Ivan Germano: Importando o serviço responsável pela BlackList
import { Logger } from '../../utils/Logger';
import * as fs from 'fs';
import * as path from 'path';
import { userInfo } from 'os';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserHasConsent)
    private readonly userHasConsentRepository: Repository<UserHasConsent>,

    // Ivan Germano: Aqui estamos injetando nosso serviço de criptografia em UserService.
    private readonly encryptionService: EncryptionService,

    // Ivan Germano: Aqui estamos injetando nosso serviço de sessão em UserService.
    private readonly sessionService: SessionService,

    // Lemon: Aqui estamos injetando nosso serviço de critografia em PasswordService
    private readonly passwordEncryptionService: PasswordEncryptionService,

    // Ivan Germano: Aqui estamos injetando o serviço de blacklisting em UserService.
    private readonly blacklistService: BlacklistService, // Injetar o BlacklistService para registrar o usuário excluído
  ) { }

  async getConsentimentosPorUsuario(usuarioId: number) {
    return this.userHasConsentRepository.find({
      where: { user_id: usuarioId },
      relations: ['consent'],
    });
  }


  async create(createUserDto: CreateUserDto): Promise<User> {
    // Ivan Germano: Aqui definimos a variavel 'hashedPassword para usar o serviço de criptografia com a função 'hashedPassword'.
    const hashedPassword = await this.encryptionService.hashPassword(
      createUserDto.password,
    );
    createUserDto.password = hashedPassword;

    //gera uma string aleatoria de 64 caracteres
    const randomString = crypto.randomBytes(32).toString('hex');
    //encrypta a string com a chave mestra
    const encryptedKey = await this.passwordEncryptionService.encryptKey(randomString)
    createUserDto.userKey = encryptedKey

    const userData = await this.userRepository.save(createUserDto);
    return userData;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const userData = await this.userRepository.findOneBy({ id });
    if (!userData) {
      throw new HttpException('User not found!', 404);
    }
    return userData;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    //Hash da senha
    if(updateUserDto.password){
      const hashedPassword = await this.encryptionService.hashPassword(updateUserDto.password)
      updateUserDto.password = hashedPassword
    }
    const user = await this.findOne(id)
    const userData = this.userRepository.merge(
      user,
      updateUserDto
    )
    console.log('Updating: ', userData)
    return await this.userRepository.save(userData)
  }

  // async remove(id: number): Promise<User> {
  //   const user = await this.findOne(id)
  //   return await this.userRepository.remove(user)
  // }

  // Ivan Germano: Função de exclusão física do usuário e adição do usuário a blacklist no MongoDB
  async deleteUser(userId: number): Promise<void> {
    try {
      // Ivan Germano: Procurar pelo usuário para confirmar a existência
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new HttpException('Usuário não encontrado.', 404);
      }

      // Ivan Germano: Registro no log de exclusão local
      await this.registerDeletionLog(user);

      // Ivan Germano: Remover o usuário do banco de dados
      await this.userRepository.remove(user);
      
      // Ivan Germano: Registrar o usuário excluído na blacklist (MongoDB)
      await this.blacklistService.addUserToBlacklist(userId);
 
      // console.log(`Usuário ${userId}, removido com sucesso`);


    } catch (error) {
      console.error('Erro ao excluir o usuário:', error.message);
      throw new HttpException('Erro ao excluir o usuário', 500);
    }
  }

  // Ivan Germano: Função para salvar o log de exclusão em um arquivo JSON.
  private async registerDeletionLog(user: User): Promise<void> {
    // Ivan Germano: Aqui estamos ajustando o caminho para garantir que ele aponte para a raiz do backend de forma arbitrária.
    const logFilePath = path.resolve(process.cwd(), 'logs', 'deletion_log.json');
    // Ivan Germano: Log de debug para verificar o caminho que está sendo gerado.
    Logger.log('blacklist', `Caminho absoluto para o arquivo de log: , {logFilePath}`);

    const logEntry = {
      userId: user.id,
      deletedAt: new Date().toISOString(),
    };

    try {
      // Criar a pasta logs se não existir.
      const logDir = path.dirname(logFilePath);
      if (!fs.existsSync(logDir)) {
        console.log(`Pasta ${logDir} não encontrada. Criando a pasta.`);
        fs.mkdirSync(logDir, { recursive: true });
    }

      // Ivan Germano: Se o arquivo já existe, lemos e atualizamos o conteúdo.
      if (fs.existsSync(logFilePath)) {
        const existingData = fs.readFileSync(logFilePath, 'utf8');
        const logs = existingData ? JSON.parse(existingData) : [];
        logs.push(logEntry);
        fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2));
      } else {
        // Ivan Germano: Senão criamos um novo arquivo de deleção de usuários.
        fs.mkdirSync(path.dirname(logFilePath), { recursive: true });
        fs.writeFileSync(logFilePath, JSON.stringify([logEntry], null, 2));
      }
      Logger.log('blacklist', `Log de exclusão do usuário ${user.id} salvo com sucesso.`);
    } catch (error) {
      console.error('Erro ao salvar o log de exclusão:', error.message);
    }
  }

  // Ivan Germano: Função de "Fallback" resposável por ler o "deletion_log.json" e extrair os UserIds da BlackList!
  private async getDeletedUsersFromLog(): Promise<string[]> {
    const logFilePath = path.resolve(process.cwd(), 'logs', 'deletion_log.json');

    if (!fs.existsSync(logFilePath)) {
      Logger.log('blacklist', 'Arquivo de log de deleção não encontrado.');
      return [];
    }

    try {
      const logData = fs.readFileSync(logFilePath, 'utf8');
      const logs = JSON.parse(logData);
      return logs.map((log) => log.userId);
    } catch (error) {
      console.error('Erro ao ler o arquivo de log de deleção:', error.message);
      return [];
    }
  }

  // Ivan Germano: Função de sanitização, responsável por conferir no mongoDB se os usuários da "blacklist" ainda estão presentes no BD
  // caso verdadeiro chama a função de deleteUser para excluílo novamente do sistema.
  async sanitizeRestoredData(): Promise<void> {
    try {
      let blacklistedUsersFromDB = [];
      let blacklistedUsersFromLog = [];

      // Ivan Germano: Aqui a função tenta obter todos os usuários na blacklist do MongoDB
      try {
        blacklistedUsersFromDB = await this.blacklistService.getAllBlacklistedUsers();
        Logger.log('blacklist', 'Usuários obtidos do MongoDB.');

      } catch (error) {
        console.error('Erro ao obter usuários da blacklist do MongoDB:', error.message);
      }

      // Ivan Germano: Aqui a função tentar obter usuários do arquivo de log de deleção - Redundancia atuando como função de FallBack
      try {
        blacklistedUsersFromLog = await this.getDeletedUsersFromLog();
        Logger.log('blacklist', 'Usuários obtidos do arquivo de log de deleção.');
      } catch (error) {
        console.error('Erro ao ler o arquivo de log de deleção:', error.message);
      }

      // Ivan Germano: Unificando as duas listas, removendo duplicatas
      const allBlacklistedUserIds = new Set([
        ...blacklistedUsersFromDB.map((user) => user.userId),
        ...blacklistedUsersFromLog,
      ]);

      if (allBlacklistedUserIds.size === 0) {
        Logger.log('blacklist', 'Nenhum usuário na blacklist. Não há necessidade de sanitização.');
        return;
      }

      let sanitizationCount = 0; // Contador para usuários sanitizados

      for (const userId of allBlacklistedUserIds) {
        // Verificar se o usuário ainda existe no banco de dados principal
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (user) {
          // Caso o usuário exista, chamamos a função para deletar o usuário fisicamente novamente
          await this.deleteUser(userId);
          Logger.log('blacklist', `Usuário ${userId} foi sanitizado (removido novamente do sistema).`);
          sanitizationCount++;
        } else {
          Logger.log('blacklist', `Usuário ${userId} já não existe no sistema. Nenhuma ação necessária.`);
        }
      }

      if (sanitizationCount > 0) {
        Logger.log('blacklist', `Sanitização concluída com sucesso. ${sanitizationCount} usuário(s) removido(s) do sistema.`);
      } else {
        Logger.log('blacklist', 'Nenhum usuário foi sanitizado, pois todos já estavam removidos.');
      }

    } catch (error) {
      console.error('Erro ao realizar sanitização:', error.message);
    }
  }

  // Ivan Germano: Função de login para verificar as credenciais do usuário e criar uma sessão.
  async login(loginUserDto: LoginUserDto): Promise<{ user: User; sessionToken: string }> {
    const { email, password } = loginUserDto;

    // Ivan Germano: Aqui verifica se o email digitado existe no banco de dados.
    Logger.log('login',`Procurando usuário com email:', ${email}`); // Verificar busca de usuário
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      console.log('login',`Email INCORRETO ou não existe!`);
      throw new HttpException('Email INCORRETO ou não existe!', 401);
    }

    // Ivan Germano: Aqui verifica se a senha corresponde a criptografia.

    const isPasswordValid = await this.encryptionService.comparePasswords(password, user.password);
    Logger.log('login', `Senha válida?, ${isPasswordValid}`); // Verificar validação de senha
    if (!isPasswordValid) {
      console.log('Senha INCORRETA!');
      throw new HttpException('Senha INCORRETA!', 401);
    }
    // Ivan Germano: Retorna o usuário em caso de sucesso
    Logger.log('login',`Login bem-sucedido para usuário: ${user.email}`);

     // Ivan Germano: Após o login bem sucedido criar uma sessão e retornar o token
    const sessionToken = await this.sessionService.createSession(user.id);
    Logger.log('session', `Sessão criada com token: ${sessionToken}`);
    return {user, sessionToken}; 
  }

  async logout(sessionToken: string): Promise<void> {
    await this.sessionService.invalidateSession(sessionToken);
  }
}
