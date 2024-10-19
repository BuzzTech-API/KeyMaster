import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Ivan Germano: Rota responsável para criar um novo usuário.
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.userService.create(createUserDto);
  }

  // Ivan Germano: Rota responsável pelo login do usuário
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<User> {
      console.log('Recebendo requisição de login:', loginUserDto);
      return await this.userService.login(loginUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
