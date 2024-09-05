const fs = require('fs-extra');
const path = require('path');
const { minify } = require('html-minifier');
const terser = require('terser');
const CleanCSS = require('clean-css');

const srcDir = path.join(__dirname, '../src');
const destDir = path.join(__dirname, '../docs');

// Minify HTML
async function minifyHTML(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const minified = minify(content, {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        removeComments: true
    });
    const dest = filePath.replace(srcDir, destDir);
    await fs.outputFile(dest, minified);
    console.log(`Minified HTML: ${dest}`);
}

// Minify JS
async function minifyJS(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const minified = await terser.minify(content);
    const dest = filePath.replace(srcDir, destDir);
    await fs.outputFile(dest, minified.code);
    console.log(`Minified JS: ${dest}`);
}

// Minify CSS
async function minifyCSS(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    const minified = new CleanCSS().minify(content).styles;
    const dest = filePath.replace(srcDir, destDir);
    await fs.outputFile(dest, minified);
    console.log(`Minified CSS: ${dest}`);
}

// Recursive function to process files
async function processFiles(dir) {
    const items = await fs.readdir(dir, { withFileTypes: true });

    for (const item of items) {
        const fullPath = path.join(dir, item.name);
        const destPath = fullPath.replace(srcDir, destDir);

        if (item.isDirectory()) {
            await processFiles(fullPath); // Recursively process directories
        } else if (item.name.endsWith('.html')) {
            await minifyHTML(fullPath);
        } else if (item.name.endsWith('.js')) {
            await minifyJS(fullPath);
        } else if (item.name.endsWith('.css')) {
            await minifyCSS(fullPath);
        } else {
            // Ignore images in this script (they will be handled by the copy/optimize script)
        }
    }
}

async function build() {
    await fs.emptyDir(destDir); // Clean destination directory
    await processFiles(srcDir); // Process all files recursively
}

build().catch(console.error);