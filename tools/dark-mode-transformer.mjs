import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Target directory relative to this script
const targetDir = path.resolve(__dirname, '../src/components/dashboard/settings');

if (!fs.existsSync(targetDir)) {
  console.error("Directory not found:", targetDir);
  process.exit(1);
}

const files = fs.readdirSync(targetDir)
  .filter(f => f.endsWith('.tsx') && !f.includes('settings-sidebar.tsx'))
  .map(f => path.join(targetDir, f));

const replacements = [
  { match: /\bbg-white\b/g, add: 'dark:bg-[#150a2e]' },
  { match: /\bbg-slate-50\b/g, add: 'dark:bg-white/5' },
  { match: /\bbg-slate-100\b/g, add: 'dark:bg-white/10' },
  { match: /\bborder-gray-100\b/g, add: 'dark:border-white/10' },
  { match: /\bborder-gray-200\b/g, add: 'dark:border-white/10' },
  { match: /\bborder-slate-50\b/g, add: 'dark:border-white/5' },
  { match: /\bborder-slate-100\b/g, add: 'dark:border-white/10' },
  { match: /\bborder-slate-200\b/g, add: 'dark:border-white/20' },
  { match: /\btext-slate-900\b/g, add: 'dark:text-white' },
  { match: /\btext-slate-800\b/g, add: 'dark:text-slate-200' },
  { match: /\btext-slate-700\b/g, add: 'dark:text-slate-300' },
  { match: /\btext-slate-600\b/g, add: 'dark:text-slate-300' },
  { match: /\btext-slate-500\b/g, add: 'dark:text-slate-400' },
  { match: /\btext-slate-400\b/g, add: 'dark:text-slate-500' },
  { match: /\bhover:bg-slate-50\b/g, add: 'dark:hover:bg-white/5' },
  { match: /\bhover:bg-slate-100\b/g, add: 'dark:hover:bg-white/10' },
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  replacements.forEach(({ match, add }) => {
    content = content.replace(match, (matchedStrict) => {
      // Avoid adding if already present
      if (content.includes(`${matchedStrict} ${add}`)) return matchedStrict;
      return `${matchedStrict} ${add}`;
    });
  });

  // Basic deduplication. If `bg-white dark:bg-[#150a2e] dark:bg-[#150a2e]` occurs, fix it:
  replacements.forEach(({ add }) => {
    const escapedAdd = add.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const doubleRegex = new RegExp(`(${escapedAdd})\\s+${escapedAdd}`, 'g');
    content = content.replace(doubleRegex, '$1');
  });

  if (content !== originalContent) {
    fs.writeFileSync(file, content);
    console.log("Updated", file);
  }
});
console.log("Done");
