// Step 1: Regular function declaration for multiplication
function multiply(a, b) {
    return a * b;
}

// Step 2: Function expression for division
const divide = function(a, b) {
    if (b === 0) {
        return "Cannot divide by zero!";
    }
    return a / b;
};

// Step 3: Arrow function for exponentiation (power)
const power = (base, exponent) => base ** exponent;

// Step 4: Function calls with sample data
console.log(`Multiply (5 × 3): ${multiply(5, 3)}`);     // Output: 15
console.log(`Divide (10 ÷ 2): ${divide(10, 2)}`);       // Output: 5
console.log(`Power (2^4): ${power(2, 4)}`);             // Output: 16

// Step 5: Testing division by zero
console.log(`Divide (5 ÷ 0): ${divide(5, 0)}`);         // Output: Cannot divide by zero!
