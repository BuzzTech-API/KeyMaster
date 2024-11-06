import { Controller, Get, Post, Req, Res } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { Request, Response } from 'express';
import { UserService } from 'src/user/services/user.service';

@Controller('session')
export class SessionController {
  constructor(
    private readonly sessionService: SessionService,
    private readonly userService: UserService,
  ) {}

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    // Ivan Germano: Obtém o token de sessão dos cookies
    const sessionToken = req.cookies['session_token'];  
    if (sessionToken) {
      // Ivan Germano: Validação da Sessão
      await this.sessionService.invalidateSession(sessionToken); // Ivan Geramano: Invalidação da Sessão com o método 'invalidateSession'
      // Ivan Germano: Limpa o cookie de sessão no cliente
      res.clearCookie('session_token');
      res.json({ message: 'Logout realizado com sucesso' });
    } else {
      // Ivan Germano: Caso não exista token, retorna erro
      res.status(400).json({ message: 'Nenhuma sessão ativa encontrada' });
    }
  }

  @Get('current')
  async getUserSession(@Req() req: Request, @Res() res: Response) {
    const sessionToken = req.cookies['session_token'];

    if (!sessionToken) {
      return res.status(401).json({ message: 'Nenhum token de sessão encontrado. Faça login novamente.' });
    }

    const session = await this.sessionService.findSessionByToken(sessionToken);

    if (!session || !session.isActive) {
      return res.status(401).json({ message: 'Sessão inválida ou expirada. Faça login novamente.' });
    }

    const user = await this.userService.findOne(session.userId);
    res.json({ user });
  }
}
