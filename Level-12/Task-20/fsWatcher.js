const fs = require('fs');
const path = require('path');

// Directory to watch
const watchDir = path.join(__dirname, 'monitoredDir');
const logFile = path.join(__dirname, 'changeLog.txt');

// Ensure the log file exists
fs.writeFileSync(logFile, '📋 File Change Log\n\n', { flag: 'a' });

// Format timestamp
const getTimeStamp = () => {
    const now = new Date();
    return `[${now.toLocaleDateString()} ${now.toLocaleTimeString()}]`;
};

// Log changes to file and console
function logChange(message) {
    const logEntry = `${getTimeStamp()} ${message}\n`;
    console.log(logEntry);
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error(`❌ Error writing to log file:`, err);
    });
}

// Watcher logic
fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
    if (filename) {
        const filePath = path.join(watchDir, filename);

        // Track created files
        if (eventType === 'rename') {
            if (fs.existsSync(filePath)) {
                logChange(`📄 File Created: ${filename}`);
            } else {
                logChange(`❌ File Deleted: ${filename}`);
            }
        }

        // Track modified files
        if (eventType === 'change') {
            logChange(`✏️ File Modified: ${filename}`);
        }
    } else {
        console.warn(`⚠️ Unknown change detected.`);
    }
});

// Error Handling
process.on('uncaughtException', (err) => {
    console.error(`❌ Uncaught Exception:`, err);
});
