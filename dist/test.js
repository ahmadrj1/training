"use strict";
const students = [
    {
        id: 101,
        name: "Aisha Khan",
        age: 20,
        email: "aisha@example.com",
        address: { city: "Lahore", zipCode: "54000" },
        grades: [88, 91, 84],
        active: true,
    },
    {
        id: 102,
        name: "Bilal Ahmed",
        age: 21,
        email: "bilal@example.com",
        address: { city: "Karachi", zipCode: "75000" },
        grades: [76, 82, 79],
        active: true,
    },
    {
        id: 103,
        name: "Sara Ali",
        age: 19,
        email: "sara@example.com",
        address: { city: "Islamabad", zipCode: "44000" },
        grades: [95, 97, 93],
        active: false,
    },
];
function getStudentById(id, list) {
    return list.find((student) => student.id === id);
}
function getStudentByName(name, list) {
    return list.find((student) => student.name.toLowerCase() === name.toLowerCase());
}
function updateStudentEmail(id, newEmail, list) {
    const student = getStudentById(id, list);
    if (student) {
        student.email = newEmail;
    }
    return student;
}
function addGrade(id, grade, list) {
    const student = getStudentById(id, list);
    if (student) {
        student.grades.push(grade);
    }
    return student;
}
function calculateAverageMarks(student) {
    const total = student.grades.reduce((sum, grade) => sum + grade, 0);
    return total / student.grades.length;
}
function getTopStudent(list) {
    return list.reduce((top, current) => {
        const topAverage = calculateAverageMarks(top);
        const currentAverage = calculateAverageMarks(current);
        return currentAverage > topAverage ? current : top;
    });
}
function iterateStudents(list) {
    console.log("For loop:");
    for (let index = 0; index < list.length; index += 1) {
        console.log(list[index].name);
    }
    console.log("\nFor...of loop:");
    for (const student of list) {
        console.log(student.name);
    }
    console.log("\nFor...in loop:");
    for (const index in list) {
        const student = list[index];
        console.log(`${student.name} - ${student.email}`);
    }
}
function demonstrateDestructuring(student) {
    const { name, age, address: { city }, grades: [firstGrade, secondGrade], } = student;
    console.log(`Destructured student: ${name}, ${age}, ${city}, ${firstGrade}, ${secondGrade}`);
}
function copyAndUpdateStudent(student) {
    return {
        ...student,
        address: {
            ...student.address,
            city: "Rawalpindi",
        },
        grades: [...student.grades, 90],
    };
}
function showObjectUtilities(student) {
    console.log("Object.keys:", Object.keys(student));
    console.log("Object.values:", Object.values(student));
    console.log("Object.entries:", Object.entries(student));
}
function runDemo() {
    console.log("Initial students:", students);
    const updatedStudent = updateStudentEmail(101, "aisha.new@example.com", students);
    console.log("Updated student email:", updatedStudent);
    addGrade(101, 95, students);
    console.log("Updated grades:", students[0].grades);
    const foundById = getStudentById(102, students);
    const foundByName = getStudentByName("sara ali", students);
    console.log("Found by ID:", foundById);
    console.log("Found by name:", foundByName);
    const averageMarks = calculateAverageMarks(students[0]);
    console.log("Average marks for first student:", averageMarks.toFixed(2));
    const topStudent = getTopStudent(students);
    console.log("Top performing student:", topStudent.name);
    iterateStudents(students);
    demonstrateDestructuring(students[1]);
    const copiedStudent = copyAndUpdateStudent(students[2]);
    console.log("Copied and updated student:", copiedStudent);
    showObjectUtilities(students[2]);
}
runDemo();
