import { Consent } from 'src/consent/entities/consent.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('consent_update')
export class ConsentUpdate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  consent_id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Consent)
  consent: Consent;

  @CreateDateColumn()
  dataUpdate: Date;
}
