#!/usr/bin/env node
/**
 * Migration script: Hugo (PaperMod) → Astro (astro-paper)
 *
 * Transforms frontmatter and converts Hugo shortcodes to
 * standard HTML/Markdown equivalents.
 */

import fs from "fs";
import path from "path";

const SRC_DIR = path.resolve("../blog/content");
const DEST_DIR = path.resolve("src/data/blog");

// Directories that are NOT blog posts (images, etc.)
const SKIP_DIRS = new Set(["images"]);

function getAllMarkdownFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      results.push(...getAllMarkdownFiles(fullPath));
    } else if (entry.name.endsWith(".md")) {
      results.push(fullPath);
    }
  }
  return results;
}

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  return { raw: match[1], body: match[2] };
}

function stripYamlComment(value) {
  // Strip inline YAML comments, but be careful with # inside quotes
  // Simple approach: if value is quoted, extract the quoted portion first
  const trimmed = value.trim();
  if (trimmed.startsWith('"')) {
    const endQuote = trimmed.indexOf('"', 1);
    if (endQuote !== -1) return trimmed.slice(0, endQuote + 1).trim();
  }
  if (trimmed.startsWith("'")) {
    const endQuote = trimmed.indexOf("'", 1);
    if (endQuote !== -1) return trimmed.slice(0, endQuote + 1).trim();
  }
  if (trimmed.startsWith("[")) {
    const endBracket = trimmed.indexOf("]");
    if (endBracket !== -1) return trimmed.slice(0, endBracket + 1).trim();
  }
  // Unquoted value: strip from first #
  const hashIdx = trimmed.indexOf("#");
  if (hashIdx > 0) return trimmed.slice(0, hashIdx).trim();
  return trimmed;
}

function parseYamlValue(value) {
  value = stripYamlComment(value.trim());
  // Array
  if (value.startsWith("[")) {
    return value
      .slice(1, -1)
      .split(",")
      .map(s => s.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }
  // Quoted string
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    return value.slice(1, -1);
  }
  // Boolean
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
}

function parseSimpleYaml(raw) {
  const result = {};
  const lines = raw.split("\n");
  let currentKey = null;
  let currentIndent = 0;

  for (const line of lines) {
    // Skip empty lines and comments
    if (!line.trim() || line.trim().startsWith("#")) continue;

    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();

    // Top-level key
    if (indent === 0 && trimmed.includes(":")) {
      const colonIdx = trimmed.indexOf(":");
      const key = trimmed.slice(0, colonIdx).trim();
      const val = trimmed.slice(colonIdx + 1).trim();
      if (val) {
        result[key] = parseYamlValue(val);
      }
      currentKey = key;
      currentIndent = indent;
    }
  }
  return result;
}

function transformFrontmatter(rawYaml) {
  const fm = parseSimpleYaml(rawYaml);

  // Build new frontmatter
  const newFm = {};

  // Title (required)
  newFm.title = fm.title || "Untitled";

  // Author
  newFm.author = fm.author || "Rain Hu";

  // Date → pubDatetime
  if (fm.date) {
    newFm.pubDatetime = fm.date;
  } else {
    newFm.pubDatetime = new Date().toISOString();
  }

  // Description - ensure it's a string
  if (Array.isArray(fm.description)) {
    newFm.description = fm.description.join(", ");
  } else {
    newFm.description = fm.description || "";
  }

  // Tags - merge tags and Categories
  const tags = [];
  if (Array.isArray(fm.tags)) {
    tags.push(...fm.tags);
  } else if (typeof fm.tags === "string") {
    tags.push(fm.tags);
  }
  if (fm.Categories) {
    const cats = Array.isArray(fm.Categories) ? fm.Categories : [fm.Categories];
    for (const cat of cats) {
      const trimmed = String(cat).trim();
      if (trimmed && !tags.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
        tags.push(trimmed);
      }
    }
  }
  newFm.tags = tags.length > 0 ? tags : ["others"];

  // Draft
  if (fm.draft === true) {
    newFm.draft = true;
  }

  // Math/Mermaid flags (for rendering)
  if (fm.math === true) {
    newFm.math = true;
  }
  if (fm.mermaid === true) {
    newFm.mermaid = true;
  }

  return newFm;
}

function serializeFrontmatter(fm) {
  const lines = ["---"];

  lines.push(`title: ${JSON.stringify(fm.title)}`);
  lines.push(`author: "${fm.author}"`);
  lines.push(`pubDatetime: ${fm.pubDatetime}`);
  lines.push(`description: ${JSON.stringify(fm.description)}`);

  // Tags
  if (fm.tags && fm.tags.length > 0) {
    const tagsStr = fm.tags.map(t => JSON.stringify(t)).join(", ");
    lines.push(`tags: [${tagsStr}]`);
  }

  if (fm.draft) lines.push(`draft: true`);
  if (fm.math) lines.push(`math: true`);
  if (fm.mermaid) lines.push(`mermaid: true`);

  lines.push("---");
  return lines.join("\n");
}

function convertRelativeImages(body, relDir) {
  // Convert ![alt](./path) to ![alt](/relDir/path)
  body = body.replace(
    /!\[([^\]]*)\]\(\.\/(.*?)\)/g,
    (_, alt, imgPath) => `![${alt}](/${relDir}/${imgPath})`
  );
  // Convert ![alt](subdir/file.ext) (no ./ prefix, not absolute, not http)
  // to ![alt](/relDir/subdir/file.ext)
  body = body.replace(
    /!\[([^\]]*)\]\((?!\/|https?:\/\/|#)([^)]+\.(png|jpg|jpeg|gif|svg|webp|ppm))\)/gi,
    (_, alt, imgPath) => `![${alt}](/${relDir}/${imgPath})`
  );
  return body;
}

function convertShortcodes(body) {
  let result = body;

  // {{< mermaid >}} ... {{< /mermaid >}} → ```mermaid ... ```
  // Also handle {{<mermaid>}} ... {{</mermaid>}}
  result = result.replace(
    /\{\{<\s*mermaid\s*>\}\}([\s\S]*?)\{\{<\s*\/mermaid\s*>\}\}/g,
    (_, content) => "```mermaid\n" + content.trim() + "\n```"
  );

  // {{< youtube ID >}} → iframe
  result = result.replace(
    /\{\{<\s*youtube\s+(\S+)\s*>\}\}/g,
    (_, id) =>
      `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%" src="https://www.youtube.com/embed/${id}" frameborder="0" allowfullscreen></iframe></div>`
  );

  // {{< img "src" width >}} → <img> tag
  result = result.replace(
    /\{\{<\s*img\s+"([^"]+)"\s+(\d+)\s*>\}\}/g,
    (_, src, width) => `<img src="${src}" width="${width}" />`
  );

  // {{< notice type >}} ... {{< /notice >}} → styled blockquote
  result = result.replace(
    /\{\{<\s*notice\s+(\w+)\s*>\}\}([\s\S]*?)\{\{<\s*\/notice\s*>\}\}/g,
    (_, type, content) => {
      const emoji = {
        warning: "&#9888;&#65039;",
        info: "&#8505;&#65039;",
        note: "&#128221;",
        tip: "&#128161;",
      };
      const icon = emoji[type] || "";
      return `> ${icon} **${type.charAt(0).toUpperCase() + type.slice(1)}**\n>\n> ${content.trim().replace(/\n/g, "\n> ")}`;
    }
  );

  // {{< togb "label" >}} ... {{< toge >}} → <details>
  // First pass: match togb...toge pairs
  result = result.replace(
    /\{\{<\s*togb\s+"([^"]+)"\s*>\}\}([\s\S]*?)\{\{<\s*toge\s*>\}\}/g,
    (_, label, content) =>
      `<details>\n<summary>${label}</summary>\n\n${content.trim()}\n\n</details>`
  );

  // {{< ppt src="url" >}} → iframe
  result = result.replace(
    /\{\{<\s*ppt\s+src="([^"]+)"\s*>\}\}/g,
    (_, src) =>
      `<div style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden"><iframe style="position:absolute;top:0;left:0;width:100%;height:100%" src="${src}" frameborder="0" allowfullscreen></iframe></div>`
  );

  // {{< svgrepo id name >}} → img tag
  result = result.replace(
    /\{\{<\s*svgrepo\s+(\S+)\s+(\S+)\s*>\}\}/g,
    (_, id, name) =>
      `<img src="https://www.svgrepo.com/show/${id}/${name}.svg" width="60" />`
  );

  // Clean up escaped shortcode examples: {{</* shortcode */>}} → {{< shortcode >}}
  result = result.replace(/\{\{<\/\*\s*(.*?)\s*\*\/>\}\}/g, "{{< $1 >}}");

  return result;
}

function migrate() {
  const files = getAllMarkdownFiles(SRC_DIR);
  console.log(`Found ${files.length} markdown files to migrate`);

  let migrated = 0;
  let skipped = 0;

  for (const srcPath of files) {
    const relPath = path.relative(SRC_DIR, srcPath);
    const destPath = path.join(DEST_DIR, relPath);
    const content = fs.readFileSync(srcPath, "utf-8");

    const parsed = parseFrontmatter(content);
    if (!parsed) {
      // No frontmatter - copy as-is but add minimal frontmatter
      const fileName = path.basename(srcPath, ".md");
      const minimal = `---\ntitle: "${fileName}"\nauthor: "Rain Hu"\npubDatetime: 2024-01-01T00:00:00+08:00\ndescription: ""\ntags: ["others"]\n---\n\n${content}`;
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.writeFileSync(destPath, minimal);
      migrated++;
      continue;
    }

    const newFm = transformFrontmatter(parsed.raw);
    const relDir = path.dirname(relPath);
    let newBody = convertShortcodes(parsed.body);
    newBody = convertRelativeImages(newBody, relDir);
    const newContent = serializeFrontmatter(newFm) + "\n" + newBody;

    fs.mkdirSync(path.dirname(destPath), { recursive: true });
    fs.writeFileSync(destPath, newContent);
    migrated++;
  }

  console.log(`Migrated: ${migrated}, Skipped: ${skipped}`);
}

migrate();
