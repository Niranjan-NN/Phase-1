const fs = require('fs');

// Directory path (current directory)
const dirPath = './';

// Read the contents of the directory
fs.readdir(dirPath, (err, items) => {
    if (err) {
        console.error(`❌ Error reading directory:`, err);
        return;
    }

    console.log(`📂 Contents of "${dirPath}":\n`);

    items.forEach((item) => {
        const itemPath = `${dirPath}/${item}`;
        const isDirectory = fs.statSync(itemPath).isDirectory();
        
        if (isDirectory) {
            console.log(`📁 [DIR] ${item}`);
        } else {
            console.log(`📄 [FILE] ${item}`);
        }
    });
});
