import { HttpException, Injectable } from '@nestjs/common';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Password } from './entities/password.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PasswordService {
  constructor(
    @InjectRepository(Password)
    private readonly passwordRepository: Repository<Password>
  ){}

  async create(createPasswordDto:CreatePasswordDto): Promise<Password> {
    const passwordData = await this.passwordRepository.save(createPasswordDto)
    return this.passwordRepository.save(passwordData)
  }

  async findAll(): Promise<Password[]> {
    return await this.passwordRepository.find()
  }

  async findOne(id: number): Promise<Password> {
    const passwordData = await this.passwordRepository.findOneBy({id})
    if (!passwordData) {
      throw new HttpException(
        'Password not found!', 404
      )
    }
    return passwordData
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
