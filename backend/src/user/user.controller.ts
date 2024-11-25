import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, HttpStatus, HttpCode} from '@nestjs/common';
import { UserService } from './services/user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { Request, Response } from 'express';
import { Logger } from '../utils/Logger';
import { SessionService } from '../session/services/session.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sessionService: SessionService,
  ) {}

  // Ivan Germano: Rota responsável para criar um novo usuário.
  @Post('create')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return await this.userService.create(createUserDto);
  }

  // Ivan Germano: Rota para teste de sanitização dos dados no BD relacional.
  @Post('sanitize')
  async sanitizeData(): Promise<string> {
    await this.userService.sanitizeRestoredData();
    return 'Sanitização concluída com sucesso';
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

  // Ivan Germano: Endpoint para deletar o usuário (apaga as sessões em cascata automaticamente)
  @Delete(':id')
  async deleteUser(
    @Param('id') userId: number,
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<void> {
    const sessionToken = request.cookies['session_token'];

    if (sessionToken) {
      // Verificar se a sessão está ativa antes de proceder com a exclusão do usuário
      const isValidSession = await this.sessionService.validateSession(sessionToken);
      if (!isValidSession) {
        response
          .status(401)
          .json({ message: 'Sessão inválida ou expirada. Faça login novamente.' });
        return;
      }

      // Deletar o usuário e remover as sessões associadas em cascata
      await this.userService.deleteUser(userId);

      // Limpar o cookie da sessão
      response.clearCookie('session_token');
      Logger.log('blacklist', `Usuário ${userId} foi excluído com sucesso.`);

      // Redirecionar ou responder com uma mensagem de sucesso
      response.status(200).json({ message: 'Conta excluída com sucesso. Redirecionando para login.' });
    } else {
      response.status(400).json({ message: 'Nenhuma sessão ativa encontrada' });
    }
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
