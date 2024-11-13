import { Entity, Column, ManyToOne, PrimaryColumn } from 'typeorm';
import { Consent } from 'src/consent/entities/consent.entity';
import { User } from 'src/user/entities/user.entity';

@Entity('user_has_consent')
export class UserHasConsent {
  @PrimaryColumn()
  user_id: number;

  @PrimaryColumn()
  consent_id: number;

  @Column()
  isAccept: boolean;

  @ManyToOne(() => User, (usuario) => usuario.consent)
  user: User;

  @ManyToOne(() => Consent)
  consent: Consent;
}
