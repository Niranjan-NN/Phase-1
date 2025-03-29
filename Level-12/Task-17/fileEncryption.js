const fs = require('fs');
const crypto = require('crypto');

// Encryption settings
const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32); // Strong encryption key
const iv = crypto.randomBytes(16); // Initialization vector for added security

// File paths
const inputFile = 'sensitiveData.txt';
const encryptedFile = 'encryptedData.txt';
const decryptedFile = 'decryptedData.txt';

// Encrypt function
function encryptFile(inputFile, outputFile) {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);

    input.pipe(cipher).pipe(output);

    output.on('finish', () => {
        console.log(`✅ Encryption successful! Encrypted content saved to "${outputFile}"`);
        decryptFile(encryptedFile, decryptedFile); // Automatically decrypt after encrypting
    });

    output.on('error', (err) => console.error(`❌ Encryption error:`, err));
}

// Decrypt function
function decryptFile(inputFile, outputFile) {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    const input = fs.createReadStream(inputFile);
    const output = fs.createWriteStream(outputFile);

    input.pipe(decipher).pipe(output);

    output.on('finish', () => {
        console.log(`✅ Decryption successful! Decrypted content saved to "${outputFile}"`);

        // Verify the decrypted content matches the original
        const originalData = fs.readFileSync(inputFile, 'utf8');
        const decryptedData = fs.readFileSync(outputFile, 'utf8');

        if (originalData === decryptedData) {
            console.log(`✅ Verified: Decrypted content matches the original!`);
        } else {
            console.error(`❌ Verification failed: Decrypted content does not match.`);
        }
    });

    output.on('error', (err) => console.error(`❌ Decryption error:`, err));
}

// Run encryption
encryptFile(inputFile, encryptedFile);
