#!/usr/bin/env node
import { writeFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slug = process.argv[2];
const rawTitle = process.argv.slice(3).join(' ');

if (!slug) {
  console.error('Usage: npm run new:book <slug> "Book Title"');
  process.exit(1);
}

const title = rawTitle || slug
  .split(/[-_]/g)
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ');

const outputPath = path.resolve(__dirname, `../src/content/books/${slug}.json`);

if (existsSync(outputPath)) {
  console.error(`Book already exists: ${outputPath}`);
  process.exit(1);
}

// Generate a random color for the book
const colors = [
  { start: '#2d3561', end: '#5a67d8' },
  { start: '#1a1a1a', end: '#4a4a4a' },
  { start: '#2f5233', end: '#48bb78' },
  { start: '#742a2a', end: '#f56565' },
  { start: '#744210', end: '#ed8936' },
  { start: '#553c9a', end: '#9f7aea' },
  { start: '#234e52', end: '#38b2ac' },
  { start: '#c53030', end: '#fc8181' },
  { start: '#2c5282', end: '#4299e1' },
  { start: '#975a16', end: '#d69e2e' },
];

const randomGradient = colors[Math.floor(Math.random() * colors.length)];

const bookData = {
  title: title,
  author: "Author Name",
  category: "Category",
  progress: 0,
  score: 0,
  pageCount: 300,
  color: randomGradient.start,
  gradient: randomGradient,
  description: "Book description goes here"
};

writeFileSync(outputPath, JSON.stringify(bookData, null, 2), 'utf8');

console.log(`Created book content: src/content/books/${slug}.json`);
console.log(`Remember to update the book details (author, category, pageCount, etc.) before publishing.`);
