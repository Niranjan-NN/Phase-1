const fs = require('fs');

// Directory name
const dirName = 'new_folder';

// Check if the directory exists
if (!fs.existsSync(dirName)) {
    // Create the directory
    fs.mkdir(dirName, (err) => {
        if (err) {
            console.error(`❌ Error creating directory:`, err);
            return;
        }
        console.log(`✅ Directory "${dirName}" created successfully!`);
    });
} else {
    console.log(`⚠️ Directory "${dirName}" already exists.`);
}
