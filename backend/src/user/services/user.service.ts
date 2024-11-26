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
    private readonly passwordEncryptionService: PasswordEncryptionService

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

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id);
    return await this.userRepository.remove(user);
  }

  // Ivan Germano: Função de login para verificar as credenciais do usuário e criar uma sessão
  async login(loginUserDto: LoginUserDto): Promise<{ user: User; sessionToken: string }> {
    const { email, password } = loginUserDto;

    // Ivan Germano: Aqui verifica se o email digitado existe no banco de dados.
    console.log('Procurando usuário com email:', email); // Verificar busca de usuário
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      console.log('Email INCORRETO ou não existe!');
      throw new HttpException('Email INCORRETO ou não existe!', 401);
    }

    // Ivan Germano: Aqui verifica se a senha corresponde a criptografia.
    const isPasswordValid = await this.encryptionService.comparePasswords(
      password,
      user.password,
    );
    console.log('Senha válida?', isPasswordValid); // Verificar validação de senha
    if (!isPasswordValid) {
      console.log('Senha INCORRETA!');
      throw new HttpException('Senha INCORRETA!', 401);
    }
    // Ivan Germano: Retorna o usuário em caso de sucesso
    console.log('Login bem-sucedido para usuário:', user.email);

     // Ivan Germano: Após o login bem sucedido criar uma sessão e retornar o token
    const sessionToken = await this.sessionService.createSession(user.id);
    console.log('Sessão criada com token:', sessionToken);

    // console.log(user)
    return {user, sessionToken}; 
  }

  async logout(sessionToken: string): Promise<void> {
    await this.sessionService.invalidateSession(sessionToken);
  }
}
