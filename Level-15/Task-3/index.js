const path = require("path");
const fs = require("fs-extra");
const organizeFiles = require("./organizer");

const targetDir = path.join(__dirname, "test_folder"); // Change this to your directory

if (!fs.existsSync(targetDir)) {
    console.log("Error: Target directory does not exist.");
    process.exit(1);
}

organizeFiles(targetDir);
