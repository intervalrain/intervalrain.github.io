#!/usr/bin/env node
/**
 * Usage:
 *   pnpm new-post "My Post Title" --dir database --tags PostgreSQL,SQL --draft
 *   pnpm new-post "Hello World" --dir life
 *
 * The --dir flag determines both the file location and the category.
 * Available dirs: ai, architecture, cpp, cs, csharp, database, hardware, it, java, leetcode, life, os, other
 */

import fs from "fs";
import path from "path";

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: pnpm new-post "Post Title" --dir <category> [--tags t1,t2] [--draft] [--math] [--mermaid]');
  process.exit(1);
}

const title = args[0];
const flags = args.slice(1);

function getFlag(name) {
  const idx = flags.indexOf(`--${name}`);
  if (idx === -1) return undefined;
  return flags[idx + 1];
}

const hasFlag = name => flags.includes(`--${name}`);

const dir = getFlag("dir") || "other";
const tags = getFlag("tags")?.split(",").map(t => t.trim()) || [];
const draft = hasFlag("draft");
const math = hasFlag("math");
const mermaid = hasFlag("mermaid");

// Generate slug from title
const slug = title
  .toLowerCase()
  .replace(/[[\]()]/g, "")
  .replace(/[^a-z0-9\u4e00-\u9fff]+/g, "-")
  .replace(/^-|-$/g, "");

const now = new Date();
const pad = n => String(n).padStart(2, "0");
const datetime = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}+08:00`;

const tagsLine = tags.length > 0
  ? `tags: [${tags.map(t => `"${t}"`).join(", ")}]`
  : `tags: []`;

const lines = [
  "---",
  `title: "${title}"`,
  `author: "Rain Hu"`,
  `pubDatetime: ${datetime}`,
  `description: ""`,
  tagsLine,
];

if (draft) lines.push(`draft: true`);
if (math) lines.push(`math: true`);
if (mermaid) lines.push(`mermaid: true`);

lines.push("---", "", "");

const content = lines.join("\n");

// Determine output path
const destDir = path.resolve("src/data/blog", dir);
fs.mkdirSync(destDir, { recursive: true });
const filePath = path.join(destDir, `${slug}.md`);

if (fs.existsSync(filePath)) {
  console.error(`File already exists: ${filePath}`);
  process.exit(1);
}

fs.writeFileSync(filePath, content);
console.log(`Created: ${path.relative(process.cwd(), filePath)}`);
