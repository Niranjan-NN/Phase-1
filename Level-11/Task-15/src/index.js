// Step 1: Create a function called "divideNumbers"
function divideNumbers(a, b) {
    if (b === 0) {
        throw new Error("❌ Cannot divide by zero");  // Throw error for zero division
    }
    return a / b;
}

// Step 2: Test cases with try/catch/finally
function testDivision(num1, num2) {
    try {
        const result = divideNumbers(num1, num2);
        console.log(`✅ Result: ${num1} / ${num2} = ${result.toFixed(2)}`);
    } catch (error) {
        console.error(`🚨 Error: ${error.message}`);
    } finally {
        console.log("🔎 Division attempt completed.\n");
    }
}

// Step 3: Call the function with different inputs
testDivision(10, 2);  // Successful division
testDivision(15, 3);  // Successful division
testDivision(8, 0);   // Error (Cannot divide by zero)
testDivision(20, 5);  // Successful division
