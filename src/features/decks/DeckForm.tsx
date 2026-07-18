import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PaperScreen } from '../../components/PaperScreen';
import { useTheme } from '../../theme/ThemeProvider';
import { radius, ThemeColors } from '../../theme/tokens';
import { LanguageOption, languages } from './languages';
import type { DeckInput } from './deck.repository';

const coverColors = ['#355A46', '#C58A2A', '#9B5B4C', '#496786', '#755C83'];

type Props = {
  title: string;
  note: string;
  initial?: DeckInput;
  saving: boolean;
  languageLocked?: boolean;
  onCancel: () => void;
  onMore?: () => void;
  onSave: (input: DeckInput) => void;
};

export function DeckForm({ title, note, initial, saving, languageLocked = false, onCancel, onMore, onSave }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [name, setName] = useState(initial?.name ?? '');
  const [description, setDescription] = useState(initial?.description ?? '');
  const [source, setSource] = useState(initial?.sourceLanguage ?? 'en-US');
  const [target, setTarget] = useState(initial?.targetLanguage ?? 'id-ID');
  const [color, setColor] = useState(initial?.color ?? coverColors[0]);
  const [selecting, setSelecting] = useState<'source' | 'target' | null>(null);
  const [error, setError] = useState('');

  function submit() {
    if (!name.trim()) return setError('Nama deck perlu diisi.');
    if (source === target) return setError('Pilih dua bahasa yang berbeda.');
    setError('');
    onSave({ name, description, sourceLanguage: source, targetLanguage: target, color });
  }

  return (
    <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <PaperScreen keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
        <View style={styles.topbar}>
          <Pressable accessibilityRole="button" accessibilityLabel="Batal" onPress={onCancel} style={styles.iconButton}><Ionicons name="close" size={25} color={colors.ink} /></Pressable>
          <Text style={styles.topTitle}>{title}</Text>
          <View style={styles.topActions}>{onMore ? <Pressable accessibilityRole="button" accessibilityLabel="Kelola deck" onPress={onMore} style={styles.moreButton}><Ionicons name="ellipsis-horizontal" size={22} color={colors.ink} /></Pressable> : null}<Pressable accessibilityRole="button" accessibilityLabel="Simpan deck" disabled={saving} onPress={submit} style={[styles.saveButton, saving && styles.disabled]}><Text style={styles.saveText}>{saving ? 'Menyimpan…' : 'Simpan'}</Text></Pressable></View>
        </View>

        <Text style={styles.note}>{note}</Text>
        <Text style={styles.label}>Nama deck</Text>
        <TextInput value={name} onChangeText={setName} maxLength={60} autoFocus placeholder="Contoh: Deutsch Alltag" placeholderTextColor={colors.inkFaint} style={styles.input} />
        <Text style={styles.label}>Deskripsi <Text style={styles.optional}>(opsional)</Text></Text>
        <TextInput value={description} onChangeText={setDescription} maxLength={180} multiline placeholder="Materi apa yang kamu catat di sini?" placeholderTextColor={colors.inkFaint} style={[styles.input, styles.textarea]} />

        <Text style={styles.section}>Pasangan bahasa</Text>
        <LanguageField label="Bahasa yang dipelajari" value={source} disabled={languageLocked} onPress={() => setSelecting(selecting === 'source' ? null : 'source')} styles={styles} colors={colors} />
        {selecting === 'source' && !languageLocked && <LanguageList selected={source} excluded={target} onSelect={(value) => { setSource(value); setSelecting(null); }} styles={styles} colors={colors} />}
        <View style={styles.arrow}><Ionicons name="arrow-down" size={18} color={colors.inkMuted} /></View>
        <LanguageField label="Bahasa terjemahan" value={target} disabled={languageLocked} onPress={() => setSelecting(selecting === 'target' ? null : 'target')} styles={styles} colors={colors} />
        {selecting === 'target' && !languageLocked && <LanguageList selected={target} excluded={source} onSelect={(value) => { setTarget(value); setSelecting(null); }} styles={styles} colors={colors} />}
        {languageLocked ? <Text style={styles.lockedHint}>Pasangan bahasa dikunci karena deck sudah berisi entri.</Text> : null}

        <Text style={styles.section}>Tanda sampul</Text>
        <View style={styles.colors}>{coverColors.map((item) => <Pressable accessibilityRole="radio" accessibilityState={{ checked: color === item }} accessibilityLabel={`Pilih warna ${item}`} key={item} onPress={() => setColor(item)} style={[styles.color, { backgroundColor: item }, color === item && styles.colorSelected]}>{color === item && <Ionicons name="checkmark" size={20} color="#FFFFFF" />}</Pressable>)}</View>
        {error ? <View style={styles.error}><Ionicons name="alert-circle-outline" size={19} color={colors.danger} /><Text style={styles.errorText}>{error}</Text></View> : null}
      </PaperScreen>
    </KeyboardAvoidingView>
  );
}

function LanguageField({ label, value, disabled, onPress, styles, colors }: { label: string; value: string; disabled?: boolean; onPress: () => void; styles: ReturnType<typeof createStyles>; colors: ThemeColors }) {
  const language = languages.find((item) => item.code === value)!;
  return <Pressable accessibilityRole="button" accessibilityState={{ disabled }} disabled={disabled} onPress={onPress} style={[styles.languageField, disabled && styles.disabledField]}><View style={styles.languageCode}><Text style={styles.codeText}>{language.short}</Text></View><View style={styles.grow}><Text style={styles.fieldHint}>{label}</Text><Text style={styles.languageName}>{language.name}</Text></View><Ionicons name="chevron-down" size={19} color={colors.inkMuted} /></Pressable>;
}

function LanguageList({ selected, excluded, onSelect, styles, colors }: { selected: string; excluded: string; onSelect: (code: string) => void; styles: ReturnType<typeof createStyles>; colors: ThemeColors }) {
  return <View style={styles.languageList}>{languages.filter((item) => item.code !== excluded).map((item: LanguageOption) => <Pressable key={item.code} onPress={() => onSelect(item.code)} style={styles.languageOption}><Text style={styles.optionName}>{item.name}</Text>{selected === item.code && <Ionicons name="checkmark" size={19} color={colors.primary} />}</Pressable>)}</View>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper }, content: { paddingTop: 54 }, grow: { flex: 1 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }, topTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' },
  iconButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }, topActions: { flexDirection: 'row', alignItems: 'center', gap: 5 }, moreButton: { width: 38, height: 42, alignItems: 'center', justifyContent: 'center' }, saveButton: { minWidth: 78, height: 42, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 13 }, saveText: { color: colors.primaryInk, fontWeight: '900' }, disabled: { opacity: 0.55 },
  note: { color: colors.primary, fontSize: 21, lineHeight: 26, fontFamily: 'Caveat_600SemiBold', marginBottom: 24, transform: [{ rotate: '-0.5deg' }] },
  label: { color: colors.ink, fontSize: 13, fontWeight: '800', marginBottom: 8 }, optional: { color: colors.inkMuted, fontWeight: '500' },
  input: { minHeight: 52, backgroundColor: colors.paperRaised, borderWidth: 1, borderColor: colors.rule, borderRadius: radius.md, color: colors.ink, fontSize: 16, paddingHorizontal: 15, marginBottom: 19 }, textarea: { minHeight: 92, paddingTop: 14, textAlignVertical: 'top' },
  section: { color: colors.ink, fontSize: 17, fontWeight: '900', marginTop: 9, marginBottom: 12 },
  languageField: { flexDirection: 'row', gap: 12, alignItems: 'center', minHeight: 67, backgroundColor: colors.paperRaised, borderWidth: 1, borderColor: colors.rule, borderRadius: radius.md, padding: 12 }, languageCode: { width: 40, height: 40, borderRadius: 11, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primarySoft }, codeText: { color: colors.primary, fontWeight: '900', fontSize: 12 }, fieldHint: { color: colors.inkMuted, fontSize: 11 }, languageName: { color: colors.ink, fontSize: 15, fontWeight: '800', marginTop: 2 }, arrow: { height: 28, alignItems: 'center', justifyContent: 'center' },
  disabledField: { opacity: 0.72 }, lockedHint: { color: colors.inkMuted, fontSize: 12, lineHeight: 18, marginTop: 8 },
  languageList: { backgroundColor: colors.paperRaised, borderWidth: 1, borderColor: colors.rule, borderRadius: radius.md, marginTop: 7, paddingHorizontal: 12 }, languageOption: { minHeight: 47, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.rule }, optionName: { color: colors.ink, fontSize: 14, fontWeight: '600' },
  colors: { flexDirection: 'row', gap: 13, marginBottom: 16 }, color: { width: 46, height: 46, borderRadius: 14, alignItems: 'center', justifyContent: 'center' }, colorSelected: { borderWidth: 3, borderColor: colors.ink },
  error: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 13, borderRadius: radius.md, backgroundColor: colors.dangerSoft, marginTop: 8 }, errorText: { color: colors.danger, fontSize: 13, fontWeight: '700' },
});
