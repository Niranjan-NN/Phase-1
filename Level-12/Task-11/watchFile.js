const fs = require('fs');

// File to watch
const fileName = 'monitoredFile.txt';

// Check if the file exists
if (!fs.existsSync(fileName)) {
    console.error(`❌ Error: File "${fileName}" does not exist.`);
    process.exit(1); // Exit the script
}

// Watch for file changes
fs.watch(fileName, (eventType, filename) => {
    if (filename) {
        console.log(`🔍 File "${filename}" was ${eventType === 'rename' ? 'renamed' : 'modified'}.`);
    }
});

console.log(`👀 Watching for changes in "${fileName}"...`);
