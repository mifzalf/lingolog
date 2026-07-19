# Lingolog

**An offline-first language notebook for collecting, listening to, organizing, and practicing vocabulary.**

Lingolog is a privacy-focused Android application built with React Native, Expo, and TypeScript. It keeps the complete learning workflow on the device: no account, backend, advertising, analytics, or mandatory network connection.

The first release is focused on Android and includes a curated German-to-Indonesian starter catalog alongside support for user-created and imported decks in other language pairs.

## Release status

| Item | Status |
| --- | --- |
| Version | `1.0.0` |
| Release target | Android |
| Package | `com.lingolog.app` |
| Android build | `versionCode 1` |
| Database schema | `5` |
| Internal APK | Built, signed, and accepted on a physical device |
| Production AAB | Built and signed |
| iOS | Deferred to a future milestone |

The complete implementation roadmap is available in [`docs/ROADMAP.md`](docs/ROADMAP.md), and candidate evidence is recorded in [`docs/INTERNAL_TESTING.md`](docs/INTERNAL_TESTING.md).

## Highlights

- Fully offline deck and entry management.
- Words, phrases, and sentences with translations, examples, notes, favorites, and tags.
- Eleven bundled German-to-Indonesian starter decks with 1,083 curated A1–C1 items.
- Search, filters, sorting, archive management, deck duplication, and compatible deck merging.
- Selective or full starter-deck installation with transactional duplicate handling.
- Device text-to-speech with language-aware voice and speed preferences.
- Flashcard and Dictation practice modes with resumable sessions.
- Manual and evidence-based mastery levels.
- Activity calendar and statistics at global, deck, and entry levels.
- Versioned deck import/export without private learning history.
- Full SQLite backup and atomic restore.
- System, light, and dark themes with persistent preferences.
- TalkBack-oriented semantics, Dynamic Type support, Reduce Motion, and accessible controls.
- No application account, cloud synchronization, ads, tracking, or third-party analytics.

## Architecture

```text
app/                     Expo Router routes and layouts
src/components/          Shared application and UI components
src/db/                  SQLite schema, migrations, provider, and development seed
src/features/            Feature-level repositories, services, providers, and views
src/navigation/          Navigation helpers
src/theme/               Theme provider and design tokens
assets/                  Launcher, adaptive icon, splash, and font assets
docs/                    Product, design, testing, privacy, release, and store documentation
scripts/                 Migration tests, benchmark, and release validation
tests/                   Core logic and bundled catalog contracts
```

### Core stack

- React Native `0.81.5`
- React `19.1.0`
- Expo SDK `54`
- Expo Router `6`
- TypeScript `5.9`
- Expo SQLite
- Drizzle ORM
- Zod
- Zustand

SQLite is the source of truth for persistent user data. Schema changes use explicit, transactional migrations, with the active schema currently at version `5`.

## Privacy model

Lingolog is local-first by design:

- Core learning data remains in the application database on the device.
- No account or remote backend is required.
- No advertising, analytics, or behavioral tracking SDK is included.
- Text-to-speech uses services and voice packages provided by the device.
- Files leave the application only after an explicit export, backup, or share action.
- A shared deck intentionally excludes favorites, mastery, answers, sessions, and activity history.
- A full backup is private and includes the complete local database and supported preferences.

See [`docs/PRIVACY.md`](docs/PRIVACY.md) for the full policy draft and release requirements.

## Requirements

- Node.js compatible with Expo SDK 54 tooling.
- npm.
- Expo Go for development, or an Android development/release build for native validation.
- An Expo account and EAS CLI only when creating signed cloud builds.

## Getting started

```bash
git clone https://github.com/mifzalf/lingolog.git
cd lingolog
npm ci
npx expo start --clear
```

Open the project with Expo Go or an Android emulator/device supported by the installed Expo SDK.

To populate an empty development database with optional sample data:

```bash
EXPO_PUBLIC_SEED_DATABASE=true npx expo start --clear
```

The seed is opt-in and is not used in release builds.

## Development commands

| Command | Purpose |
| --- | --- |
| `npm start` | Start the Expo development server |
| `npm run android` | Start Expo and open Android |
| `npm run typecheck` | Run TypeScript without emitting files |
| `npm test` | Run core, catalog, and migration tests |
| `npm run test:migrations` | Test fresh and v1–v4 database migration paths |
| `npm run benchmark:sqlite` | Benchmark representative queries with 20,000 entries |
| `npm run validate:release` | Validate release identity, versions, and assets |
| `npm run verify` | Run typecheck, tests, benchmark, and release validation |
| `npm run release:check` | Run the complete local release gate and Android production export |

## Quality gates

The release pipeline currently verifies:

- TypeScript compilation.
- Core behavior and file-format contracts.
- The complete 11-deck/1,083-item bundled catalog contract.
- Fresh database creation and migration from schema versions 1–4 to 5.
- SQLite integrity, foreign keys, application ID, and legacy-data retention.
- Representative SQLite performance with 20,000 entries.
- Expo dependency compatibility and Expo Doctor.
- Release identifiers, versions, splash configuration, and required assets.
- Android production export and clean Git whitespace checks.

Run the full gate before creating a candidate:

```bash
npm run release:check
```

The latest automated run passed all tests, all migration paths, Expo Doctor `18/18`, and the Android production export. Detailed manual coverage is maintained in [`docs/TESTING.md`](docs/TESTING.md).

## Android builds

EAS profiles are defined in [`eas.json`](eas.json):

- `preview` creates an internally distributed APK.
- `production` creates an Android App Bundle for store distribution.

```bash
npx eas-cli login
npx eas-cli build --platform android --profile preview
npx eas-cli build --platform android --profile production
```

Signing credentials are managed outside the repository. Never commit a keystore, certificate, provisioning profile, EAS token, or `credentials.json`.

Native build numbers are sourced from `app.json`. Increment `android.versionCode` before every new Android binary, including a rebuild of unchanged source.

## Data interchange

### Shared deck

- Suggested extension: `.lingolog.json`
- Format identifier: `lingolog.deck`
- Format version: `1`
- Maximum import size: 5 MB
- Maximum entries: 20,000
- Maximum tags per entry: 12

### Full backup

- Extension: `.lingolog-backup`
- Maximum size: 250 MB
- SQLite application ID: `0x4c4c4f47` (`LLOG`)

Restore validates the SQLite header, application identity, schema compatibility, integrity, and required tables before replacing the active database.

## Documentation

- [`docs/PRODUCT.md`](docs/PRODUCT.md) — product decisions and MVP behavior
- [`docs/DESIGN.md`](docs/DESIGN.md) — visual system and interaction rules
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — completed development roadmap
- [`docs/TESTING.md`](docs/TESTING.md) — automated and physical-device test matrix
- [`docs/INTERNAL_TESTING.md`](docs/INTERNAL_TESTING.md) — Android candidate record and build evidence
- [`docs/RELEASE.md`](docs/RELEASE.md) — release identity and versioning rules
- [`docs/PRIVACY.md`](docs/PRIVACY.md) — privacy policy draft
- [`docs/STORE_LISTING.md`](docs/STORE_LISTING.md) — store metadata and asset plan

## Platform scope

Lingolog 1.0.0 is an Android-first release. The codebase retains Expo and React Native portability, but iOS signing, TestFlight distribution, VoiceOver validation, and physical-device testing are intentionally deferred to a separate milestone. Android completion must not be interpreted as an iOS compatibility certification.

## Contributing

Before opening a change:

1. Preserve the offline-first and privacy model.
2. Add a migration for every database schema change; never reset user data as an upgrade strategy.
3. Keep Expo dependencies on versions compatible with the active SDK.
4. Avoid committing credentials or private user data.
5. Run `npm run verify` for development changes.
6. Run `npm run release:check` for release-sensitive changes.
7. Update the relevant product, testing, and release documentation.

## License

See [`LICENSE`](LICENSE) for the repository license text.
