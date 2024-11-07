import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res } from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { Request, Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Ivan Germano: Rota responsável para criar um novo usuário.
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.userService.create(createUserDto);
  }

  // Ivan Germano: Rota responsável pelo login do usuário
  @Post('login')
  async login(
    @Body() loginUserDto: LoginUserDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const { user, sessionToken } = await this.userService.login(loginUserDto);

      // Ivan Germano: Aqui armazenar o token de sessão em um cookie seguro
      res.cookie('session_token', sessionToken, {
        httpOnly: true,
        maxAge: 3600000, // 1 hora de validade
      });

      res.json({ message: 'Login realizado com sucesso', user });
    } catch (error) {
      res.status(error.status || 500).json({ message: error.message });
    }
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const sessionToken = req.cookies['session_token'];
    if (sessionToken) {
      await this.userService.logout(sessionToken);
      res.clearCookie('session_token');
      res.json({ message: 'Logout realizado com sucesso' });
    } else {
      res.status(400).json({ message: 'Nenhuma sessão ativa encontrada' });
    }
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
