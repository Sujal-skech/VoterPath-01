// App theme & color palette matching ECI/ECINET style
export const COLORS = {
  // Primary brand
  primary: '#3B2CD6',         // Deep ECI purple/indigo
  primaryLight: '#6C55E8',
  primaryDark: '#2A1FA8',
  accent: '#FF6B35',          // ECI orange accent

  // Background
  background: '#F5F5F5',
  surface: '#FFFFFF',
  headerBg: '#3B2CD6',

  // Card pastel backgrounds (matching ECI grid cards)
  cardPink: '#FFD6E0',
  cardPinkBorder: '#FF8FAB',
  cardYellow: '#FFF3CD',
  cardYellowBorder: '#FFCA28',
  cardGreen: '#D4EDDA',
  cardGreenBorder: '#66BB6A',
  cardBlue: '#D1ECF1',
  cardBlueBorder: '#29B6F6',
  cardPurple: '#E8E0FF',
  cardPurpleBorder: '#9575CD',
  cardOrange: '#FFE0CC',
  cardOrangeBorder: '#FF7043',
  cardTeal: '#E0F7FA',
  cardTealBorder: '#26C6DA',
  cardLavender: '#EDE7F6',
  cardLavenderBorder: '#7E57C2',

  // Text
  textPrimary: '#212121',
  textSecondary: '#666666',
  textLight: '#AAAAAA',
  textOnPrimary: '#FFFFFF',

  // Tab
  tabActive: '#3B2CD6',
  tabInactive: '#888888',

  // cVIGIL specific
  cvigilRed: '#D32F2F',
  cvigilBlue: '#1565C0',
  cvigilGold: '#F9A825',

  // Status
  success: '#388E3C',
  warning: '#F57C00',
  error: '#D32F2F',
  info: '#0288D1',

  // Divider
  divider: '#E0E0E0',
  shadow: 'rgba(0,0,0,0.08)',
};

export const FONTS = {
  bold: { fontWeight: '700' as const },
  semiBold: { fontWeight: '600' as const },
  medium: { fontWeight: '500' as const },
  regular: { fontWeight: '400' as const },
};

export const CARD_STYLES = [
  { bg: '#FFD6E0', border: '#FF8FAB', iconBg: '#FF4081' },  // pink
  { bg: '#FFF3CD', border: '#FFCA28', iconBg: '#F9A825' },  // yellow
  { bg: '#D4EDDA', border: '#66BB6A', iconBg: '#388E3C' },  // green
  { bg: '#D1ECF1', border: '#29B6F6', iconBg: '#0288D1' },  // blue
  { bg: '#E8E0FF', border: '#9575CD', iconBg: '#6A1B9A' },  // purple
  { bg: '#FFE0CC', border: '#FF7043', iconBg: '#E64A19' },  // orange
  { bg: '#E0F7FA', border: '#26C6DA', iconBg: '#00838F' },  // teal
  { bg: '#EDE7F6', border: '#7E57C2', iconBg: '#4527A0' },  // lavender
];
