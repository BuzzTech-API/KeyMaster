import { HttpException, Injectable } from '@nestjs/common';
import { CreateTermOfConditionDto } from './dto/create-term-of-condition.dto';
import { UpdateTermOfConditionDto } from './dto/update-term-of-condition.dto';
import { TermOfCondition } from './entities/term-of-condition.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class TermOfConditionService {
  constructor(
    @InjectRepository(TermOfCondition)
    private readonly termOfConditionRepository: Repository<TermOfCondition>
  ){}

  async create(createTermOfConditionDto: CreateTermOfConditionDto): Promise<TermOfCondition> {
    const termOfConditionData = await this.termOfConditionRepository.save(createTermOfConditionDto)
    return this.termOfConditionRepository.save(termOfConditionData)
  }

  async findAll(): Promise<TermOfCondition[]> {
    return await this.termOfConditionRepository.find()
  }

  async findOne(id: number): Promise<TermOfCondition> {
    const termOfConditionData = await this.termOfConditionRepository.findOneBy({id})
    if (!termOfConditionData) {
      throw new HttpException(
        'Term Of Condition not found!', 404
      )
    }
    return termOfConditionData
  }

  async update(id: number, updateTermOfConditionDto: UpdateTermOfConditionDto): Promise<TermOfCondition> {
    const termOfCondition = await this.findOne(id)
    const termOfConditionData = this.termOfConditionRepository.merge(
      termOfCondition,
      updateTermOfConditionDto
    )
    return await this.termOfConditionRepository.save(termOfConditionData)
  }

  async remove(id: number): Promise<TermOfCondition> {
    const termOfCondition = await this.findOne(id)
    return await this.termOfConditionRepository.remove(termOfCondition)
  }
}
