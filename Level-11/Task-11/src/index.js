// Step 1: Create a 3x3 multiplication table using nested loops
console.log("3x3 Multiplication Table:\n");

// Step 2: Outer loop for rows
for (let i = 1; i <= 3; i++) {
    let row = ""; // Initialize an empty string for each row

    // Step 3: Inner loop for columns
    for (let j = 1; j <= 3; j++) {
        row += `${i} x ${j} = ${i * j} \t`;  // Use tab for proper spacing
    }

    console.log(row);  // Step 4: Print each row
}
