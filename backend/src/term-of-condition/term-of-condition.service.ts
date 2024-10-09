import { Injectable } from '@nestjs/common';
import { CreateTermOfConditionDto } from './dto/create-term-of-condition.dto';
import { UpdateTermOfConditionDto } from './dto/update-term-of-condition.dto';

@Injectable()
export class TermOfConditionService {
  create(createTermOfConditionDto: CreateTermOfConditionDto) {
    return 'This action adds a new termOfCondition';
  }

  findAll() {
    return `This action returns all termOfCondition`;
  }

  findOne(id: number) {
    return `This action returns a #${id} termOfCondition`;
  }

  update(id: number, updateTermOfConditionDto: UpdateTermOfConditionDto) {
    return `This action updates a #${id} termOfCondition`;
  }

  remove(id: number) {
    return `This action removes a #${id} termOfCondition`;
  }
}
