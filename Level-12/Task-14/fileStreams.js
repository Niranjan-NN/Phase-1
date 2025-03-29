const fs = require('fs');

// File paths
const sourceFile = 'largeFile.txt';
const destinationFile = 'largeFileCopy.txt';

// Create read and write streams
const readStream = fs.createReadStream(sourceFile);
const writeStream = fs.createWriteStream(destinationFile);

// Track progress
let copiedBytes = 0;

// Get total file size for progress calculation
const totalBytes = fs.statSync(sourceFile).size;

// Listen for data chunks
readStream.on('data', (chunk) => {
    copiedBytes += chunk.length;
    const progress = ((copiedBytes / totalBytes) * 100).toFixed(2);
    console.log(`🔄 Progress: ${progress}%`);
});

// Handle errors
readStream.on('error', (err) => console.error(`❌ Error reading file:`, err));
writeStream.on('error', (err) => console.error(`❌ Error writing file:`, err));

// Completion message
readStream.on('end', () => console.log(`✅ Copy complete!`));

// Pipe the data from readStream to writeStream
readStream.pipe(writeStream);
