import { Injectable } from '@nestjs/common';
import { CreateConsentUpdateDto } from './dto/create-consent_update.dto';
import { UpdateConsentUpdateDto } from './dto/update-consent_update.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserHasConsent } from 'src/user_has_consent/entities/user_has_consent.entity';
import { Repository } from 'typeorm';
import { ConsentUpdate } from './entities/consent_update.entity';

@Injectable()
export class ConsentUpdateService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserHasConsent)
    private readonly userHasConsentRepository: Repository<UserHasConsent>,

    @InjectRepository(ConsentUpdate)
    private readonly consentUpdateRepository: Repository<ConsentUpdate>,
  ) { }

  create(createConsentUpdateDto: CreateConsentUpdateDto) {
    return 'This action adds a new consentUpdate';
  }

  async alterarConsentimento(
    usuarioId: number,
    consentimentoId: number,
    isAceito: boolean,
  ) {
    const usuarioConsentimento = await this.userHasConsentRepository.findOne({
      where: { user_id: usuarioId, consent_id: consentimentoId },
    });

    if (usuarioConsentimento && usuarioConsentimento.consent.isOptional) {
      usuarioConsentimento.isAccept = isAceito;
      await this.userHasConsentRepository.save(usuarioConsentimento);

      const alteracao = new ConsentUpdate();
      alteracao.user_id = usuarioId;
      alteracao.consent_id = consentimentoId;
      await this.consentUpdateRepository.save(alteracao);
    }
  }

  findAll() {
    return `This action returns all consentUpdate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} consentUpdate`;
  }

  update(id: number, updateConsentUpdateDto: UpdateConsentUpdateDto) {
    return `This action updates a #${id} consentUpdate`;
  }

  remove(id: number) {
    return `This action removes a #${id} consentUpdate`;
  }
}
