const fs = require('fs');

// File paths
const sourceFile = 'source.txt';
const destinationFile = 'destination.txt';

// Check if destination already exists
if (fs.existsSync(destinationFile)) {
    console.log(`⚠️ Destination file "${destinationFile}" already exists. Copy aborted.`);
} else {
    // Copy the file
    fs.copyFile(sourceFile, destinationFile, (err) => {
        if (err) {
            console.error(`❌ Error copying file:`, err);
            return;
        }
        console.log(`✅ Successfully copied "${sourceFile}" to "${destinationFile}"`);
    });
}
