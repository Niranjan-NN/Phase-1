const fs = require('fs');
const path = require('path');
const os = require('os'); // For creating temp directories

// Create a temporary directory
fs.mkdtemp(path.join(os.tmpdir(), 'tempDir-'), (err, tempDir) => {
    if (err) {
        console.error(`❌ Error creating temporary directory:`, err);
        return;
    }

    console.log(`✅ Temporary directory created at: ${tempDir}`);

    // Create multiple temp files with sample data
    const fileNames = ['file1.txt', 'file2.txt', 'file3.txt'];

    fileNames.forEach((fileName, index) => {
        const filePath = path.join(tempDir, fileName);
        const fileData = `This is sample data for ${fileName}`;

        fs.writeFile(filePath, fileData, (err) => {
            if (err) {
                console.error(`❌ Error writing to "${fileName}":`, err);
            } else {
                console.log(`📄 Created file: ${filePath}`);
            }
        });
    });
});
