// Step 1: Create the higher-order function
function operateOnArray(arr, callback) {
    return arr.map(callback);  // Applies the callback to each element
}

// Step 2: Callback functions
// Function to double the number
const doubleNumber = (num) => num * 2;

// Function to square the number
const squareNumber = (num) => num ** 2;

// Function to convert number to string
const numberToString = (num) => `Number: ${num}`;

// Step 3: Sample array of numbers
const numbers = [1, 2, 3, 4, 5];

// Step 4: Using the higher-order function
console.log("✅ Doubled Numbers:", operateOnArray(numbers, doubleNumber));
console.log("✅ Squared Numbers:", operateOnArray(numbers, squareNumber));
console.log("✅ Numbers as Strings:", operateOnArray(numbers, numberToString));
