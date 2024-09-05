import fs from 'fs-extra';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngquant from 'imagemin-pngquant';
import path from 'path';

const srcDir = path.join(process.cwd(), 'src/images');
const destDir = path.join(process.cwd(), 'docs/images');

// Optimize JPEGs and PNGs
async function optimizeImages() {
    const files = await imagemin([`${srcDir}/**/*.{jpg,png}`], {
        destination: destDir,
        plugins: [
            imageminMozjpeg({ quality: 75 }),
            imageminPngquant({ quality: [0.6, 0.8] })
        ]
    });

    files.forEach(file => console.log(`Optimized Image: ${file.destinationPath}`));
}

// Copy SVGs (and other non-optimized images) recursively
async function copySVGs(dir) {
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        const destPath = fullPath.replace(srcDir, destDir);

        if (item.isDirectory()) {
            await copySVGs(fullPath); // Recursively process directories
        } else if (item.name.endsWith('.svg')) {
            await fs.copy(fullPath, destPath); // Copy SVGs directly
            console.log(`Copied SVG: ${destPath}`);
        }
    }
}

async function processImages() {
    await optimizeImages(); // Optimize JPGs and PNGs
    await copySVGs(srcDir); // Copy SVGs recursively
}

processImages().catch(console.error);