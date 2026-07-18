import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PaperScreen } from '../../components/PaperScreen';
import { useTheme } from '../../theme/ThemeProvider';
import { radius, ThemeColors } from '../../theme/tokens';
import type { EntryInput, EntryType } from './entry.repository';

const types: { value: EntryType; label: string }[] = [
  { value: 'word', label: 'Kata' }, { value: 'phrase', label: 'Frasa' }, { value: 'sentence', label: 'Kalimat' },
];

type Props = {
  title: string; deckId: number; sourceName: string; targetName: string; initial?: Omit<EntryInput, 'deckId'>;
  saving: boolean; onCancel: () => void; onMore?: () => void; onSave: (input: EntryInput) => void;
};

export function EntryForm({ title, deckId, sourceName, targetName, initial, saving, onCancel, onMore, onSave }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [type, setType] = useState<EntryType>(initial?.type ?? 'word');
  const [sourceText, setSourceText] = useState(initial?.sourceText ?? '');
  const [translatedText, setTranslatedText] = useState(initial?.translatedText ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [exampleText, setExampleText] = useState(initial?.exampleText ?? '');
  const [exampleTranslation, setExampleTranslation] = useState(initial?.exampleTranslation ?? '');
  const [isFavorite, setFavorite] = useState(initial?.isFavorite ?? false);
  const [tagText, setTagText] = useState(initial?.tags.join(', ') ?? '');
  const [advanced, setAdvanced] = useState(Boolean(initial?.notes || initial?.exampleText || initial?.tags.length));
  const [error, setError] = useState('');

  function submit() {
    if (!sourceText.trim() || !translatedText.trim()) return setError('Teks dan terjemahan perlu diisi.');
    setError('');
    onSave({ deckId, type, sourceText, translatedText, notes, exampleText, exampleTranslation, isFavorite, tags: tagText.split(',') });
  }

  return <KeyboardAvoidingView style={styles.root} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <PaperScreen keyboardShouldPersistTaps="handled" contentContainerStyle={styles.content}>
      <View style={styles.topbar}>
        <Pressable accessibilityRole="button" accessibilityLabel="Batal" onPress={onCancel} style={styles.iconButton}><Ionicons name="close" size={25} color={colors.ink} /></Pressable>
        <Text style={styles.topTitle}>{title}</Text>
        <View style={styles.actions}>{onMore ? <Pressable accessibilityRole="button" accessibilityLabel="Kelola entri" onPress={onMore} style={styles.more}><Ionicons name="ellipsis-horizontal" size={22} color={colors.ink} /></Pressable> : null}<Pressable disabled={saving} onPress={submit} style={[styles.save, saving && { opacity: 0.55 }]}><Text style={styles.saveText}>{saving ? 'Menyimpan…' : 'Simpan'}</Text></Pressable></View>
      </View>

      <View style={styles.typeRow}>{types.map((item) => <Pressable accessibilityRole="radio" accessibilityState={{ checked: type === item.value }} key={item.value} onPress={() => setType(item.value)} style={[styles.type, type === item.value && styles.typeActive]}><Text style={[styles.typeText, type === item.value && styles.typeTextActive]}>{item.label}</Text></Pressable>)}</View>
      <View style={styles.fieldHeader}><Text style={styles.label}>{sourceName}</Text><Pressable accessibilityRole="checkbox" accessibilityState={{ checked: isFavorite }} accessibilityLabel="Favorit" onPress={() => setFavorite(!isFavorite)}><Ionicons name={isFavorite ? 'star' : 'star-outline'} size={24} color={isFavorite ? colors.highlight : colors.inkMuted} /></Pressable></View>
      <TextInput value={sourceText} onChangeText={setSourceText} autoFocus multiline maxLength={500} placeholder="Tulis kata atau kalimat…" placeholderTextColor={colors.inkFaint} style={[styles.input, styles.mainInput]} />
      <Text style={styles.label}>{targetName}</Text>
      <TextInput value={translatedText} onChangeText={setTranslatedText} multiline maxLength={500} placeholder="Tulis terjemahan…" placeholderTextColor={colors.inkFaint} style={[styles.input, styles.mainInput]} />

      <Pressable onPress={() => setAdvanced(!advanced)} style={styles.advancedButton}><Text style={styles.advancedText}>{advanced ? 'Sembunyikan catatan tambahan' : 'Tambah contoh, catatan, dan tag'}</Text><Ionicons name={advanced ? 'chevron-up' : 'chevron-down'} size={19} color={colors.primary} /></Pressable>
      {advanced ? <View>
        <Text style={styles.label}>Contoh dalam {sourceName}</Text><TextInput value={exampleText} onChangeText={setExampleText} multiline maxLength={500} placeholder="Contoh penggunaan" placeholderTextColor={colors.inkFaint} style={styles.input} />
        <Text style={styles.label}>Terjemahan contoh</Text><TextInput value={exampleTranslation} onChangeText={setExampleTranslation} multiline maxLength={500} placeholder="Terjemahan contoh" placeholderTextColor={colors.inkFaint} style={styles.input} />
        <Text style={styles.label}>Catatan</Text><TextInput value={notes} onChangeText={setNotes} multiline maxLength={1000} placeholder="Pelafalan, konteks, atau pengingat" placeholderTextColor={colors.inkFaint} style={[styles.input, styles.textarea]} />
        <Text style={styles.label}>Tag <Text style={styles.hint}>(pisahkan dengan koma)</Text></Text><TextInput value={tagText} onChangeText={setTagText} autoCapitalize="none" maxLength={240} placeholder="formal, perjalanan, sulit" placeholderTextColor={colors.inkFaint} style={styles.input} />
      </View> : null}
      {error ? <View style={styles.error}><Ionicons name="alert-circle-outline" size={19} color={colors.danger} /><Text style={styles.errorText}>{error}</Text></View> : null}
    </PaperScreen>
  </KeyboardAvoidingView>;
}

const createStyles = (colors: ThemeColors) => StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.paper }, content: { paddingTop: 54 },
  topbar: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 25 }, iconButton: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }, topTitle: { color: colors.ink, fontSize: 18, fontWeight: '900' }, actions: { flexDirection: 'row', alignItems: 'center', gap: 4 }, more: { width: 37, height: 42, alignItems: 'center', justifyContent: 'center' }, save: { minWidth: 76, height: 42, paddingHorizontal: 13, borderRadius: radius.md, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' }, saveText: { color: colors.primaryInk, fontWeight: '900' },
  typeRow: { flexDirection: 'row', gap: 8, marginBottom: 24 }, type: { flex: 1, alignItems: 'center', paddingVertical: 10, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.rule, backgroundColor: colors.paperRaised }, typeActive: { backgroundColor: colors.primarySoft, borderColor: colors.primary }, typeText: { color: colors.inkMuted, fontSize: 13, fontWeight: '800' }, typeTextActive: { color: colors.primary },
  fieldHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }, label: { color: colors.ink, fontSize: 13, fontWeight: '800', marginBottom: 8 }, hint: { color: colors.inkMuted, fontWeight: '500' }, input: { minHeight: 52, color: colors.ink, fontSize: 15, backgroundColor: colors.paperRaised, borderWidth: 1, borderColor: colors.rule, borderRadius: radius.md, paddingHorizontal: 15, paddingVertical: 13, marginBottom: 18, textAlignVertical: 'top' }, mainInput: { minHeight: 76, fontSize: 18 }, textarea: { minHeight: 88 },
  advancedButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 14, marginBottom: 13, borderBottomWidth: 1, borderBottomColor: colors.rule }, advancedText: { color: colors.primary, fontSize: 14, fontWeight: '900' },
  error: { flexDirection: 'row', alignItems: 'center', gap: 9, padding: 13, borderRadius: radius.md, backgroundColor: colors.dangerSoft }, errorText: { color: colors.danger, fontSize: 13, fontWeight: '700' },
});
