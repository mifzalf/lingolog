export type LanguageOption = { code: string; name: string; short: string };

export const languages: LanguageOption[] = [
  { code: 'id-ID', name: 'Bahasa Indonesia', short: 'ID' },
  { code: 'en-US', name: 'Bahasa Inggris', short: 'EN' },
  { code: 'de-DE', name: 'Bahasa Jerman', short: 'DE' },
  { code: 'ja-JP', name: 'Bahasa Jepang', short: 'JA' },
  { code: 'ko-KR', name: 'Bahasa Korea', short: 'KO' },
  { code: 'fr-FR', name: 'Bahasa Prancis', short: 'FR' },
  { code: 'es-ES', name: 'Bahasa Spanyol', short: 'ES' },
  { code: 'ar-SA', name: 'Bahasa Arab', short: 'AR' },
];

export function getLanguage(code: string) {
  return languages.find((language) => language.code === code) ?? { code, name: code, short: code.slice(0, 2).toUpperCase() };
}
