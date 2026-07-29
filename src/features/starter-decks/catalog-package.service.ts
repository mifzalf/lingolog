import * as DocumentPicker from 'expo-document-picker';
import { File } from 'expo-file-system';
import { CatalogPackageError, MAX_CATALOG_BYTES, parseCatalogPackage } from './catalog-package';

export async function pickAndReadCatalogPackage() {
  const result = await DocumentPicker.getDocumentAsync({ type: ['application/json', 'text/json', 'text/plain', 'application/octet-stream'], copyToCacheDirectory: true, multiple: false });
  if (result.canceled) return undefined;
  const asset = result.assets[0];
  if (asset.size && asset.size > MAX_CATALOG_BYTES) throw new CatalogPackageError('TOO_LARGE');
  const file = new File(asset.uri); const info = file.info();
  if (info.size && info.size > MAX_CATALOG_BYTES) throw new CatalogPackageError('TOO_LARGE');
  const text = await file.text();
  if (!text.trim()) throw new CatalogPackageError('EMPTY_PACKAGE');
  return { catalogPackage: parseCatalogPackage(text), originalName: asset.name };
}
