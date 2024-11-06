import { Controller, Post, Req, Res } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { Request, Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

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
}
