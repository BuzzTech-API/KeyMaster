import { Consent } from 'src/consent/entities/consent.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class TermOfCondition {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pdfLink: string;

  @Column()
  aplicationDate: Date;

  @Column()
  isValid: boolean;

  @OneToMany(() => Consent, (c) => c.termOfCondition)
  consent: Consent[];
}
