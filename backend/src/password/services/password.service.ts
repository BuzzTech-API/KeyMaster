import { HttpException, Injectable } from '@nestjs/common';
import { CreatePasswordDto } from '../dto/create-password.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { Password } from '../entities/password.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { PasswordEncryptionService } from './passwordEncryption.service';
import Cryptr from 'cryptr';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private readonly passwordRepository: Repository<Password>,

    @InjectRepository(User)
    private userRepository: Repository<User>,

    private readonly passwordEncryptionService: PasswordEncryptionService
  ) { }


  async create(passwordData: Partial<Password>, userId: number): Promise<Password> {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    //Descriptografa a userKey com a chave mestra
    const decryptUserKey = this.passwordEncryptionService.decryptKey(user.userKey)
    //Cria o objeto de criptografia com a userKey descriptografada
    const userCryptr: Cryptr = new Cryptr(decryptUserKey)
    //Criptografa a senha
    const cryptPassword = userCryptr.encrypt(passwordData.password)
    //Salva a senha criptografada nos dados da senha que veio 
    passwordData.password = cryptPassword



    const newPassword = this.passwordRepository.create({
      ...passwordData,
      user: user, // Associate the user with the password
    });

    return await this.passwordRepository.save(newPassword);
  }

  async findAll(): Promise<Password[]> {
    return await this.passwordRepository.find()
  }

  async findOne(id: number): Promise<Password> {
    const passwordData = await this.passwordRepository.findOneBy({ id })
    if (!passwordData) {
      throw new HttpException(
        'Password not found!', 404
      )
    }
    return passwordData
  }

  async getPasswordsByUserId(userId: number): Promise<Password[]> {
    const passwords = await this.passwordRepository.find({
      where: { user: { id: userId } },
      relations: ['user'], // This ensures the user is included in the response
    });


    //Busca o usuário, descritografa a userKey, cria o objeto com a key descritografada
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const decryptUserKey = this.passwordEncryptionService.decryptKey(user.userKey)
    const userCryptr: Cryptr = new Cryptr(decryptUserKey)


    return passwords.map(password => ({
      ...password,
      password: userCryptr.decrypt(password.password) // Example transformation function
    }));
  }

  async update(id: number, updatePasswordDto: UpdatePasswordDto): Promise<Password> {
    const password = await this.findOne(id)
    const passwordData = this.passwordRepository.merge(
      password,
      updatePasswordDto
    )
    return await this.passwordRepository.save(passwordData)
  }

  async remove(id: number): Promise<Password> {
    const password = await this.findOne(id)
    return await this.passwordRepository.remove(password)
  }
}
