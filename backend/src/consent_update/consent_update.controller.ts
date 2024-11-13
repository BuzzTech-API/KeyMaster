import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ConsentUpdateService } from './consent_update.service';
import { CreateConsentUpdateDto } from './dto/create-consent_update.dto';
import { UpdateConsentUpdateDto } from './dto/update-consent_update.dto';

@Controller('consent-update')
export class ConsentUpdateController {
  constructor(private readonly consentUpdateService: ConsentUpdateService) { }

  @Post()
  create(@Body() createConsentUpdateDto: CreateConsentUpdateDto) {
    return this.consentUpdateService.create(createConsentUpdateDto);
  }

  @Get()
  findAll() {
    return this.consentUpdateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.consentUpdateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateConsentUpdateDto: UpdateConsentUpdateDto,
  ) {
    return this.consentUpdateService.update(+id, updateConsentUpdateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.consentUpdateService.remove(+id);
  }

  @Put(':userId/consentimentos/:consentimentoId')
  alterarConsentimento(
    @Param('userId') userId: number,
    @Param('consentimentoId') consentimentoId: number,
    @Body('isAceito') isAceito: boolean,
  ) {
    return this.consentUpdateService.alterarConsentimento(
      userId,
      consentimentoId,
      isAceito,
    );
  }
}
