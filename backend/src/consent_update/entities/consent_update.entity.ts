import { Consent } from 'src/consent/entities/consent.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from 'typeorm';

@Entity('consent_update')
export class ConsentUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  consent_id: number;

  @Column()
  oldStatus: boolean;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Consent)
  @JoinColumn({ name: 'consent_id' })
  consent: Consent;

  @CreateDateColumn()
  dataUpdate: Date;
}
