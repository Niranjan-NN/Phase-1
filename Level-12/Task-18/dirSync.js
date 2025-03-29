const fs = require('fs');
const path = require('path');

// Paths for source and target directories
const sourceDir = path.join(__dirname, 'source');
const targetDir = path.join(__dirname, 'target');

// Synchronization function
function syncDirectories(source, target) {
    try {
        const sourceFiles = new Set(fs.readdirSync(source));
        const targetFiles = new Set(fs.readdirSync(target));

        // ✅ Copy new or updated files
        sourceFiles.forEach(file => {
            const sourcePath = path.join(source, file);
            const targetPath = path.join(target, file);

            const sourceStat = fs.statSync(sourcePath);

            if (!fs.existsSync(targetPath)) {
                fs.copyFileSync(sourcePath, targetPath);
                console.log(`📄 Copied new file: ${file}`);
            } else {
                const targetStat = fs.statSync(targetPath);
                if (sourceStat.mtime > targetStat.mtime) {
                    fs.copyFileSync(sourcePath, targetPath);
                    console.log(`🔄 Updated file: ${file}`);
                }
            }
        });

        // ❌ Delete files in target that don’t exist in source
        targetFiles.forEach(file => {
            if (!sourceFiles.has(file)) {
                const targetPath = path.join(target, file);
                fs.unlinkSync(targetPath);
                console.log(`❌ Deleted file: ${file}`);
            }
        });

        console.log(`✅ Directory synchronization complete!`);

    } catch (error) {
        console.error(`❌ Error during synchronization:`, error);
    }
}

// Execute the sync function
syncDirectories(sourceDir, targetDir);
