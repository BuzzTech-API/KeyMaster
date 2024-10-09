import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class TermOfCondition {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pdfLink: string

    @Column()
    aplicationDate: Date

    @Column()
    isValid: boolean

}
