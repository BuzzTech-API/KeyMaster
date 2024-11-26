import { Password } from 'src/password/entities/password.entity';
import { UserHasConsent } from 'src/user_has_consent/entities/user_has_consent.entity';
import { Session } from '../../session/entities/session.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    // Ivan Germano: Criei esse novo campo booleano para sabermos se o usuário é um adm ou não.
    @Column()
    isSuperUser: boolean;

    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    //Chave para o usuário descriptografar suas senhas. 
    @Column()
    userKey: string

    @OneToMany(() => Password, (password) => password.user,{ cascade: ['remove'] })
    passwords: Password[];

    @OneToMany(() => UserHasConsent, (uhc) => uhc.user)
    consent: UserHasConsent[];

    @OneToMany(() => Session, (session) => session.user, { cascade: ['remove'] })
    sessions: Session[];

}
