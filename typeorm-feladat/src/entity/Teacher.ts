import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Course } from "./Course"

@Entity()
export class Teacher {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    department: string

    @Column()
    office: string

    @OneToMany(() => Course, course => course.teacher)
    courses: Course[]
}