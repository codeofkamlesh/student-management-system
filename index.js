#! /usr/bin/env node
import inquirer from "inquirer";
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 500;
    }
    enroll_course(course) {
        this.courses.push(course);
    }
    view_balance() {
        console.log(`Balance for ${this.name} : ${this.balance}`);
    }
    pay_fees(amount) {
        this.balance -= amount;
        console.log(`$${amount} fees paid successfully for ${this.name}`);
    }
    show_status() {
        console.log(`ID ${this.id}`);
        console.log(`Name ${this.name}`);
        console.log(`Courses ${this.courses}`);
        console.log(`Balance ${this.balance}`);
    }
}
class Student_manager {
    students;
    constructor() {
        this.students = [];
    }
    add_student(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(`Student: ${name} added successfully. student ID: ${student.id}`);
    }
    enroll_student(student_id, course) {
        let student = this.students.find((std) => std.id === student_id);
        if (student) {
            student.enroll_course(course);
            console.log(`${student.name} enrolled in ${course} sucessfully`);
        }
    }
    view_student_balance(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.view_balance();
        }
        else {
            console.log("student not found. please enter correct student ID");
        }
    }
    pay_student_fees(student_id, amount) {
        let student = this.find_student(student_id);
        if (student) {
            student.pay_fees(amount);
        }
        else {
            console.log("student not found. please enter correct student ID");
        }
    }
    show_student_status(student_id) {
        let student = this.find_student(student_id);
        if (student) {
            student.show_status();
        }
    }
    find_student(student_id) {
        return this.students.find((std) => std.id === student_id);
    }
}
async function main() {
    console.log("Welcome to Student Management System");
    console.log("=".repeat(38));
    let student_manager = new Student_manager();
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: "What you want to do?",
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit",
                ],
            },
        ]);
        switch (choice.choice) {
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: "Enter a student Name",
                    },
                ]);
                student_manager.add_student(name_input.name);
                break;
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID",
                    },
                    {
                        name: "course",
                        type: "input",
                        message: "Enter Course Name",
                    },
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;
            case "View Student Balance":
                let balance_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID",
                    },
                ]);
                student_manager.view_student_balance(balance_input.student_id);
                break;
            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID",
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: "Enter the amount to pay",
                    },
                ]);
                student_manager.pay_student_fees(fees_input.student_id, fees_input.amount);
                break;
            case "Show Status":
                let Status_input = await inquirer.prompt([
                    {
                        name: "student_id",
                        type: "number",
                        message: "Enter student ID",
                    },
                ]);
                student_manager.show_student_status(Status_input.student_id);
                break;
            case "Exit":
                console.log("Exiting....");
                process.exit();
        }
    }
}
main();
