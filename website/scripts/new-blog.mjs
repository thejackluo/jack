#!/usr/bin/env node
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = process.argv[2];
const rawTitle = process.argv.slice(3).join(' ');

if (!slug) {
  console.error('Usage: npm run new:blog <slug> "Optional Title"');
  process.exit(1);
}

const title = rawTitle || slug
  .split(/[-_]/g)
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const today = new Date().toISOString().slice(0, 10);
const templatePath = path.resolve(__dirname, '../src/content/templates/blog-template.md');
const outputPath = path.resolve(__dirname, `../src/content/blogs/${slug}.md`);
const assetsDir = path.resolve(__dirname, `../public/assets/blogs/${slug}`);

if (existsSync(outputPath)) {
  console.error(`Blog already exists: ${outputPath}`);
  process.exit(1);
}

const template = readFileSync(templatePath, 'utf8');
const populated = template
  .replace(/{{TITLE}}/g, title)
  .replace(/{{SLUG}}/g, slug)
  .replace(/{{DATE}}/g, today);

writeFileSync(outputPath, populated, 'utf8');

if (!existsSync(assetsDir)) {
  mkdirSync(assetsDir, { recursive: true });
}

console.log(`Created blog content: src/content/blogs/${slug}.md`);
console.log(`Remember to drop assets into public/assets/blogs/${slug}/ before publishing.`);
