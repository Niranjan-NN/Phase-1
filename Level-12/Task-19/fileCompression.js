const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

// File paths
const inputFile = path.join(__dirname, 'sample.txt');
const compressedFile = path.join(__dirname, 'sample.txt.gz');
const decompressedFile = path.join(__dirname, 'decompressedSample.txt');

// Compress Function
function compressFile(inputFile, compressedFile) {
    const readStream = fs.createReadStream(inputFile);
    const writeStream = fs.createWriteStream(compressedFile);
    const gzip = zlib.createGzip();

    readStream.pipe(gzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log(`✅ Compression successful! Compressed file: "${compressedFile}"`);
        decompressFile(compressedFile, decompressedFile);  // Auto-decompress after compression
    });

    writeStream.on('error', (err) => console.error(`❌ Compression error:`, err));
}

// Decompress Function
function decompressFile(compressedFile, decompressedFile) {
    const readStream = fs.createReadStream(compressedFile);
    const writeStream = fs.createWriteStream(decompressedFile);
    const gunzip = zlib.createGunzip();

    readStream.pipe(gunzip).pipe(writeStream);

    writeStream.on('finish', () => {
        console.log(`✅ Decompression successful! Decompressed file: "${decompressedFile}"`);

        // Verify content matches original
        const originalData = fs.readFileSync(inputFile, 'utf8');
        const decompressedData = fs.readFileSync(decompressedFile, 'utf8');

        if (originalData === decompressedData) {
            console.log(`✅ Verified: Decompressed content matches the original!`);
        } else {
            console.error(`❌ Verification failed: Decompressed content does not match.`);
        }
    });

    writeStream.on('error', (err) => console.error(`❌ Decompression error:`, err));
}

// Run compression
compressFile(inputFile, compressedFile);
