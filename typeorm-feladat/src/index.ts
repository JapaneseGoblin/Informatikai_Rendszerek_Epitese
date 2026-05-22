import "reflect-metadata"
import { AppDataSource } from "./data-source"
import { Student } from "./entity/Student"
import { StudentCard } from "./entity/StudentCard"
import { Course } from "./entity/Course"
import { Teacher } from "./entity/Teacher"

AppDataSource.initialize().then(async () => {
    console.log("Adatbázis kapcsolat létrejött!")

    // Tanárok
    const teacher1 = new Teacher()
    teacher1.name = "Dr. Kiss Péter"
    teacher1.email = "kiss.peter@uni.hu"
    teacher1.department = "Informatika"
    teacher1.office = "A101"

    const teacher2 = new Teacher()
    teacher2.name = "Dr. Nagy Anna"
    teacher2.email = "nagy.anna@uni.hu"
    teacher2.department = "Matematika"
    teacher2.office = "B202"

    await AppDataSource.manager.save([teacher1, teacher2])
    console.log("Tanárok mentve!")

    // Kurzusok
    const course1 = new Course()
    course1.name = "Webfejlesztés"
    course1.code = "WEB101"
    course1.credit = 4
    course1.maxStudents = 30
    course1.teacher = teacher1

    const course2 = new Course()
    course2.name = "Adatbázisok"
    course2.code = "DB201"
    course2.credit = 3
    course2.maxStudents = 25
    course2.teacher = teacher2

    const course3 = new Course()
    course3.name = "Algoritmusok"
    course3.code = "ALG301"
    course3.credit = 5
    course3.maxStudents = 20
    course3.teacher = teacher1

    await AppDataSource.manager.save([course1, course2, course3])
    console.log("Kurzusok mentve!")

    // Hallgatók
    const student1 = new Student()
    student1.name = "Kovács János"
    student1.neptun = "KOV123"
    student1.email = "kovacs.janos@edu.hu"
    student1.courses = [course1, course2]

    const card1 = new StudentCard()
    card1.cardNumber = "SC-001"
    card1.issueDate = new Date("2022-09-01")
    card1.expiryDate = new Date("2026-09-01")
    card1.status = "active"
    card1.student = student1
    student1.studentCard = card1

    const student2 = new Student()
    student2.name = "Szabó Eszter"
    student2.neptun = "SZA456"
    student2.email = "szabo.eszter@edu.hu"
    student2.courses = [course2, course3]

    const card2 = new StudentCard()
    card2.cardNumber = "SC-002"
    card2.issueDate = new Date("2022-09-01")
    card2.expiryDate = new Date("2026-09-01")
    card2.status = "active"
    card2.student = student2
    student2.studentCard = card2

    const student3 = new Student()
    student3.name = "Tóth Balázs"
    student3.neptun = "TOT789"
    student3.email = "toth.balazs@edu.hu"
    student3.courses = [course1, course3]

    const card3 = new StudentCard()
    card3.cardNumber = "SC-003"
    card3.issueDate = new Date("2023-09-01")
    card3.expiryDate = new Date("2027-09-01")
    card3.status = "active"
    card3.student = student3
    student3.studentCard = card3

    await AppDataSource.manager.save([student1, student2, student3])
    console.log("Hallgatók mentve!")

    console.log("Minden adat sikeresen feltöltve!")

}).catch(error => console.log("Hiba:", error))