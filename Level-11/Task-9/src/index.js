// Step 1: Create variables
const firstName = "Niranjan";
const lastName = "NN";
const age = 21;

// Step 2: Template literal with string interpolation
const intro = `Hello! My name is ${firstName} ${lastName} and I am ${age} years old.`;

// Step 3: Multi-line template literal with calculation
const multiLineText = `
Fun Fact:
- My birth year is ${2025 - age}.
- Next year, I'll be ${age + 1} years old!
`;

// Step 4: Template literal with a ternary operator
const ageMessage = `${age >= 18 ? "You are an adult." : "You are a minor."}`;

// Step 5: Print all results to the console
console.log(intro);
console.log(multiLineText);
console.log(ageMessage);
