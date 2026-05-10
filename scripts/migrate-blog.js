const fs = require('fs');
const path = require('path');

const blogDir = path.join(__dirname, '../src/content/blog');

if (!fs.existsSync(blogDir)) {
    console.error(`Blog directory not found at ${blogDir}`);
    process.exit(1);
}

const files = fs.readdirSync(blogDir);

files.forEach(file => {
    const filePath = path.join(blogDir, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile() && file.endsWith('.md') && !file.startsWith('_')) {
        const slug = file.replace('.md', '');
        const newDir = path.join(blogDir, slug);
        const newFilePath = path.join(newDir, 'page.mdx');

        console.log(`Migrating ${file} to ${slug}/page.mdx`);

        if (!fs.existsSync(newDir)) {
            fs.mkdirSync(newDir);
        }

        fs.renameSync(filePath, newFilePath);
    }
});

console.log('Migration complete.');
