const fs = require('fs');

// File to check
const fileName = 'test.txt';

// Check if the file exists
if (fs.existsSync(fileName)) {
    console.log(`✅ The file "${fileName}" exists.`);
} else {
    console.log(`❌ The file "${fileName}" does NOT exist.`);
}
