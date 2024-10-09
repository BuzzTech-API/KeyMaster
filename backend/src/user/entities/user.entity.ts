import { Password } from "src/password/entities/password.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    name: string

    @Column()
    password: string

    @OneToMany(() => Password, (password) => password.user)
    passwords: Password[];



}
