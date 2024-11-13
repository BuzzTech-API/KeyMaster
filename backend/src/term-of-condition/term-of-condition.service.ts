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
    private readonly termOfConditionRepository: Repository<TermOfCondition>,
  ) {}

  async create(
    createTermOfConditionDto: CreateTermOfConditionDto,
  ): Promise<TermOfCondition> {
    const newTermOfCondition = {
      isValid: true,
      pdfLink: createTermOfConditionDto.pdfLink,
      aplicationDate: new Date(),
    };

    const oldTerm = await this.termOfConditionRepository.findOne({
      where: { isValid: true },
    });
    if (oldTerm !== null) {
      oldTerm.isValid = false;
      await this.termOfConditionRepository.save(oldTerm);
    }

    return await this.termOfConditionRepository.save(newTermOfCondition);
  }

  async findAll(): Promise<TermOfCondition> {
    const metadata = this.termOfConditionRepository.metadata; // pega as informações da entidade
    const relations = metadata.relations.map(
      (relation) => relation.propertyName,
    ); // pega o nome de todas as relações
    relations.push('consent');
    return await this.termOfConditionRepository.findOne({
      where: { isValid: true },
      relations: relations,
    });
  }

  async findOne(id: number): Promise<TermOfCondition> {
    const termOfConditionData = await this.termOfConditionRepository.findOneBy({
      id,
    });
    if (!termOfConditionData) {
      throw new HttpException('Term Of Condition not found!', 404);
    }
    return termOfConditionData;
  }

  async update(
    id: number,
    updateTermOfConditionDto: UpdateTermOfConditionDto,
  ): Promise<TermOfCondition> {
    const termOfCondition = await this.findOne(id);
    const termOfConditionData = this.termOfConditionRepository.merge(
      termOfCondition,
      updateTermOfConditionDto,
    );
    return await this.termOfConditionRepository.save(termOfConditionData);
  }

  async remove(id: number): Promise<TermOfCondition> {
    const termOfCondition = await this.findOne(id);
    return await this.termOfConditionRepository.remove(termOfCondition);
  }
}
