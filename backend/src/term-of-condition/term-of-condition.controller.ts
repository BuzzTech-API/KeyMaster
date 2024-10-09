import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TermOfConditionService } from './term-of-condition.service';
import { CreateTermOfConditionDto } from './dto/create-term-of-condition.dto';
import { UpdateTermOfConditionDto } from './dto/update-term-of-condition.dto';

@Controller('term-of-condition')
export class TermOfConditionController {
  constructor(private readonly termOfConditionService: TermOfConditionService) {}

  @Post()
  create(@Body() createTermOfConditionDto: CreateTermOfConditionDto) {
    return this.termOfConditionService.create(createTermOfConditionDto);
  }

  @Get()
  findAll() {
    return this.termOfConditionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.termOfConditionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTermOfConditionDto: UpdateTermOfConditionDto) {
    return this.termOfConditionService.update(+id, updateTermOfConditionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.termOfConditionService.remove(+id);
  }
}
