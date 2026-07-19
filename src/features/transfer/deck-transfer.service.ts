import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import type { Database } from '../decks/deck.repository';
import { buildDeckExport, DeckTransferError, importDeckFile, MAX_IMPORT_BYTES, parseDeckFile, safeDeckFileName } from './deck-transfer';

export async function shareDeckFile(database: Database, deckId: number) {
  const available = await Sharing.isAvailableAsync(); if (!available) throw new Error('SHARING_UNAVAILABLE');
  const payload = await buildDeckExport(database, deckId); const file = new File(Paths.cache, safeDeckFileName(payload.deck.name));
  if (file.exists) file.delete(); file.create(); file.write(JSON.stringify(payload, null, 2));
  await Sharing.shareAsync(file.uri, { mimeType: 'application/json', UTI: 'public.json', dialogTitle: `Bagikan ${payload.deck.name}` });
}

export async function pickAndReadDeckFile() {
  const result = await DocumentPicker.getDocumentAsync({ type: ['application/json', 'text/json', 'text/plain'], copyToCacheDirectory: true, multiple: false });
  if (result.canceled) return undefined; const asset = result.assets[0];
  if (asset.size && asset.size > MAX_IMPORT_BYTES) throw new DeckTransferError('TOO_LARGE');
  const file = new File(asset.uri); const info = file.info(); if (info.size && info.size > MAX_IMPORT_BYTES) throw new DeckTransferError('TOO_LARGE');
  const text = await file.text(); if (!text.trim()) throw new DeckTransferError('EMPTY_DECK');
  return { file: parseDeckFile(text), originalName: asset.name };
}

export async function pickAndImportDeck(database: Database) { const picked = await pickAndReadDeckFile(); if (!picked) return undefined; return { deck: await importDeckFile(database, picked.file), source: picked.file, originalName: picked.originalName }; }
