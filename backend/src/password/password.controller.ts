import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasswordService } from './services/password.service';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Password } from './entities/password.entity';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post('user/:userId')
  create(
    @Param('userId') userId: number,
    @Body() passwordData: Partial<Password>
  ): Promise<Password> {
    return this.passwordService.create(passwordData, userId);
  }

  @Get()
  findAll() {
    return this.passwordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordService.findOne(+id);
  }

  @Get('user/:userId')
  async getPasswordsByUserId(@Param('userId') userId: number): Promise<Password[]> {
    return this.passwordService.getPasswordsByUserId(userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.update(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordService.remove(+id);
  }
}
