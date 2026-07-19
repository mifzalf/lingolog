import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { extname } from 'node:path';

const app = JSON.parse(readFileSync(new URL('../app.json', import.meta.url), 'utf8')).expo;
const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));
const semver = /^\d+\.\d+\.\d+$/;
assert.equal(app.name, 'Lingolog');
assert.equal(app.slug, 'lingolog');
assert.equal(app.scheme, 'lingolog');
assert.match(app.version, semver);
assert.equal(pkg.version, app.version, 'Versi package.json dan app.json harus sama');
assert.equal(app.android.package, 'com.lingolog.app');
assert.equal(app.ios.bundleIdentifier, 'com.lingolog.app');
assert.ok(Number.isInteger(app.android.versionCode) && app.android.versionCode > 0);
assert.match(app.ios.buildNumber, /^\d+$/);
assert.equal(app.orientation, 'portrait');
assert.equal(app.userInterfaceStyle, 'automatic');

const splash = app.plugins.find((plugin) => Array.isArray(plugin) && plugin[0] === 'expo-splash-screen')?.[1];
assert.ok(splash, 'Plugin expo-splash-screen wajib dikonfigurasi');
assert.equal(splash.backgroundColor, '#F4F3EF');
assert.equal(splash.dark.backgroundColor, '#171A17');
assert.equal(splash.resizeMode, 'contain');

const assets = [app.icon, app.android.adaptiveIcon.foregroundImage, app.android.adaptiveIcon.backgroundImage, app.android.adaptiveIcon.monochromeImage, app.web.favicon, splash.image, splash.dark.image];
for (const asset of assets) {
  const path = new URL(`../${asset.replace(/^\.\//, '')}`, import.meta.url);
  assert.ok(existsSync(path), `Aset tidak ditemukan: ${asset}`);
  assert.equal(extname(path.pathname), '.png', `Aset rilis harus PNG: ${asset}`);
}
for (const doc of ['docs/PRIVACY.md', 'docs/STORE_LISTING.md', 'docs/RELEASE.md']) assert.ok(existsSync(new URL(`../${doc}`, import.meta.url)), `${doc} tidak ditemukan`);
const privacy = readFileSync(new URL('../docs/PRIVACY.md', import.meta.url), 'utf8');
assert.match(privacy, /Kontak dukungan: belum ditetapkan/, 'Placeholder kontak harus eksplisit sampai pemilik rilis mengisinya');
console.log(`Identitas rilis Lingolog ${app.version} (${app.android.versionCode}/${app.ios.buildNumber}) valid; ${assets.length} aset tersedia.`);
