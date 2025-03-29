// Step 1: Create an object representing a product
const product = {
    name: "Wireless Headphones",
    price: 2999,
    category: "Electronics",
    inStock: true
};

// Step 2: Destructure properties into individual variables
const { name, price, category, inStock } = product;

// Step 3: Print destructured values
console.log(`Product Name: ${name}`);
console.log(`Price: ₹${price}`);
console.log(`Category: ${category}`);
console.log(`In Stock: ${inStock ? "Yes" : "No"}`);

// Step 4: Create a function that uses destructuring in the parameter list
function displayProductDetails({ name, price, category, inStock }) {
    return `🛒 Product Details:
- Name: ${name}
- Price: ₹${price}
- Category: ${category}
- Availability: ${inStock ? "In Stock" : "Out of Stock"}`;
}

// Step 5: Call the function and print the result
console.log(displayProductDetails(product));
