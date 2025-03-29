const fs = require('fs');

// File path
const filePath = 'data.json';

// Read the JSON file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`❌ Error reading file:`, err);
        return;
    }

    try {
        // Parse JSON data
        const jsonData = JSON.parse(data);

        // ✅ Add a new item
        jsonData.push({
            id: 4,
            name: "Diana",
            age: 28
        });

        // ✅ Update an item
        const userToUpdate = jsonData.find(user => user.id === 2);
        if (userToUpdate) {
            userToUpdate.age = 31;  // Updated Bob's age
        }

        // ✅ Remove an item
        const updatedData = jsonData.filter(user => user.id !== 3); // Removed Charlie

        // Write the modified data back to the file
        fs.writeFile(filePath, JSON.stringify(updatedData, null, 4), (err) => {
            if (err) {
                console.error(`❌ Error writing file:`, err);
            } else {
                console.log(`✅ JSON data successfully modified and saved.`);
            }
        });

    } catch (parseError) {
        console.error(`❌ Error parsing JSON data:`, parseError);
    }
});
