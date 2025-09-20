#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = process.argv[2];
const rawTitle = process.argv.slice(3).join(' ');

if (!slug) {
  console.error('Usage: npm run new:project <slug> "Optional Title"');
  process.exit(1);
}

const title = rawTitle || slug
  .split(/[-_]/g)
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const templatePath = path.resolve(__dirname, '../src/content/templates/project-template.md');
const outputPath = path.resolve(__dirname, `../src/content/projects/${slug}.md`);

if (existsSync(outputPath)) {
  console.error(`Project already exists: ${outputPath}`);
  process.exit(1);
}

const template = readFileSync(templatePath, 'utf8');
const populated = template
  .replace(/{{TITLE}}/g, title)
  .replace(/{{SLUG}}/g, slug);

writeFileSync(outputPath, populated, 'utf8');

console.log(`Created project content: src/content/projects/${slug}.md`);
console.log('Add your hero asset under public/assets/projects/ and update the gallery entries.');
