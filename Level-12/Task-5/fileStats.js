const fs = require('fs');

// File to check
const fileName = 'sample.txt';

// Get file stats
fs.stat(fileName, (err, stats) => {
    if (err) {
        console.error(`Error fetching stats for "${fileName}":`, err);
        return;
    }

    console.log(`📄 File Information for "${fileName}":`);
    console.log(`- Size: ${stats.size} bytes`);
    console.log(`- Created On: ${new Date(stats.birthtime).toLocaleString()}`);
    console.log(`- Last Modified: ${new Date(stats.mtime).toLocaleString()}`);
});
