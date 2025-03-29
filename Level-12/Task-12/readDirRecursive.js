const fs = require('fs');
const path = require('path');

// Recursive function to read directory contents
function readDirectoryRecursive(dirPath) {
    try {
        const items = fs.readdirSync(dirPath);

        items.forEach((item) => {
            const fullPath = path.join(dirPath, item);

            if (fs.statSync(fullPath).isDirectory()) {
                console.log(`📁 [DIR] ${fullPath}`);
                readDirectoryRecursive(fullPath); // Recursive call for subdirectories
            } else {
                console.log(`📄 [FILE] ${fullPath}`);
            }
        });
    } catch (err) {
        console.error(`❌ Error reading directory "${dirPath}":`, err);
    }
}

// Starting point
const startDir = './testDir';
if (fs.existsSync(startDir)) {
    console.log(`📂 Reading contents of "${startDir}" recursively...\n`);
    readDirectoryRecursive(startDir);
} else {
    console.log(`⚠️ Directory "${startDir}" does not exist.`);
}
