import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
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
  async login(name: string, password: string): Promise<User> {
  const user = await this.userRepository.findOne({ where: { name } });

  if (!user) {
    throw new HttpException('Invalid credentials!', 401);
  }

  const isPasswordValid = await this.encryptionService.comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new HttpException('Invalid credentials!', 401);
  }

  return user;
  }
}