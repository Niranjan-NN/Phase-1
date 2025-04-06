const fs = require('fs');
const crypto = require('crypto');

const decryptFile = (inputPath, outputPath, password, algorithm = 'aes-256-cbc') => {
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);

  let iv;

  input.once('readable', () => {
    iv = input.read(16); // Read first 16 bytes for IV
    const key = crypto.scryptSync(password, 'salt', 32);
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    input.pipe(decipher).pipe(output);
  });

  output.on('finish', () => {
    console.log('✅ File decrypted successfully!');
  });
};

module.exports = decryptFile;
