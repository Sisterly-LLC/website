const fs = require('fs-extra');
const path = require('path');

const srcDir = path.join(__dirname, '../src');
const destDir = path.join(__dirname, '../docs');

// Recursive copy function
async function copyOtherFiles(dir) {
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        const destPath = fullPath.replace(srcDir, destDir);

        if (item.isDirectory()) {
            await copyOtherFiles(fullPath); // Recursively process directories
        } else if (!fullPath.match(/\.(html|js|css|jpg|png|svg)$/)) {
            await fs.copy(fullPath, destPath);
            console.log(`Copied other file: ${destPath}`);
        }
    }
}

async function copy() {
    await copyOtherFiles(srcDir);
}

copy().catch(console.error);