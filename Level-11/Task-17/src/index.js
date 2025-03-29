// Step 1: Creating two arrays
const fruits = ["🍎 Apple", "🍌 Banana", "🍉 Watermelon"];
const vegetables = ["🥕 Carrot", "🥦 Broccoli", "🌽 Corn"];

// Step 2: Combine arrays using the spread operator
const combinedArray = [...fruits, ...vegetables];
console.log("✅ Combined Array:", combinedArray);

// Step 3: Creating two objects
const personalInfo = { name: "Niranjan", age: 21 };
const contactInfo = { email: "niranjan@example.com", phone: "123-456-7890" };

// Step 4: Combine objects using the spread operator
const combinedObject = { ...personalInfo, ...contactInfo };
console.log("✅ Combined Object:", combinedObject);

// Step 5: Creating a copy of an array and modifying it
const originalArray = ["🚗 Car", "🚲 Bicycle", "🚕 Taxi"];
const copiedArray = [...originalArray]; // Creating a copy
copiedArray.push("✈️ Airplane");        // Modifying the copied array

console.log("✅ Original Array (Unchanged):", originalArray);
console.log("✅ Modified Copy:", copiedArray);
