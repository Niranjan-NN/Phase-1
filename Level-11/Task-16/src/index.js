// Step 1: Create the "createCounter" function
function createCounter() {
    let count = 0; // Initialize count variable (closure variable)

    // Step 2: Return an inner function that increments and returns the count
    return function () {
        count++;
        return count;
    };
}

// Step 3: Create two independent counters
const counter1 = createCounter();
const counter2 = createCounter();

// Step 4: Increment each counter multiple times and print the results
console.log(`🔹 Counter 1 Value: ${counter1()}`);  // 1
console.log(`🔹 Counter 1 Value: ${counter1()}`);  // 2
console.log(`🔹 Counter 2 Value: ${counter2()}`);  // 1
console.log(`🔹 Counter 1 Value: ${counter1()}`);  // 3
console.log(`🔹 Counter 2 Value: ${counter2()}`);  // 2
console.log(`🔹 Counter 2 Value: ${counter2()}`);  // 3
