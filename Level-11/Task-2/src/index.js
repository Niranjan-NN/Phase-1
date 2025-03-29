// Declaring variables with different data types
const myString = "Hello, Niranjan!";   // String
const myNumber = 20;                   // Number
const myBoolean = true;                // Boolean
const myNull = null;                   // Null
let myUndefined;                       // Undefined
const myObject = { name: "Niranjan", age: 20 }; // Object

// Using typeof to check data types
console.log("Type of myString:", typeof myString);
console.log("Type of myNumber:", typeof myNumber);
console.log("Type of myBoolean:", typeof myBoolean);
console.log("Type of myNull:", typeof myNull);  // Outputs 'object' (quirk in JavaScript)
console.log("Type of myUndefined:", typeof myUndefined);
console.log("Type of myObject:", typeof myObject);

// String to Number Conversion
const strNumber = "123";              // String containing a number
const convertedNumber = parseInt(strNumber);

console.log(`Converted '${strNumber}' to Number:`, convertedNumber);
