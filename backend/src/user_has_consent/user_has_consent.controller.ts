import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserHasConsentService } from './user_has_consent.service';
import { CreateUserHasConsentDto } from './dto/create-user_has_consent.dto';
import { UpdateUserHasConsentDto } from './dto/update-user_has_consent.dto';

@Controller('user-has-consent')
export class UserHasConsentController {
  constructor(private readonly userHasConsentService: UserHasConsentService) {}

  @Post()
  create(@Body() createUserHasConsentDto: CreateUserHasConsentDto) {
    return this.userHasConsentService.create(createUserHasConsentDto);
  }

  @Get()
  findAll() {
    return this.userHasConsentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userHasConsentService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserHasConsentDto: UpdateUserHasConsentDto) {
    return this.userHasConsentService.update(+id, updateUserHasConsentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userHasConsentService.remove(+id);
  }
}
