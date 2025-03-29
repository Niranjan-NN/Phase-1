const fs = require('fs');

// Data to write
const data = "Hello, I'm Niranjan!";

// Writing data to 'output.txt'
fs.writeFile('output.txt', data, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
        return;
    }
    console.log('Data successfully written to output.txt!');
});
