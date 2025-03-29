const fs = require('fs');

// Reading the file
fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    console.log('File Contents:\n', data);
});
