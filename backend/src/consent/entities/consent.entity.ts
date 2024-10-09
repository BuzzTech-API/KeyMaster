import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Consent {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    content: string

    @Column()
    isOptional: boolean


}
