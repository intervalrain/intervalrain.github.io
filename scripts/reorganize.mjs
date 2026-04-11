#!/usr/bin/env node
/**
 * Reorganize blog posts from old directory structure to new category-based structure.
 * Source: blog-astro/src/data/blog (original migrated files)
 * Dest:   blog/src/data/blog (new structure)
 */

import fs from "fs";
import path from "path";

const SRC = path.resolve("../blog-astro/src/data/blog");
const DEST = path.resolve("src/data/blog");

// Map old directory → new directory
const DIR_MAP = {
  "leetcode": "leetcode",
  "leetcode_list": "leetcode",
  "CS": "cs",
  "CS50": "cs",
  "algo": "cs",
  "statistics": "cs",
  "ai": "ai",
  "ML": "ai",
  "GenAI": "ai",
  "hgraca": "architecture",
  "clean_arch": "architecture",
  "SystemDesign": "architecture",
  "dxp": "architecture",
  "IT": "it",
  "docker": "it",
  "linux": "it",
  "vim": "it",
  "NATS": "it",
  "Hugo": "it",
  "Csharp": "csharp",
  "C++": "cpp",
  "Java": "java",
  "LogicDesign": "hardware",
  "Verilog": "hardware",
  "Device": "hardware",
  "OS": "os",
  "Database": "database",
  "Life": "life",
  "diary": "life",
  "music": "life",
  "philosophies": "life",
  "VBA": "other",
  "Swift": "other",
};

function getAllFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const files = getAllFiles(SRC);
let moved = 0;

for (const srcPath of files) {
  const relPath = path.relative(SRC, srcPath);
  const parts = relPath.split(path.sep);

  let newDir;
  if (parts.length === 1) {
    // Root-level file (aboutme.md, csindex.md, etc.) — keep at root
    newDir = "";
  } else {
    const topDir = parts[0];
    newDir = DIR_MAP[topDir];
    if (!newDir) {
      // Directory not in map — use lowercase of original
      newDir = topDir.toLowerCase();
    }
  }

  // Build new path: replace top-level dir with mapped dir, keep subdirs
  let destRelPath;
  if (parts.length === 1) {
    destRelPath = relPath;
  } else if (parts.length === 2) {
    destRelPath = path.join(newDir, parts[1]);
  } else {
    // Has subdirectories (e.g., CS/CA/pipeline.md → cs/CA/pipeline.md)
    destRelPath = path.join(newDir, ...parts.slice(1));
  }

  const destPath = path.join(DEST, destRelPath);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
  moved++;
}

console.log(`Moved ${moved} files`);

// Show new structure
const dirs = fs.readdirSync(DEST, { withFileTypes: true })
  .filter(e => e.isDirectory())
  .map(e => e.name)
  .sort();
console.log(`\nDirectories: ${dirs.join(", ")}`);
