const fs = require('fs');

// Data to append
const dataToAppend = "\nMore content here.";

// Append data to 'output.txt'
fs.appendFile('output.txt', dataToAppend, (err) => {
    if (err) {
        console.error('Error appending to file:', err);
        return;
    }
    console.log('Data successfully appended to output.txt!');
});
