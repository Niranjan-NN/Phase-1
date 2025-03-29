const fs = require('fs');

// File to delete
const fileName = 'testFile.txt';

// Check if the file exists
if (fs.existsSync(fileName)) {
    // Delete the file
    fs.unlink(fileName, (err) => {
        if (err) {
            console.error(`❌ Error deleting file:`, err);
            return;
        }
        console.log(`✅ Successfully deleted "${fileName}"`);
    });
} else {
    console.log(`⚠️ File "${fileName}" does not exist.`);
}
