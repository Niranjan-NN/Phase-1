// Step 1: Create string variables
const fullName = "Niranjan NN";         // Full name
const hometown = "Coimbatore";          // Hometown

// Step 2: String manipulations
const upperCaseName = fullName.toUpperCase();         // Convert to uppercase
const nameLength = fullName.length;                   // Find the length
const firstName = fullName.split(" ")[0];             // Extract first name

// Step 3: String concatenation
const combinedString = "My name is " + fullName + " and I'm from " + hometown + ".";

// Step 4: Print results to console
console.log(`Uppercase Name: ${upperCaseName}`);
console.log(`Name Length: ${nameLength}`);
console.log(`First Name: ${firstName}`);
console.log(`Hometown: ${hometown}`);
console.log(`Concatenated String: ${combinedString}`);
