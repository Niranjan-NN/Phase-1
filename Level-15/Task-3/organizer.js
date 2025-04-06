const fs = require("fs-extra");
const path = require("path");

const categories = {
    images: [".jpg", ".jpeg", ".png", ".gif", ".svg"],
    documents: [".pdf", ".docx", ".txt", ".xls", ".ppt"],
    videos: [".mp4", ".avi", ".mov"],
    audio: [".mp3", ".wav"],
    archives: [".zip", ".rar", ".7z"],
};

function getCategory(ext) {
    for (const category in categories) {
        if (categories[category].includes(ext)) {
            return category;
        }
    }
    return "others"; // Default category
}

function organizeFiles(targetDir) {
    const files = fs.readdirSync(targetDir);
    const report = {};

    files.forEach((file) => {
        const filePath = path.join(targetDir, file);
        if (fs.lstatSync(filePath).isFile()) {
            const ext = path.extname(file).toLowerCase();
            const category = getCategory(ext);
            const categoryDir = path.join(targetDir, category);

            fs.ensureDirSync(categoryDir);
            fs.moveSync(filePath, path.join(categoryDir, file));

            report[file] = category;
        }
    });

    fs.writeJsonSync(path.join(__dirname, "report.json"), report, { spaces: 2 });
    console.log("✅ Files organized successfully! Check report.json.");
}

module.exports = organizeFiles;
