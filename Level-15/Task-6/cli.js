const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

function encryptFile(filePath, password) {
  const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(filePath + '.enc');

  input.pipe(cipher).pipe(output);

  output.on('finish', () => {
    console.log('✅ File encrypted successfully.');
    fs.writeFileSync(filePath + '.iv', iv.toString('hex'));
  });
}

function decryptFile(filePath, password) {
  const key = crypto.createHash('sha256').update(password).digest('base64').substr(0, 32);
  const ivPath = filePath.replace('.enc', '.iv');

  if (!fs.existsSync(ivPath)) {
    console.error('❌ IV file not found for decryption.');
    return;
  }

  const iv = Buffer.from(fs.readFileSync(ivPath, 'utf8'), 'hex');
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  const input = fs.createReadStream(filePath);
  const output = fs.createWriteStream(filePath.replace('.enc', '.dec'));

  input.pipe(decipher).pipe(output);

  output.on('finish', () => {
    console.log('✅ File decrypted successfully.');
  });
}

async function runCLI() {
  const { operation } = await inquirer.prompt([
    {
      type: 'list',
      name: 'operation',
      message: 'What would you like to do?',
      choices: ['Encrypt a file', 'Decrypt a file'],
    },
  ]);

  const { filePath, password } = await inquirer.prompt([
    {
      type: 'input',
      name: 'filePath',
      message: 'Enter the path to the file:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter the password:',
      mask: '*',
    },
  ]);

  if (operation === 'Encrypt a file') {
    encryptFile(filePath, password);
  } else {
    decryptFile(filePath, password);
  }
}

runCLI();
