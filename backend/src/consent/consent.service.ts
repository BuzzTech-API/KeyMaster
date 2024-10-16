import { HttpException, Injectable } from '@nestjs/common';
import { CreateConsentDto } from './dto/create-consent.dto';
import { UpdateConsentDto } from './dto/update-consent.dto';
import { Consent } from './entities/consent.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ConsentService {
  constructor(
    @InjectRepository(Consent)
    private readonly consentRepository: Repository<Consent>
  ){}

  async create(createConsentDto:CreateConsentDto): Promise<Consent> {
    const consentData = await this.consentRepository.save(createConsentDto)
    return this.consentRepository.save(consentData)
  }

  async findAll(): Promise<Consent[]> {
    return await this.consentRepository.find()
  }

  async findOne(id: number): Promise<Consent> {
    const consentData = await this.consentRepository.findOneBy({id})
    if (!consentData) {
      throw new HttpException(
        'Consent not found!', 404
      )
    }
    return consentData
  }

  async update(id: number, updateConsentDto: UpdateConsentDto): Promise<Consent> {
    const consent = await this.findOne(id)
    const consentData = this.consentRepository.merge(
      consent,
      updateConsentDto
    )
    return await this.consentRepository.save(consentData)
  }

  async remove(id: number): Promise<Consent> {
    const consent = await this.findOne(id)
    return await this.consentRepository.remove(consent)
  }
}
