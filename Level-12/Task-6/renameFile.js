const fs = require('fs');

// File paths
const oldFileName = 'original.txt';
const newFileName = 'renamed.txt';

// Rename the file
fs.rename(oldFileName, newFileName, (err) => {
    if (err) {
        console.error(`❌ Error renaming file:`, err);
        return;
    }
    console.log(`✅ Successfully renamed "${oldFileName}" to "${newFileName}"`);
});
