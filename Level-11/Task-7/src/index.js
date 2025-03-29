// Step 1: Create an array of 5 favorite foods
let favoriteFoods = ["Pizza", "Burger", "Pasta", "Ice Cream", "Fries"];

// Step 2: Add an item to the end
favoriteFoods.push("Sushi"); // Adds 'Sushi' to the end

// Step 3: Remove the first item
favoriteFoods.shift(); // Removes 'Pizza'

// Step 4: Find the length of the array
const arrayLength = favoriteFoods.length;

// Step 5: Find the index of a specific food
const burgerIndex = favoriteFoods.indexOf("Burger");

// Step 6: Create a new array by slicing the original array (index 1 to 3)
const slicedFoods = favoriteFoods.slice(1, 3); // Includes index 1 and 2

// Step 7: Print all results to the console
console.log("Original Array (after modifications):", favoriteFoods);
console.log("Array Length:", arrayLength);
console.log("Index of 'Burger':", burgerIndex);
console.log("Sliced Array (Index 1 to 3):", slicedFoods);
