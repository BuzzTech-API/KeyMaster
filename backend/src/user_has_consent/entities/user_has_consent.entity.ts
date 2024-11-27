import { Entity, Column, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
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

  @Column()
  dateAccepted: Date;

  @ManyToOne(() => User, (usuario) => usuario.consent)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Consent)
  @JoinColumn({ name: 'consent_id' })
  consent: Consent;
}
