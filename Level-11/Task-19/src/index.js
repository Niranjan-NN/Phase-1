// Step 1: Create a recursive factorial function
function factorial(n) {
    if (n < 0) {
        throw new Error("❌ Factorial is not defined for negative numbers.");
    }
    if (n === 0 || n === 1) {
        return 1; // Base condition
    }
    return n * factorial(n - 1); // Recursive case
}

// Step 2: Test the factorial function with various inputs
function testFactorial(value) {
    try {
        console.log(`✅ Factorial of ${value}: ${factorial(value)}`);
    } catch (error) {
        console.error(`🚨 Error: ${error.message}`);
    }
}

// Step 3: Test cases
testFactorial(5);  // 5! = 120
testFactorial(7);  // 7! = 5040
testFactorial(0);  // 0! = 1 (Edge case)
testFactorial(1);  // 1! = 1 (Edge case)
testFactorial(-3); // Error case: Negative number
