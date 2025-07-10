const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const docsDir = path.join(__dirname, '../docs');
const outputPath = path.join(__dirname, '../src/docMeta.json');

function getAllDocs(dir, base = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let docs = [];

  entries.forEach((entry) => {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(base, entry.name);

    if (entry.isDirectory()) {
      docs = docs.concat(getAllDocs(fullPath, relativePath));
    } else if (entry.name.endsWith('.mdx') || entry.name.endsWith('.md')) {
      const fileContent = fs.readFileSync(fullPath, 'utf-8');
      const { data } = matter(fileContent);

      docs.push({
        docId: relativePath.replace(/\.mdx?$/, ''),
        title: data.title || entry.name.replace(/\.mdx?$/, ''),
        folder: relativePath.split(path.sep)[0],
      });
    }
  });

  return docs;
}

const allDocs = getAllDocs(docsDir);

fs.writeFileSync(outputPath, JSON.stringify(allDocs, null, 2));
console.log(`✅ Generated docMeta.json with ${allDocs.length} docs`);
