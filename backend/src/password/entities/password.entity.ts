import { User } from "src/user/entities/user.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Password {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  login: string

  @Column()
  password: string;

  @Column()
  creationDate: Date

  @ManyToOne(() => User, (user) => user.passwords)
  user: User;


}
