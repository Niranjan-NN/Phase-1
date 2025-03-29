// Step 1: Initialize counter variable
let sum = 0;

// Step 2: For loop to iterate from 1 to 10
console.log("Even numbers from 1 to 10:");

for (let i = 1; i <= 10; i++) {
    if (i % 2 === 0) {  // Check if number is even
        console.log(i);  // Print even number
        sum += i;        // Add to sum
    }
}

// Step 3: Print the final sum
console.log(`Sum of even numbers from 1 to 10: ${sum}`);
