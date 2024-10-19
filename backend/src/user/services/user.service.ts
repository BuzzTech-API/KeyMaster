import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { EncryptionService } from './encryption.service';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    // Ivan Germano: Aqui estamos injetando nosso serviço de criptografia em UserService.
    private readonly encryptionService: EncryptionService 
  ){}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Ivan Germano: Aqui definimos a variavel 'hashedPassword para usar o serviço de criptografia com a função 'hashedPassword'.
    const hashedPassword = await this.encryptionService.hashPassword(createUserDto.password);
    createUserDto.password = hashedPassword;

    const userData = await this.userRepository.save(createUserDto);
    return userData;
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find()
  }

  async findOne(id: number): Promise<User> {
    const userData = await this.userRepository.findOneBy({id})
    if (!userData) {
      throw new HttpException(
        'User not found!', 404
      )
    }
    return userData
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id)
    const userData = this.userRepository.merge(
      user,
      updateUserDto
    )
    return await this.userRepository.save(userData)
  }

  async remove(id: number): Promise<User> {
    const user = await this.findOne(id)
    return await this.userRepository.remove(user)
  }

  // Ivan Germano: Função de login para verificar as credenciais do usuário
  async login(loginUserDto: LoginUserDto): Promise<User> {
    const { email, password } = loginUserDto;

    // Ivan Germano: Aqui verifica se o email digitado existe no banco de dados.
    console.log('Procurando usuário com email:', email); // Verificar busca de usuário
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      console.log("Email INCORRETO ou não existe!");
      throw new HttpException('Email INCORRETO ou não existe!', 401);
    }

    // Ivan Germano: Aqui verifica se a senha corresponde a criptografia.
    const isPasswordValid = await this.encryptionService.comparePasswords(password, user.password);
    console.log('Senha válida?', isPasswordValid); // Verificar validação de senha
    if (!isPasswordValid) {
      console.log("Senha INCORRETA!");
      throw new HttpException('Senha INCORRETA!', 401);
    }
    // Ivan Germano: Retorna o usuário em caso de sucesso
    console.log('Login bem-sucedido para usuário:', user.email);
    console.log(user)
    return user; 
  }
}
