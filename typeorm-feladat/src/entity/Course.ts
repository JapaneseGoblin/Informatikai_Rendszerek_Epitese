import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from "typeorm"
import { Teacher } from "./Teacher"
import { Student } from "./Student"

@Entity()
export class Course {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    code: string

    @Column()
    credit: number

    @Column()
    maxStudents: number

    @ManyToOne(() => Teacher, teacher => teacher.courses)
    teacher: Teacher

    @ManyToMany(() => Student, student => student.courses)
    students: Student[]
}