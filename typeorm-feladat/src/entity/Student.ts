import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable } from "typeorm"
import { StudentCard } from "./StudentCard"
import { Course } from "./Course"

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    neptun: string

    @Column()
    email: string

    @OneToOne(() => StudentCard, studentCard => studentCard.student, { cascade: true })
    studentCard: StudentCard

    @ManyToMany(() => Course, course => course.students)
    @JoinTable()
    courses: Course[]
}