import "reflect-metadata"
import { DataSource } from "typeorm"
import { Student } from "./entity/Student"
import { StudentCard } from "./entity/StudentCard"
import { Course } from "./entity/Course"
import { Teacher } from "./entity/Teacher"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "typeorm_feladat",
    synchronize: true,
    logging: false,
    entities: [Student, StudentCard, Course, Teacher],
    migrations: [],
    subscribers: [],
})