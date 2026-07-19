import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export const SPEECH_STORAGE_KEY = 'lingolog.speech-preferences.v1';
export const speechRates = [
  { value: 0.65, label: 'Pelan' }, { value: 0.82, label: 'Santai' }, { value: 1, label: 'Normal' }, { value: 1.15, label: 'Cepat' },
] as const;

export type SpeechPreferences = { rate: number; voices: Record<string, string> };
type SpeechContextValue = {
  voices: Speech.Voice[]; loadingVoices: boolean; speakingKey: string | null; rate: number; error: string;
  speak: (text: string, language: string, key?: string) => Promise<void>; stop: () => Promise<void>;
  setRate: (rate: number) => void; setVoice: (language: string, identifier?: string) => void;
  configuredVoice: (language: string) => string | undefined; selectedVoice: (language: string) => Speech.Voice | undefined; compatibleVoices: (language: string) => Speech.Voice[];
  refreshVoices: () => Promise<void>; clearError: () => void;
};
const SpeechContext = createContext<SpeechContextValue | null>(null);
const initialPreferences: SpeechPreferences = { rate: 0.82, voices: {} };

function languageBase(language: string) { return language.toLocaleLowerCase().split(/[-_]/)[0]; }
function matchesLanguage(voiceLanguage: string, requested: string) { return languageBase(voiceLanguage) === languageBase(requested); }

export function SpeechProvider({ children }: PropsWithChildren) {
  const [voices, setVoices] = useState<Speech.Voice[]>([]); const [loadingVoices, setLoadingVoices] = useState(true);
  const [preferences, setPreferences] = useState<SpeechPreferences>(initialPreferences); const [speakingKey, setSpeakingKey] = useState<string | null>(null); const [error, setError] = useState('');
  const utterance = useRef(0);
  const refreshVoices = useCallback(async () => { try { setLoadingVoices(true); setVoices(await Speech.getAvailableVoicesAsync()); } catch (cause) { console.error(cause); setError('Daftar suara perangkat tidak dapat dibaca.'); } finally { setLoadingVoices(false); } }, []);
  useEffect(() => { AsyncStorage.getItem(SPEECH_STORAGE_KEY).then((stored) => { if (!stored) return; try { const value = JSON.parse(stored) as Partial<SpeechPreferences>; setPreferences({ rate: speechRates.some((item) => item.value === value.rate) ? value.rate! : initialPreferences.rate, voices: value.voices ?? {} }); } catch { void AsyncStorage.removeItem(SPEECH_STORAGE_KEY); } }); void refreshVoices(); return () => { void Speech.stop(); }; }, [refreshVoices]);
  const save = useCallback((next: SpeechPreferences) => { setPreferences(next); void AsyncStorage.setItem(SPEECH_STORAGE_KEY, JSON.stringify(next)); }, []);
  const compatibleVoices = useCallback((language: string) => voices.filter((voice) => matchesLanguage(voice.language, language)).sort((a, b) => Number(b.quality === Speech.VoiceQuality.Enhanced) - Number(a.quality === Speech.VoiceQuality.Enhanced) || a.name.localeCompare(b.name)), [voices]);
  const selectedVoice = useCallback((language: string) => { const compatible = compatibleVoices(language); const selected = preferences.voices[language]; return compatible.find((voice) => voice.identifier === selected) ?? compatible.find((voice) => voice.language.toLocaleLowerCase() === language.toLocaleLowerCase() && voice.quality === Speech.VoiceQuality.Enhanced) ?? compatible.find((voice) => voice.language.toLocaleLowerCase() === language.toLocaleLowerCase()) ?? compatible[0]; }, [compatibleVoices, preferences.voices]);
  const stop = useCallback(async () => { utterance.current += 1; await Speech.stop(); setSpeakingKey(null); }, []);
  const speak = useCallback(async (text: string, language: string, key = language) => {
    const cleanText = text.trim(); if (!cleanText) return;
    setError('');
    if (cleanText.length > Speech.maxSpeechInputLength) { setError('Teks terlalu panjang untuk dibacakan oleh perangkat ini.'); return; }
    const compatible = compatibleVoices(language);
    if (loadingVoices) { setError('Suara perangkat masih diperiksa. Coba lagi sebentar.'); return; }
    if (compatible.length === 0) { setError(`Suara ${language} belum terpasang. Pasang paket suara di pengaturan text-to-speech perangkat agar dapat digunakan secara offline.`); return; }
    await Speech.stop(); const current = ++utterance.current; const voice = selectedVoice(language);
    Speech.speak(cleanText, { language, voice: voice?.identifier, rate: preferences.rate, useApplicationAudioSession: false,
      onStart: () => { if (utterance.current === current) setSpeakingKey(key); },
      onDone: () => { if (utterance.current === current) setSpeakingKey(null); },
      onStopped: () => { if (utterance.current === current) setSpeakingKey(null); },
      onError: (cause) => { if (utterance.current !== current) return; console.error(cause); setSpeakingKey(null); setError('Audio tidak dapat diputar. Pastikan volume aktif dan paket suara bahasa ini tersedia secara offline.'); },
    });
  }, [compatibleVoices, loadingVoices, preferences.rate, selectedVoice]);
  const value = useMemo<SpeechContextValue>(() => ({ voices, loadingVoices, speakingKey, rate: preferences.rate, error, speak, stop, setRate: (rate) => save({ ...preferences, rate }), setVoice: (language, identifier) => { const next = { ...preferences.voices }; if (identifier) next[language] = identifier; else delete next[language]; save({ ...preferences, voices: next }); }, configuredVoice: (language) => preferences.voices[language], selectedVoice, compatibleVoices, refreshVoices, clearError: () => setError('') }), [voices, loadingVoices, speakingKey, preferences, error, speak, stop, save, selectedVoice, compatibleVoices, refreshVoices]);
  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
}
export function useSpeech() { const value = useContext(SpeechContext); if (!value) throw new Error('useSpeech must be used inside SpeechProvider'); return value; }
