// Step 1: Create an array of student objects
const students = [
    { name: "Niranjan", age: 21, grades: [85, 90, 78] },
    { name: "Dinesh", age: 19, grades: [88, 76, 95] },
    { name: "Vimal", age: 22, grades: [92, 89, 84] },
    { name: "Visalachi", age: 20, grades: [80, 70, 88] },
    { name: "Swasthick", age: 23, grades: [75, 90, 82] }
];

// Step 2: Extract names using map()
const studentNames = students.map(student => student.name);
console.log("✅ Student Names:", studentNames);

// Step 3: Filter students older than 20
const studentsOver20 = students.filter(student => student.age > 20);
console.log("✅ Students Older Than 20:", studentsOver20);

// Step 4: Calculate the average grade for all students
const totalGrades = students.reduce((sum, student) => 
    sum + student.grades.reduce((a, b) => a + b, 0) / student.grades.length, 0);
const averageGrade = totalGrades / students.length;
console.log(`✅ Average Grade for All Students: ${averageGrade.toFixed(2)}`);

// Step 5: Chain methods to calculate the average grade of students older than 20
const avgGradeOver20 = students
    .filter(student => student.age > 20)
    .reduce((sum, student, _, array) => 
        sum + student.grades.reduce((a, b) => a + b, 0) / student.grades.length / array.length, 0);

console.log(`✅ Average Grade for Students Older Than 20: ${avgGradeOver20.toFixed(2)}`);
