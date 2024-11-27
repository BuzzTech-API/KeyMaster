import { TermOfCondition } from 'src/term-of-condition/entities/term-of-condition.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Consent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  isOptional: boolean;

  @Column()
  termOfCondition_id: number;

  @ManyToOne(() => TermOfCondition, (tc) => tc.consent)
  @JoinColumn({ name: 'termOfCondition_id' })
  termOfCondition: TermOfCondition;
}
