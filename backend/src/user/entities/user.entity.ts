import { Password } from "src/password/entities/password.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    // Ivan Germano: Criei esse novo campo booleano para sabermos se o usuário é um adm ou não.
    @Column()
    isSuperUser: boolean;

    @Column()
    email: string;

    @Column()
    name: string

    @Column()
    password: string

    @OneToMany(() => Password, (password) => password.user)
    passwords: Password[];



}
