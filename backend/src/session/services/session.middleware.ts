import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { SessionService } from './session.service';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  constructor(private readonly sessionService: SessionService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // Ivan Germano: Obtém o token de sessão dos cookies
    const sessionToken = req.cookies['session_token']; 

    if (sessionToken) {
      // Ivan Germano: Chama a função `validateSession` para verificar a validade da sessão
      const isValid = await this.sessionService.validateSession(sessionToken);

      if (isValid) {
        // Ivan Germano: Se a sessão for válida, permite a continuidade do processamento
        next();
      } else {
        // Ivan Germano: Se a sessão não for válida, retorna erro de autenticação
        res.status(401).json({ message: 'Sessão inválida ou expirada. Faça login novamente.' });
      }
    } else {
      res.status(401).json({ message: 'Nenhum token de sessão encontrado. Faça login novamente.' });
    }
  }
}
