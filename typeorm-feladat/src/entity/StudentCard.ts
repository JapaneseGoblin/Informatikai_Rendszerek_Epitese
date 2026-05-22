import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { Student } from "./Student"

@Entity()
export class StudentCard {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    cardNumber: string

    @Column()
    issueDate: Date

    @Column()
    expiryDate: Date

    @Column()
    status: string

    @OneToOne(() => Student, student => student.studentCard)
    @JoinColumn()
    student: Student
}