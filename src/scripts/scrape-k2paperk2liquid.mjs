// Scrape all products (names, prices, variants/units, descriptions, images)
// from https://www.k2paperk2liquid.com/products into scripts/k2paperk2liquid-products.json
// Usage: node src/scripts/scrape-k2paperk2liquid.mjs

import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, 'k2paperk2liquid-products.json');
const URL_ = 'https://www.k2paperk2liquid.com/products';

function fetchPage(url, redirects = 5) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && redirects > 0) {
        resolve(fetchPage(new URL(res.headers.location, url).href, redirects - 1));
        return;
      }
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
      let body = '';
      res.on('data', (c) => (body += c));
      res.on('end', () => resolve(body));
    }).on('error', reject);
  });
}

// Join the escaped string chunks of self.__next_f.push([n, "..."])
function rscPayload(html) {
  const chunks = [];
  const re = /self\.__next_f\.push\(\[\s*\d+\s*,\s*"((?:[^"\\]|\\.)*)"\]\)/g;
  let m;
  while ((m = re.exec(html)) !== null) chunks.push(m[1]);
  return chunks.map((c) => JSON.parse(`"${c}"`)).join('');
}

function extractProducts(data) {
  const start = data.indexOf('"initialProducts":[');
  if (start === -1) throw new Error('initialProducts not found in RSC payload');
  let i = start + '"initialProducts":'.length;
  let depth = 0;
  const begin = i;
  for (; i < data.length; i++) {
    const ch = data[i];
    if (ch === '"') {
      i++;
      while (i < data.length && data[i] !== '"') {
        if (data[i] === '\\') i++;
        i++;
      }
    } else if (ch === '[') depth++;
    else if (ch === ']') {
      depth--;
      if (depth === 0) return JSON.parse(data.slice(begin, i + 1));
    }
  }
  throw new Error('unbalanced array');
}

const html = await fetchPage(URL_);
const data = rscPayload(html);
const raw = extractProducts(data);

const products = raw.map(({ _id, __v, createdAt, updatedAt, ...p }) => ({
  ...p,
  createdAt: typeof createdAt === 'string' ? createdAt.replace(/^\$D/, '') : createdAt,
  updatedAt: typeof updatedAt === 'string' ? updatedAt.replace(/^\$D/, '') : updatedAt,
}));

writeFileSync(OUT, JSON.stringify(products, null, 2));
console.log(`Scraped ${products.length} products -> ${OUT}`);
const cats = {};
products.forEach((p) => { cats[p.category] = (cats[p.category] || 0) + 1; });
console.log('Categories:', cats);
