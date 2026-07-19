import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const run = (command, args, options = {}) => {
  console.log(`\n> ${command} ${args.join(' ')}`);
  execFileSync(command, args, { stdio: 'inherit', ...options });
};

const app = JSON.parse(readFileSync('app.json', 'utf8')).expo;
const eas = JSON.parse(readFileSync('eas.json', 'utf8'));

if (eas.cli?.appVersionSource !== 'local') throw new Error('eas.json harus memakai appVersionSource local.');
if (eas.build?.preview?.distribution !== 'internal' || eas.build?.preview?.android?.buildType !== 'apk') throw new Error('Profil preview harus menghasilkan APK internal.');
if (!eas.build?.production) throw new Error('Profil production EAS tidak tersedia.');
if (app.android?.package !== 'com.lingolog.app' || app.ios?.bundleIdentifier !== 'com.lingolog.app') throw new Error('Package/bundle identifier rilis berubah.');

run('npm', ['run', 'verify']);
run('npx', ['expo', 'install', '--check']);
run('npx', ['expo-doctor@latest'], { env: { ...process.env, CI: '1' } });
run('npx', ['expo', 'config', '--type', 'public']);
run('npx', ['expo', 'export', '--platform', 'android', '--output-dir', '/tmp/lingolog-release-check-export', '--clear'], { env: { ...process.env, CI: '1' } });
run('git', ['diff', '--check']);

console.log(`\nKandidat lokal ${app.version} (${app.android.versionCode}/${app.ios.buildNumber}) lulus gate otomatis.`);
console.log('Signing, EAS cloud build, dan pengujian perangkat fisik tetap wajib sebelum Tahap 20 ditutup.');
