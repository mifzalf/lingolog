import { Ionicons } from '@expo/vector-icons';
import * as IntentLauncher from 'expo-intent-launcher';
import { GestureResponderEvent, Modal, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAccessibility } from '../accessibility/AccessibilityProvider';
import { useTheme } from '../../theme/ThemeProvider';
import { radius, ThemeColors } from '../../theme/tokens';
import { SpeechMode, speechModes, useSpeech } from './SpeechProvider';

const previewTexts: Record<string, string> = {
  id: 'Selamat datang. Saya belajar bahasa setiap hari.',
  en: 'Hello. I practice a little every day.',
  de: 'Guten Tag. Ich lerne jeden Tag ein bisschen Deutsch.',
  ja: 'こんにちは。毎日少しずつ勉強しています。',
  ko: '안녕하세요. 저는 매일 조금씩 공부합니다.',
  fr: 'Bonjour. J’apprends un peu chaque jour.',
  es: 'Hola. Aprendo un poco cada día.',
  ar: 'مرحبًا. أتعلم قليلًا كل يوم.',
};

function previewText(language: string) {
  return previewTexts[language.toLocaleLowerCase().split(/[-_]/)[0]] ?? 'Hello. I practice a little every day.';
}

export function SpeakButton({ text, language, speechKey, label, compact = false }: { text: string; language: string; speechKey: string; label: string; compact?: boolean }) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { speakingKey, speak, stop } = useSpeech();
  const active = speakingKey === speechKey;
  return <Pressable accessibilityRole="button" accessibilityLabel={active ? `Hentikan ${label}` : `Dengarkan ${label}`} accessibilityState={{ busy: active }} hitSlop={6} onPress={(event: GestureResponderEvent) => {
    event.stopPropagation();
    active ? void stop() : void speak(text, language, speechKey);
  }} style={({ pressed }) => [compact ? styles.compact : styles.button, active && styles.active, pressed && styles.pressed]}>
    <Ionicons name={active ? 'stop' : 'volume-medium-outline'} size={compact ? 19 : 21} color={active ? colors.primaryInk : colors.primary} />
    {compact ? null : <Text style={[styles.buttonText, active && styles.activeText]}>{active ? 'Stop' : 'Dengarkan'}</Text>}
  </Pressable>;
}

export function SpeechNotice() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { error, clearError } = useSpeech();
  if (!error) return null;
  return <View accessibilityRole="alert" style={styles.notice}>
    <Ionicons name="volume-mute-outline" size={20} color={colors.danger} />
    <Text style={styles.noticeText}>{error}</Text>
    <Pressable accessibilityLabel="Tutup pesan audio" hitSlop={8} onPress={clearError}><Ionicons name="close" size={18} color={colors.danger} /></Pressable>
  </View>;
}

export function SpeechSettings({ visible, languages, onClose }: { visible: boolean; languages: { code: string; name: string }[]; onClose: () => void }) {
  const { colors } = useTheme();
  const { reduceMotion } = useAccessibility();
  const styles = createStyles(colors);
  const { loadingVoices, mode, setMode, configuredVoice, selectedVoice, setVoice, compatibleVoices, refreshVoices, speakingKey, previewVoice, stop } = useSpeech();
  const close = () => { void stop(); onClose(); };
  const openAndroidTts = async () => {
    await stop();
    try {
      await IntentLauncher.startActivityAsync(IntentLauncher.ActivityAction.TTS_SETTINGS);
    } catch {
      // Beberapa vendor Android tidak menyediakan activity TTS khusus.
    }
    await refreshVoices();
  };

  return <Modal visible={visible} transparent animationType={reduceMotion ? 'none' : 'slide'} accessibilityViewIsModal onRequestClose={close}>
    <Pressable accessibilityLabel="Tutup pengaturan suara" style={styles.scrim} onPress={close} />
    <View style={styles.sheet}>
      <View style={styles.handle} />
      <View style={styles.header}>
        <View style={styles.headerCopy}><Text accessibilityRole="header" style={styles.title}>Suara & cara dengar</Text><Text style={styles.subtitle}>Gratis dan ringan, memakai voice yang tersedia di perangkat.</Text></View>
        <Pressable accessibilityLabel="Tutup pengaturan suara" onPress={close} style={styles.close}><Ionicons name="close" size={22} color={colors.ink} /></Pressable>
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.section}>Cara dengar</Text>
        <View accessibilityRole="radiogroup" style={styles.modeList}>{speechModes.map((item) => <ModeChoice key={item.value} mode={item.value} label={item.label} detail={item.detail} active={mode === item.value} onPress={() => { void stop(); setMode(item.value); }} styles={styles} />)}</View>
        <Text style={styles.modeHelp}>{mode === 'study' ? 'Setiap materi dibaca pelan, dijeda singkat, lalu diulang pada tempo yang lebih natural.' : mode === 'natural' ? 'Tempo sedikit di bawah percakapan normal agar intonasi voice tidak terlalu ditarik.' : 'Tempo santai untuk menangkap bunyi pada materi yang baru dipelajari.'}</Text>

        {languages.map((language) => {
          const compatible = compatibleVoices(language.code);
          const selected = selectedVoice(language.code);
          return <View key={language.code} style={styles.languageBlock}>
            <View style={styles.sectionRow}><Text style={styles.section}>{language.name}</Text>{selected ? <View style={styles.recommendedBadge}><Ionicons name="sparkles" size={12} color={colors.primary} /><Text style={styles.recommendedText}>Rekomendasi: {selected.name}</Text></View> : null}</View>
            {loadingVoices ? <Text style={styles.help}>Memeriksa suara perangkat…</Text> : compatible.length === 0 ? <View style={styles.missing}><Ionicons name="cloud-download-outline" size={20} color={colors.highlight} /><Text style={styles.missingText}>Belum ada voice {language.code}. Pasang paket bahasa melalui pengaturan text-to-speech perangkat.</Text></View> : <View style={styles.voiceList}>
              <VoiceChoice
                label="Otomatis"
                detail={selected ? `Memakai ${selected.name} · ${selected.language}${selected.quality === 'Enhanced' ? ' · kualitas tinggi' : ''}` : 'Memilih voice paling sesuai'}
                active={!configuredVoice(language.code)}
                recommended
                previewing={speakingKey === `preview:auto:${language.code}`}
                onSelect={() => { void stop(); setVoice(language.code); }}
                onPreview={() => selected && (speakingKey === `preview:auto:${language.code}` ? void stop() : void previewVoice(previewText(language.code), language.code, selected.identifier, `preview:auto:${language.code}`))}
                styles={styles}
              />
              {compatible.map((voice) => <VoiceChoice
                key={voice.identifier}
                label={voice.name}
                detail={`${voice.language} · ${voice.quality === 'Enhanced' ? 'kualitas tinggi' : 'kualitas standar'}`}
                active={configuredVoice(language.code) === voice.identifier}
                recommended={selected?.identifier === voice.identifier}
                previewing={speakingKey === `preview:${voice.identifier}`}
                onSelect={() => { void stop(); setVoice(language.code, voice.identifier); }}
                onPreview={() => speakingKey === `preview:${voice.identifier}` ? void stop() : void previewVoice(previewText(language.code), language.code, voice.identifier, `preview:${voice.identifier}`)}
                styles={styles}
              />)}
            </View>}
          </View>;
        })}

        {Platform.OS === 'android' ? <Pressable accessibilityRole="button" onPress={() => void openAndroidTts()} style={({ pressed }) => [styles.settingsButton, pressed && styles.pressed]}><Ionicons name="settings-outline" size={18} color={colors.primary} /><View style={styles.buttonCopy}><Text style={styles.settingsText}>Buka pengaturan suara Android</Text><Text style={styles.settingsDetail}>Pasang atau pilih paket voice berkualitas lebih tinggi.</Text></View><Ionicons name="open-outline" size={17} color={colors.primary} /></Pressable> : null}
        <Pressable accessibilityRole="button" onPress={() => void refreshVoices()} style={({ pressed }) => [styles.refresh, pressed && styles.pressed]}><Ionicons name="refresh" size={18} color={colors.primary} /><Text style={styles.refreshText}>Periksa ulang voice perangkat</Text></Pressable>
        <Text style={styles.footnote}>Preview tidak mengubah pilihan voice. Untuk penggunaan sepenuhnya offline, unduh paket voice dari pengaturan text-to-speech perangkat lalu uji dalam mode pesawat.</Text>
      </ScrollView>
    </View>
  </Modal>;
}

function ModeChoice({ mode, label, detail, active, onPress, styles }: { mode: SpeechMode; label: string; detail: string; active: boolean; onPress: () => void; styles: ReturnType<typeof createStyles> }) {
  return <Pressable accessibilityRole="radio" accessibilityState={{ checked: active }} accessibilityLabel={`${label}. ${detail}`} onPress={onPress} style={[styles.modeChoice, active && styles.choiceActive]}>
    <View style={styles.modeIcon}><Ionicons name={mode === 'study' ? 'repeat-outline' : mode === 'natural' ? 'leaf-outline' : 'ear-outline'} size={20} color={active ? styles.choiceLabelActive.color : styles.choiceLabel.color} /></View>
    <View style={styles.flex}><Text style={[styles.choiceLabel, active && styles.choiceLabelActive]}>{label}</Text><Text style={styles.choiceDetail}>{detail}</Text></View>
    {active ? <Ionicons name="checkmark-circle" size={20} color={styles.choiceLabelActive.color} /> : null}
  </Pressable>;
}

function VoiceChoice({ label, detail, active, recommended, previewing, onSelect, onPreview, styles }: { label: string; detail: string; active: boolean; recommended: boolean; previewing: boolean; onSelect: () => void; onPreview: () => void; styles: ReturnType<typeof createStyles> }) {
  return <View style={[styles.voiceChoice, active && styles.choiceActive]}>
    <Pressable accessibilityRole="radio" accessibilityState={{ checked: active }} onPress={onSelect} style={styles.voiceSelect}>
      <View style={styles.flex}><View style={styles.voiceTitleRow}><Text style={[styles.choiceLabel, active && styles.choiceLabelActive]} numberOfLines={2}>{label}</Text>{recommended && label !== 'Otomatis' ? <Ionicons name="sparkles" size={13} color={styles.choiceLabelActive.color} /> : null}</View><Text style={styles.choiceDetail}>{detail}</Text></View>
      {active ? <Ionicons name="checkmark-circle" size={20} color={styles.choiceLabelActive.color} /> : null}
    </Pressable>
    <Pressable accessibilityRole="button" accessibilityLabel={previewing ? `Hentikan preview ${label}` : `Preview ${label}`} onPress={onPreview} style={[styles.previewButton, previewing && styles.previewActive]}><Ionicons name={previewing ? 'stop' : 'play'} size={16} color={previewing ? styles.activeText.color : styles.refreshText.color} /><Text style={[styles.previewText, previewing && styles.activeText]}>{previewing ? 'Stop' : 'Preview'}</Text></Pressable>
  </View>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  flex: { flex: 1 },
  pressed: { opacity: 0.66 },
  button: { alignSelf: 'flex-start', minHeight: 42, flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 12, borderRadius: radius.md, backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: colors.primary },
  buttonText: { color: colors.primary, fontSize: 12, fontWeight: '900' },
  compact: { width: 38, height: 38, alignItems: 'center', justifyContent: 'center', borderRadius: radius.md, backgroundColor: colors.primarySoft },
  active: { backgroundColor: colors.primary },
  activeText: { color: colors.primaryInk },
  notice: { flexDirection: 'row', alignItems: 'flex-start', gap: 9, padding: 13, marginBottom: 14, borderRadius: radius.md, backgroundColor: colors.dangerSoft },
  noticeText: { flex: 1, color: colors.danger, fontSize: 12, lineHeight: 18, fontWeight: '700' },
  scrim: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.45)' },
  sheet: { position: 'absolute', left: 0, right: 0, bottom: 0, maxHeight: '90%', backgroundColor: colors.paper, borderTopLeftRadius: 25, borderTopRightRadius: 25, paddingTop: 9 },
  handle: { alignSelf: 'center', width: 41, height: 4, borderRadius: 3, backgroundColor: colors.rule },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 15, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.rule },
  headerCopy: { flex: 1, paddingRight: 8 },
  title: { color: colors.ink, fontSize: 21, fontWeight: '900' },
  subtitle: { color: colors.inkMuted, fontSize: 12, lineHeight: 17, marginTop: 2 },
  close: { width: 42, height: 42, borderRadius: radius.md, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.paperRaised },
  content: { paddingHorizontal: 20, paddingBottom: 34 },
  section: { color: colors.ink, fontSize: 14, fontWeight: '900', marginTop: 20, marginBottom: 9 },
  sectionRow: { flexDirection: 'row', alignItems: 'flex-end', flexWrap: 'wrap', columnGap: 8 },
  recommendedBadge: { maxWidth: '68%', flexDirection: 'row', alignItems: 'center', gap: 4, paddingBottom: 9 },
  recommendedText: { flexShrink: 1, color: colors.primary, fontSize: 9, fontWeight: '800' },
  modeList: { gap: 7 },
  modeChoice: { minHeight: 66, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, paddingVertical: 10, borderRadius: radius.md, backgroundColor: colors.paperRaised, borderWidth: 1, borderColor: colors.rule },
  modeIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft },
  modeHelp: { color: colors.inkMuted, fontSize: 11, lineHeight: 17, marginTop: 9 },
  choiceActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary },
  choiceLabel: { color: colors.ink, fontSize: 13, fontWeight: '800' },
  choiceLabelActive: { color: colors.primary },
  choiceDetail: { color: colors.inkMuted, fontSize: 10, lineHeight: 15, marginTop: 2 },
  languageBlock: { marginTop: 3 },
  voiceList: { gap: 8 },
  voiceChoice: { minHeight: 68, flexDirection: 'row', alignItems: 'stretch', borderRadius: radius.md, backgroundColor: colors.paperRaised, borderWidth: 1, borderColor: colors.rule, overflow: 'hidden' },
  voiceSelect: { flex: 1, minHeight: 66, flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: 12, paddingVertical: 9 },
  voiceTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  previewButton: { width: 82, minHeight: 52, alignItems: 'center', justifyContent: 'center', gap: 3, borderLeftWidth: 1, borderLeftColor: colors.rule, backgroundColor: colors.paper },
  previewActive: { backgroundColor: colors.primary },
  previewText: { color: colors.primary, fontSize: 10, fontWeight: '900' },
  help: { color: colors.inkMuted, fontSize: 13 },
  missing: { flexDirection: 'row', gap: 9, padding: 13, borderRadius: radius.md, backgroundColor: colors.highlightSoft },
  missingText: { flex: 1, color: colors.ink, fontSize: 12, lineHeight: 18 },
  settingsButton: { minHeight: 58, flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 24, paddingHorizontal: 13, paddingVertical: 9, borderRadius: radius.md, backgroundColor: colors.primarySoft, borderWidth: 1, borderColor: colors.primary },
  buttonCopy: { flex: 1 },
  settingsText: { color: colors.primary, fontWeight: '900', fontSize: 13 },
  settingsDetail: { color: colors.inkMuted, fontSize: 10, lineHeight: 15, marginTop: 2 },
  refresh: { marginTop: 9, minHeight: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: radius.md, borderWidth: 1, borderColor: colors.rule },
  refreshText: { color: colors.primary, fontWeight: '900', fontSize: 13 },
  footnote: { color: colors.inkMuted, fontSize: 11, lineHeight: 17, marginTop: 14 },
});
