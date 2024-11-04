import { Controller, Post, Req, Res } from '@nestjs/common';
import { SessionService } from './services/session.service';
import { Request, Response } from 'express';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const sessionToken = req.cookies['session_token'];
    if (sessionToken) {
      await this.sessionService.invalidateSession(sessionToken);
      res.clearCookie('session_token');
      res.json({ message: 'Logout realizado com sucesso' });
    } else {
      res.status(400).json({ message: 'Nenhuma sessão ativa encontrada' });
    }
  }
}
