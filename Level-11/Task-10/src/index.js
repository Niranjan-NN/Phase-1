// Step 1: Create an array of numbers from 1 to 10
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Step 2: Use map() to square each number
const squaredNumbers = numbers.map(num => num ** 2);
console.log("Squared Numbers:", squaredNumbers);

// Step 3: Use filter() to get only odd numbers
const oddNumbers = numbers.filter(num => num % 2 !== 0);
console.log("Odd Numbers:", oddNumbers);

// Step 4: Use reduce() to calculate the sum of all numbers
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log("Sum of Numbers:", sum);

// Step 5: Use forEach() to print each number and its square root
console.log("Number and Square Roots:");
numbers.forEach(num => {
    console.log(`Number: ${num}, Square Root: ${Math.sqrt(num).toFixed(2)}`);
});
