import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}

  // Ivan Germano: Método para criar sessão
  async createSession(userId: number): Promise<string> {
    const sessionToken = randomBytes(32).toString('hex');
    const session = new Session();
    session.userId = userId;
    session.sessionToken = sessionToken;
    session.createdAt = new Date();
    session.expiresAt = new Date(Date.now() + 3600000); // Expiração em 1 hora.

    await this.sessionRepository.save(session);
    return sessionToken;
  }

  // Ivan Germano: Método para buscar a sessão pelo token.
  async findSessionByToken(sessionToken: string): Promise<Session | null> {
    const session = await this.sessionRepository.findOne({
      where: { sessionToken, isActive: true },
    });

    return session || null;
  }

  // Ivan Germano: Método para verificar se a sessão é valida.
  async validateSession(sessionToken: string): Promise<boolean> {
    const session = await this.sessionRepository.findOne({
      where: { sessionToken, isActive: true },
    });

    if (!session || session.expiresAt < new Date()) {
      return false;
    }

    return true;
  }

  // Ivan Germano: Método para invalidar a sessão.
  async invalidateSession(sessionToken: string): Promise<void> {
    // Ivan Germano: Aqui é buscado no BD a Sessão
    const session = await this.sessionRepository.findOne({ where: { sessionToken, isActive: true } });

    if (!session) {
      // Ivan Germano: Se a sessão não for encontrada ou estiver inativa, significa que já foi invalidada ou é inválida
      throw new Error('Sessão inválida ou já foi encerrada.');
    }

    // Ivan Germano: Aqui marcar a Sessão como Inativa
    session.isActive = false;
    await this.sessionRepository.save(session);
  }
}
