// Shramba vsebine spletne strani (content.json) na trajnem disku.
const path = require('path');
const fs = require('fs');
const DEFAULT = require('./content-default');

const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const CONTENT_PATH = path.join(DATA_DIR, 'content.json');
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');

fs.mkdirSync(DATA_DIR, { recursive: true });
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Globoko združi shranjeno vsebino s privzeto (da novi privzeti ključi ne manjkajo).
function deepMerge(base, override) {
  if (Array.isArray(base)) {
    return Array.isArray(override) ? override : base;
  }
  if (base && typeof base === 'object') {
    const out = {};
    const keys = new Set([...Object.keys(base), ...Object.keys(override || {})]);
    for (const k of keys) {
      if (override && k in override) {
        out[k] = deepMerge(base[k], override[k]);
      } else {
        out[k] = base[k];
      }
    }
    return out;
  }
  return override === undefined ? base : override;
}

let cache = null;

function getContent() {
  if (cache) return cache;
  let stored = {};
  try {
    stored = JSON.parse(fs.readFileSync(CONTENT_PATH, 'utf8'));
  } catch (e) { stored = {}; }
  cache = deepMerge(DEFAULT, stored);
  return cache;
}

function saveContent(newContent) {
  const merged = deepMerge(DEFAULT, newContent || {});
  const tmp = CONTENT_PATH + '.tmp';
  fs.writeFileSync(tmp, JSON.stringify(merged, null, 2));
  fs.renameSync(tmp, CONTENT_PATH);
  cache = merged;
  return merged;
}

function resetContent() {
  cache = null;
  try { fs.unlinkSync(CONTENT_PATH); } catch (e) {}
  return getContent();
}

module.exports = { getContent, saveContent, resetContent, DEFAULT, UPLOAD_DIR, DATA_DIR };
