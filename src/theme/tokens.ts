export type ThemeMode = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export type ThemeColors = {
  paper: string;
  paperRaised: string;
  paperPressed: string;
  ink: string;
  inkMuted: string;
  inkFaint: string;
  rule: string;
  gridLine: string;
  primary: string;
  primaryInk: string;
  primarySoft: string;
  highlight: string;
  highlightSoft: string;
  danger: string;
  dangerSoft: string;
  shadow: string;
  tabBar: string;
  // Semantic aliases retained for concise feature styles.
  surface: string;
  line: string;
  muted: string;
  moss: string;
  mossSoft: string;
  amber: string;
  amberSoft: string;
  coral: string;
  white: string;
};

export const lightColors: ThemeColors = {
  paper: '#F4F3EF',
  paperRaised: '#FCFBF7',
  paperPressed: '#EAE9E4',
  ink: '#20231F',
  inkMuted: '#62675F',
  inkFaint: '#6B7068',
  rule: '#D5D7D0',
  gridLine: 'rgba(64, 83, 70, 0.075)',
  primary: '#355A46',
  primaryInk: '#FFFFFF',
  primarySoft: '#DCE7DE',
  highlight: '#C58A2A',
  highlightSoft: '#F3E6BE',
  danger: '#A64F3E',
  dangerSoft: '#F1DCD6',
  shadow: '#29362D',
  tabBar: '#F8F7F2',
  surface: '#FCFBF7', line: '#D5D7D0', muted: '#62675F', moss: '#355A46', mossSoft: '#DCE7DE', amber: '#C58A2A', amberSoft: '#F3E6BE', coral: '#A64F3E', white: '#FFFFFF',
};

export const darkColors: ThemeColors = {
  paper: '#171A17',
  paperRaised: '#222620',
  paperPressed: '#2B3029',
  ink: '#ECEDE7',
  inkMuted: '#B4B8AF',
  inkFaint: '#8C9188',
  rule: '#3A4038',
  gridLine: 'rgba(189, 207, 191, 0.055)',
  primary: '#9BC5A7',
  primaryInk: '#142019',
  primarySoft: '#293A2F',
  highlight: '#E1B45F',
  highlightSoft: '#463A24',
  danger: '#E28B77',
  dangerSoft: '#472E29',
  shadow: '#080A08',
  tabBar: '#1C201B',
  surface: '#222620', line: '#3A4038', muted: '#B4B8AF', moss: '#9BC5A7', mossSoft: '#293A2F', amber: '#E1B45F', amberSoft: '#463A24', coral: '#E28B77', white: '#142019',
};

// Temporary compatibility alias while feature screens migrate to useTheme().
export const colors = lightColors;

export const spacing = { xs: 6, sm: 10, md: 16, lg: 24, xl: 32 };
export const radius = { sm: 8, md: 14, lg: 22, pill: 999 };
export const typography = { handwriting: 'Caveat_600SemiBold' };
