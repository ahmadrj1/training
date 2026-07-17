interface Address {
  city: string;
  zipCode: string;
}

interface Student {
  id: number;
  name: string;
  age: number;
  email: string;
  address: Address;
  grades: number[];
  active: boolean;
}

const students: Student[] = [
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

function getStudentById(id: number, list: Student[]): Student | undefined {
  return list.find((student) => student.id === id);
}

function getStudentByName(name: string, list: Student[]): Student | undefined {
  return list.find(
    (student) => student.name.toLowerCase() === name.toLowerCase(),
  );
}

function updateStudentEmail(
  id: number,
  newEmail: string,
  list: Student[],
): Student | undefined {
  const student = getStudentById(id, list);

  if (student) {
    student.email = newEmail;
  }

  return student;
}

function addGrade(
  id: number,
  grade: number,
  list: Student[],
): Student | undefined {
  const student = getStudentById(id, list);

  if (student) {
    student.grades.push(grade);
  }

  return student;
}

function calculateAverageMarks(student: Student): number {
  const total = student.grades.reduce((sum, grade) => sum + grade, 0);
  return total / student.grades.length;
}

function getTopStudent(list: Student[]): Student {
  return list.reduce((top, current) => {
    const topAverage = calculateAverageMarks(top);
    const currentAverage = calculateAverageMarks(current);

    return currentAverage > topAverage ? current : top;
  });
}

function iterateStudents(list: Student[]): void {
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

function demonstrateDestructuring(student: Student): void {
  const {
    name,
    age,
    address: { city },
    grades: [firstGrade, secondGrade],
  } = student;

  console.log(
    `Destructured student: ${name}, ${age}, ${city}, ${firstGrade}, ${secondGrade}`,
  );
}

function copyAndUpdateStudent(student: Student): Student {
  return {
    ...student,
    address: {
      ...student.address,
      city: "Rawalpindi",
    },
    grades: [...student.grades, 90],
  };
}

function showObjectUtilities(student: Student): void {
  console.log("Object.keys:", Object.keys(student));
  console.log("Object.values:", Object.values(student));
  console.log("Object.entries:", Object.entries(student));
}

function runDemo(): void {
  console.log("Initial students:", students);

  const updatedStudent = updateStudentEmail(
    101,
    "aisha.new@example.com",
    students,
  );
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


/*

Output on Terminal:

ahmadraza@Ahmad-Razas-MacBook-Pro training % node dist/test.js 
Initial students: [
  {
    id: 101,
    name: 'Aisha Khan',
    age: 20,
    email: 'aisha@example.com',
    address: { city: 'Lahore', zipCode: '54000' },
    grades: [ 88, 91, 84 ],
    active: true
  },
  {
    id: 102,
    name: 'Bilal Ahmed',
    age: 21,
    email: 'bilal@example.com',
    address: { city: 'Karachi', zipCode: '75000' },
    grades: [ 76, 82, 79 ],
    active: true
  },
  {
    id: 103,
    name: 'Sara Ali',
    age: 19,
    email: 'sara@example.com',
    address: { city: 'Islamabad', zipCode: '44000' },
    grades: [ 95, 97, 93 ],
    active: false
  }
]
Updated student email: {
  id: 101,
  name: 'Aisha Khan',
  age: 20,
  email: 'aisha.new@example.com',
  address: { city: 'Lahore', zipCode: '54000' },
  grades: [ 88, 91, 84 ],
  active: true
}
Updated grades: [ 88, 91, 84, 95 ]
Found by ID: {
  id: 102,
  name: 'Bilal Ahmed',
  age: 21,
  email: 'bilal@example.com',
  address: { city: 'Karachi', zipCode: '75000' },
  grades: [ 76, 82, 79 ],
  active: true
}
Found by name: {
  id: 103,
  name: 'Sara Ali',
  age: 19,
  email: 'sara@example.com',
  address: { city: 'Islamabad', zipCode: '44000' },
  grades: [ 95, 97, 93 ],
  active: false
}
Average marks for first student: 89.50
Top performing student: Sara Ali
For loop:
Aisha Khan
Bilal Ahmed
Sara Ali

For...of loop:
Aisha Khan
Bilal Ahmed
Sara Ali

For...in loop:
Aisha Khan - aisha.new@example.com
Bilal Ahmed - bilal@example.com
Sara Ali - sara@example.com
Destructured student: Bilal Ahmed, 21, Karachi, 76, 82
Copied and updated student: {
  id: 103,
  name: 'Sara Ali',
  age: 19,
  email: 'sara@example.com',
  address: { city: 'Rawalpindi', zipCode: '44000' },
  grades: [ 95, 97, 93, 90 ],
  active: false
}
Object.keys: [
  'id',      'name',
  'age',     'email',
  'address', 'grades',
  'active'
]
Object.values: [
  103,
  'Sara Ali',
  19,
  'sara@example.com',
  { city: 'Islamabad', zipCode: '44000' },
  [ 95, 97, 93 ],
  false
]
Object.entries: [
  [ 'id', 103 ],
  [ 'name', 'Sara Ali' ],
  [ 'age', 19 ],
  [ 'email', 'sara@example.com' ],
  [ 'address', { city: 'Islamabad', zipCode: '44000' } ],
  [ 'grades', [ 95, 97, 93 ] ],
  [ 'active', false ]
]
ahmadraza@Ahmad-Razas-MacBook-Pro training % 

*/