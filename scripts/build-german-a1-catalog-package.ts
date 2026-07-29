import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { CATALOG_FORMAT, CATALOG_FORMAT_VERSION, parseCatalogPackage } from '../src/features/starter-decks/catalog-package';
import { starterDecks } from '../src/features/starter-decks/catalog';

const root = resolve(import.meta.dirname, '..');
// Package deck versions must be newer than the bundled baseline so importing v1 has an
// observable effect in the current app instead of being reported entirely as ignored.
const decks = starterDecks.filter((starter) => /\bA1\b/.test(starter.file.deck.name)).map((starter) => ({ ...starter, version: starter.version + 1 }));
const catalogPackage = {
  format: CATALOG_FORMAT,
  version: CATALOG_FORMAT_VERSION,
  packageId: 'com.lingolog.german.a1',
  packageVersion: 1,
  name: 'Lingolog · Jerman A1',
  publisher: 'Lingolog',
  createdAt: '2026-07-27T00:00:00.000Z',
  decks,
};
const text = JSON.stringify(catalogPackage, null, 2) + '\n';
const parsed = parseCatalogPackage(text);
const output = resolve(root, 'dist/catalogs/com.lingolog.german.a1-v1.lingolog-catalog.json');
mkdirSync(resolve(root, 'dist/catalogs'), { recursive: true });
writeFileSync(output, text);
console.log(JSON.stringify({ output, packageId: parsed.packageId, packageVersion: parsed.packageVersion, decks: parsed.decks.length, entries: parsed.decks.reduce((sum, deck) => sum + deck.file.deck.entries.length, 0), bytes: Buffer.byteLength(text) }, null, 2));
