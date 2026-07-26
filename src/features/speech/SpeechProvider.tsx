import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Speech from 'expo-speech';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

export const SPEECH_STORAGE_KEY = 'lingolog.speech-preferences.v1';

export const speechModes = [
  { value: 'clear', label: 'Jelas', detail: 'Lebih lambat untuk materi baru', rate: 0.82 },
  { value: 'natural', label: 'Natural', detail: 'Mendekati tempo percakapan', rate: 0.95 },
  { value: 'study', label: 'Pelan lalu natural', detail: 'Dua kali dengan tempo berbeda', rate: 0.78 },
] as const;

// Kecepatan lama tetap diekspor agar backup dan kode eksternal yang pernah membaca nilai ini kompatibel.
export const speechRates = [
  { value: 0.65, label: 'Pelan' },
  { value: 0.82, label: 'Santai' },
  { value: 1, label: 'Normal' },
  { value: 1.15, label: 'Cepat' },
] as const;

export type SpeechMode = (typeof speechModes)[number]['value'];
export type SpeechPreferences = { rate: number; mode?: SpeechMode; voices: Record<string, string> };

type SpeechContextValue = {
  voices: Speech.Voice[];
  loadingVoices: boolean;
  speakingKey: string | null;
  mode: SpeechMode;
  rate: number;
  error: string;
  speak: (text: string, language: string, key?: string) => Promise<void>;
  speakFast: (text: string, language: string, key?: string) => Promise<void>;
  previewVoice: (text: string, language: string, voiceIdentifier: string, key: string) => Promise<void>;
  stop: () => Promise<void>;
  setMode: (mode: SpeechMode) => void;
  setRate: (rate: number) => void;
  setVoice: (language: string, identifier?: string) => void;
  configuredVoice: (language: string) => string | undefined;
  selectedVoice: (language: string) => Speech.Voice | undefined;
  compatibleVoices: (language: string) => Speech.Voice[];
  refreshVoices: () => Promise<void>;
  clearError: () => void;
};

const SpeechContext = createContext<SpeechContextValue | null>(null);
const initialPreferences: SpeechPreferences = { rate: 0.82, mode: 'clear', voices: {} };

function languageBase(language: string) {
  return language.toLocaleLowerCase().split(/[-_]/)[0];
}

function matchesLanguage(voiceLanguage: string, requested: string) {
  return languageBase(voiceLanguage) === languageBase(requested);
}

function exactLocale(voice: Speech.Voice, language: string) {
  return voice.language.toLocaleLowerCase().replace('_', '-') === language.toLocaleLowerCase().replace('_', '-');
}

function modeFromStored(value: Partial<SpeechPreferences>): SpeechMode {
  if (speechModes.some((item) => item.value === value.mode)) return value.mode!;
  // Pengguna lama tidak diubah diam-diam: rate lama dipetakan ke pengalaman terdekat.
  return value.rate === 0.82 || value.rate === 0.65 ? 'clear' : 'natural';
}

export function SpeechProvider({ children }: PropsWithChildren) {
  const [voices, setVoices] = useState<Speech.Voice[]>([]);
  const [loadingVoices, setLoadingVoices] = useState(true);
  const [preferences, setPreferences] = useState<SpeechPreferences>(initialPreferences);
  const [speakingKey, setSpeakingKey] = useState<string | null>(null);
  const [error, setError] = useState('');
  const utterance = useRef(0);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const refreshVoices = useCallback(async () => {
    try {
      setLoadingVoices(true);
      setVoices(await Speech.getAvailableVoicesAsync());
    } catch (cause) {
      console.error(cause);
      setError('Daftar suara perangkat tidak dapat dibaca.');
    } finally {
      setLoadingVoices(false);
    }
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(SPEECH_STORAGE_KEY).then((stored) => {
      if (!stored) return;
      try {
        const value = JSON.parse(stored) as Partial<SpeechPreferences>;
        const mode = modeFromStored(value);
        const fallbackRate = speechModes.find((item) => item.value === mode)!.rate;
        setPreferences({ rate: typeof value.rate === 'number' ? value.rate : fallbackRate, mode, voices: value.voices ?? {} });
      } catch {
        void AsyncStorage.removeItem(SPEECH_STORAGE_KEY);
      }
    });
    void refreshVoices();
    return () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
      void Speech.stop();
    };
  }, [refreshVoices]);

  const save = useCallback((next: SpeechPreferences) => {
    setPreferences(next);
    void AsyncStorage.setItem(SPEECH_STORAGE_KEY, JSON.stringify(next));
  }, []);

  const compatibleVoices = useCallback((language: string) => voices
    .filter((voice) => matchesLanguage(voice.language, language))
    .sort((a, b) => Number(exactLocale(b, language)) - Number(exactLocale(a, language))
      || Number(b.quality === Speech.VoiceQuality.Enhanced) - Number(a.quality === Speech.VoiceQuality.Enhanced)
      || a.name.localeCompare(b.name)), [voices]);

  const selectedVoice = useCallback((language: string) => {
    const compatible = compatibleVoices(language);
    const selected = preferences.voices[language];
    return compatible.find((voice) => voice.identifier === selected)
      ?? compatible.find((voice) => exactLocale(voice, language) && voice.quality === Speech.VoiceQuality.Enhanced)
      ?? compatible.find((voice) => exactLocale(voice, language))
      ?? compatible.find((voice) => voice.quality === Speech.VoiceQuality.Enhanced)
      ?? compatible[0];
  }, [compatibleVoices, preferences.voices]);

  const stop = useCallback(async () => {
    utterance.current += 1;
    pauseTimer.current = null;
    await Speech.stop();
    setSpeakingKey(null);
  }, []);

  const validate = useCallback((text: string, language: string) => {
    const cleanText = text.trim().replace(/\s+/g, ' ');
    if (!cleanText) return null;
    if (cleanText.length > Speech.maxSpeechInputLength) {
      setError('Teks terlalu panjang untuk dibacakan oleh perangkat ini.');
      return null;
    }
    if (loadingVoices) {
      setError('Suara perangkat masih diperiksa. Coba lagi sebentar.');
      return null;
    }
    if (compatibleVoices(language).length === 0) {
      setError(`Suara ${language} belum terpasang. Pasang paket suara di pengaturan text-to-speech perangkat agar dapat digunakan secara offline.`);
      return null;
    }
    return cleanText;
  }, [compatibleVoices, loadingVoices]);

  const playOnce = useCallback((text: string, language: string, voice: string | undefined, rate: number, key: string, current: number) => new Promise<boolean>((resolve) => {
    if (utterance.current !== current) return resolve(false);
    Speech.speak(text, {
      language,
      voice,
      rate,
      pitch: 1,
      useApplicationAudioSession: false,
      onStart: () => { if (utterance.current === current) setSpeakingKey(key); },
      onDone: () => resolve(utterance.current === current),
      onStopped: () => resolve(false),
      onError: (cause) => {
        if (utterance.current === current) {
          console.error(cause);
          setError('Audio tidak dapat diputar. Pastikan volume aktif dan paket suara bahasa ini tersedia secara offline.');
        }
        resolve(false);
      },
    });
  }), []);

  const play = useCallback(async (text: string, language: string, voice: string | undefined, key: string, mode: SpeechMode) => {
    const cleanText = validate(text, language);
    if (!cleanText) return;
    setError('');
    await Speech.stop();
    const current = ++utterance.current;

    if (mode !== 'study') {
      const rate = speechModes.find((item) => item.value === mode)!.rate;
      await playOnce(cleanText, language, voice, rate, key, current);
    } else {
      const firstDone = await playOnce(cleanText, language, voice, 0.78, key, current);
      if (firstDone && utterance.current === current) {
        const continuePlaying = await new Promise<boolean>((resolve) => {
          pauseTimer.current = setTimeout(() => resolve(utterance.current === current), 500);
        });
        pauseTimer.current = null;
        if (continuePlaying) await playOnce(cleanText, language, voice, 0.98, key, current);
      }
    }

    if (utterance.current === current) setSpeakingKey(null);
  }, [playOnce, validate]);

  const mode = preferences.mode ?? modeFromStored(preferences);
  const speak = useCallback(async (text: string, language: string, key = language) => {
    await play(text, language, selectedVoice(language)?.identifier, key, mode);
  }, [mode, play, selectedVoice]);
  const speakFast = useCallback(async (text: string, language: string, key = language) => {
    const cleanText = validate(text, language);
    if (!cleanText) return;
    setError('');
    await Speech.stop();
    const current = ++utterance.current;
    await playOnce(cleanText, language, selectedVoice(language)?.identifier, 1.15, key, current);
    if (utterance.current === current) setSpeakingKey(null);
  }, [playOnce, selectedVoice, validate]);
  const previewVoice = useCallback(async (text: string, language: string, voiceIdentifier: string, key: string) => {
    await play(text, language, voiceIdentifier, key, 'natural');
  }, [play]);

  const value = useMemo<SpeechContextValue>(() => ({
    voices,
    loadingVoices,
    speakingKey,
    mode,
    rate: speechModes.find((item) => item.value === mode)!.rate,
    error,
    speak,
    speakFast,
    previewVoice,
    stop,
    setMode: (nextMode) => save({ ...preferences, mode: nextMode, rate: speechModes.find((item) => item.value === nextMode)!.rate }),
    setRate: (rate) => save({ ...preferences, mode: rate <= 0.82 ? 'clear' : 'natural', rate }),
    setVoice: (language, identifier) => {
      const next = { ...preferences.voices };
      if (identifier) next[language] = identifier;
      else delete next[language];
      save({ ...preferences, voices: next });
    },
    configuredVoice: (language) => preferences.voices[language],
    selectedVoice,
    compatibleVoices,
    refreshVoices,
    clearError: () => setError(''),
  }), [voices, loadingVoices, speakingKey, mode, error, speak, speakFast, previewVoice, stop, save, preferences, selectedVoice, compatibleVoices, refreshVoices]);

  return <SpeechContext.Provider value={value}>{children}</SpeechContext.Provider>;
}

export function useSpeech() {
  const value = useContext(SpeechContext);
  if (!value) throw new Error('useSpeech must be used inside SpeechProvider');
  return value;
}
