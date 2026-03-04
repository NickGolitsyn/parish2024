/**
 * One-time migration: merge News description + content into single Content field.
 *
 * For each news document:
 * - content.en = description.en blocks (with prefixed _keys) + content.en blocks
 * - content.ro = description.ro blocks (with prefixed _keys) + content.ro blocks
 * - then unset description
 *
 * Usage:
 * 1. Add SANITY_API_TOKEN to .env.local (create at https://www.sanity.io/manage)
 * 2. From project root: node scripts/migrate-news-single-content.mjs
 *
 * The script loads .env.local and .env automatically when run from the project root.
 */

import { createClient } from '@sanity/client';
import { readFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');

function loadEnvFile(filePath) {
  const fullPath = join(rootDir, filePath);
  if (!existsSync(fullPath)) return;
  const content = readFileSync(fullPath, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const eq = trimmed.indexOf('=');
      if (eq > 0) {
        const key = trimmed.slice(0, eq).trim();
        let value = trimmed.slice(eq + 1).trim();
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1).replace(/\\"/g, '"');
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1).replace(/\\'/g, "'");
        if (!(key in process.env)) process.env[key] = value;
      }
    }
  }
}

loadEnvFile('.env.local');
loadEnvFile('.env');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token =
  process.env.SANITY_API_TOKEN ||
  process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  console.error('Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET');
  process.exit(1);
}

if (!token) {
  console.error('Missing write token. Add one of these to .env.local:');
  console.error('  SANITY_API_TOKEN=sk...');
  console.error('  SANITY_API_WRITE_TOKEN=sk...');
  console.error('Create a token at https://www.sanity.io/manage → your project → API → Tokens (with Editor or Admin).');
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-02-02',
  useCdn: false,
  token,
});

function ensureUniqueKeys(blocks, prefix) {
  if (!blocks || !Array.isArray(blocks)) return [];
  return blocks.map((block, i) => ({
    ...block,
    _key: block._key ? `${prefix}-${block._key}` : `${prefix}-${i}`,
  }));
}

function mergeContentBlocks(descBlocks, contentBlocks) {
  const desc = ensureUniqueKeys(descBlocks ?? [], 'desc');
  const cont = ensureUniqueKeys(contentBlocks ?? [], 'cont');
  return [...desc, ...cont];
}

async function main() {
  const docs = await client.fetch(
    `*[_type == "news"]{ _id, description, content }`
  );

  console.log(`Found ${docs.length} news document(s). Merging description + content...`);

  for (const doc of docs) {
    const mergedEn = mergeContentBlocks(doc.description?.en, doc.content?.en);
    const mergedRo = mergeContentBlocks(doc.description?.ro, doc.content?.ro);

    await client
      .patch(doc._id)
      .set({
        content: {
          en: mergedEn,
          ro: mergedRo,
        },
      })
      .unset(['description'])
      .commit();

    console.log(`  Migrated ${doc._id}`);
  }

  console.log('Migration done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
