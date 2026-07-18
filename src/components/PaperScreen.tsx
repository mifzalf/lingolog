import { PropsWithChildren } from 'react';
import { ScrollView, ScrollViewProps, StyleSheet, View } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

export function PaperTexture() {
  const { colors } = useTheme();
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {Array.from({ length: 28 }, (_, index) => (
        <View key={index} style={[styles.rule, { top: 22 + index * 28, backgroundColor: colors.gridLine }]} />
      ))}
      <View style={[styles.margin, { backgroundColor: colors.highlight, opacity: 0.1 }]} />
    </View>
  );
}

export function PaperScreen({ children, contentContainerStyle, ...props }: PropsWithChildren<ScrollViewProps>) {
  const { colors } = useTheme();
  return (
    <View style={[styles.root, { backgroundColor: colors.paper }]}>
      <PaperTexture />
      <ScrollView {...props} style={[styles.scroll, props.style]} contentContainerStyle={[styles.content, contentContainerStyle]}>
        {children}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  scroll: { flex: 1 },
  content: { paddingTop: 62, paddingHorizontal: 20, paddingBottom: 36 },
  rule: { position: 'absolute', left: 0, right: 0, height: StyleSheet.hairlineWidth },
  margin: { position: 'absolute', left: 14, top: 0, bottom: 0, width: 1 },
});
