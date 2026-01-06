/**
 * Educacross Design System - Design Tokens (Primitives)
 * 
 * Tokens TypeScript para uso programático.
 * Exportados do Figma.
 */

// ============================================
// SPACING TOKENS
// ============================================

export const spacing = {
  padding: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    13: '52px',
    14: '56px',
    15: '60px',
    16: '64px',
    25: '100px',
  },
  gap: {
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    7: '28px',
    8: '32px',
    9: '36px',
    10: '40px',
    11: '44px',
    12: '48px',
    13: '52px',
    14: '56px',
    15: '60px',
    16: '64px',
    25: '100px',
  },
} as const;

// ============================================
// BORDER RADIUS TOKENS
// ============================================

export const borderRadius = {
  xs: '2px',
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '10px',
  round: '500px',
} as const;

// ============================================
// COLOR TOKENS
// ============================================

export const colors = {
  primary: {
    100: '#E3E1FC',
    200: '#C7C2F9',
    300: '#ABA4F6',
    400: '#8F85F3',
    500: '#7367F0',
    600: '#675DD8',
    700: '#6258CC',
    800: '#5C52C0',
    900: '#564DB4',
  },
  secondary: {
    100: '#E6E6E9',
    200: '#CCCDD3',
    300: '#B3B5BC',
    400: '#999CA6',
    500: '#808390',
    600: '#737682',
    700: '#6D6F7A',
    800: '#666973',
    900: '#60626C',
  },
  info: {
    100: '#CCF1F6',
    200: '#99E3ED',
    300: '#66D6E3',
    400: '#33C8DA',
    500: '#00BAD1',
    600: '#00A7BC',
    700: '#009EB2',
    800: '#0095A7',
    900: '#008C9D',
  },
  success: {
    100: '#D4F4E2',
    200: '#A9E9C5',
    300: '#7EDDA9',
    400: '#53D28C',
    500: '#28C76F',
    600: '#24B364',
    700: '#22A95E',
    800: '#209F59',
    900: '#1E9553',
  },
  warning: {
    100: '#FFECD9',
    200: '#FFD9B4',
    300: '#FFC58E',
    400: '#FFB269',
    500: '#FF9F43',
    600: '#E68F3C',
    700: '#D98739',
    800: '#CC7F36',
    900: '#BF7732',
  },
  error: {
    100: '#FFDBDC',
    200: '#FFB7B9',
    300: '#FF9396',
    400: '#FF6F73',
    500: '#FF4B50',
    600: '#E64448',
    700: '#D94044',
    800: '#CC3C40',
    900: '#BF383C',
  },
  gray: {
    100: '#F5F5F7',
    200: '#EBEBF0',
    300: '#E1E1E8',
    400: '#D7D7E0',
    500: '#CDCDD8',
    600: '#B9B9C2',
    700: '#AEAEB8',
    800: '#A4A4AD',
    900: '#9A9AA3',
  },
} as const;

// ============================================
// OPACITY COLOR TOKENS
// ============================================

export const opacityColors = {
  primary: {
    8: 'rgba(115, 103, 240, 0.08)',
    16: 'rgba(115, 103, 240, 0.16)',
    24: 'rgba(115, 103, 240, 0.24)',
    32: 'rgba(115, 103, 240, 0.32)',
    38: 'rgba(115, 103, 240, 0.38)',
  },
  secondary: {
    8: 'rgba(128, 131, 144, 0.08)',
    16: 'rgba(128, 131, 144, 0.16)',
    24: 'rgba(128, 131, 144, 0.24)',
    32: 'rgba(128, 131, 144, 0.32)',
    38: 'rgba(128, 131, 144, 0.38)',
  },
  info: {
    8: 'rgba(0, 186, 209, 0.08)',
    16: 'rgba(0, 186, 209, 0.16)',
    24: 'rgba(0, 186, 209, 0.24)',
    32: 'rgba(0, 186, 209, 0.32)',
    38: 'rgba(0, 186, 209, 0.38)',
  },
  success: {
    8: 'rgba(40, 199, 111, 0.08)',
    16: 'rgba(40, 199, 111, 0.16)',
    24: 'rgba(40, 199, 111, 0.24)',
    32: 'rgba(40, 199, 111, 0.32)',
    38: 'rgba(40, 199, 111, 0.38)',
  },
  warning: {
    8: 'rgba(255, 159, 67, 0.08)',
    16: 'rgba(255, 159, 67, 0.16)',
    24: 'rgba(255, 159, 67, 0.24)',
    32: 'rgba(255, 159, 67, 0.32)',
    38: 'rgba(255, 159, 67, 0.38)',
  },
  error: {
    8: 'rgba(255, 75, 80, 0.08)',
    16: 'rgba(255, 75, 80, 0.16)',
    24: 'rgba(255, 75, 80, 0.24)',
    32: 'rgba(255, 75, 80, 0.32)',
    38: 'rgba(255, 75, 80, 0.38)',
  },
  gray: {
    8: 'rgba(205, 205, 216, 0.08)',
    16: 'rgba(205, 205, 216, 0.16)',
    24: 'rgba(205, 205, 216, 0.24)',
    32: 'rgba(205, 205, 216, 0.32)',
    38: 'rgba(205, 205, 216, 0.38)',
  },
} as const;

// ============================================
// SEMANTIC VARIABLES (Theme Tokens)
// ============================================

export const themeVariables = {
  light: {
    // Textos
    textPrimary: 'rgba(47, 43, 61, 0.9)',
    textSecondary: 'rgba(47, 43, 61, 0.7)',
    textSubtitle: 'rgba(47, 43, 61, 0.55)',
    textDisabled: 'rgba(47, 43, 61, 0.4)',
    
    // Ações
    actionActive: 'rgba(47, 43, 61, 0.6)',
    actionHover: 'rgba(47, 43, 61, 0.06)',
    actionSelected: 'rgba(47, 43, 61, 0.08)',
    actionDisabled: 'rgba(47, 43, 61, 0.3)',
    actionDisabledBg: 'rgba(47, 43, 61, 0.16)',
    actionFocus: 'rgba(47, 43, 61, 0.1)',
    
    // Bordas e Divisores
    divider: 'rgba(47, 43, 61, 0.12)',
    outlineBorder: 'rgba(47, 43, 61, 0.24)',
    inputBorder: 'rgba(47, 43, 61, 0.22)',
    
    // Backgrounds
    backdropOverlay: 'rgba(47, 43, 61, 0.5)',
    filledInputBg: 'rgba(47, 43, 61, 0.06)',
    chipBackground: 'rgba(47, 43, 61, 0.08)',
    
    // Layout
    bodyBg: '#F8F7FA',
    paper: '#FFFFFF',
    greyLight: '#FAFAFA',
    chatBg: '#F3F2F5',
    trackBg: '#F1F0F2',
    tableHeader: '#FFFFFF',
    avatarBg: '#EEEDF0',
    snackbar: '#2F2B3D',
  },
  dark: {
    // Textos
    textPrimary: 'rgba(225, 222, 245, 0.9)',
    textSecondary: 'rgba(225, 222, 245, 0.7)',
    textSubtitle: 'rgba(225, 222, 245, 0.55)',
    textDisabled: 'rgba(225, 222, 245, 0.4)',
    
    // Ações
    actionActive: 'rgba(225, 222, 245, 0.6)',
    actionHover: 'rgba(225, 222, 245, 0.06)',
    actionSelected: 'rgba(225, 222, 245, 0.08)',
    actionDisabled: 'rgba(225, 222, 245, 0.3)',
    actionDisabledBg: 'rgba(225, 222, 245, 0.16)',
    actionFocus: 'rgba(225, 222, 245, 0.1)',
    
    // Bordas e Divisores
    divider: 'rgba(225, 222, 245, 0.12)',
    outlineBorder: 'rgba(225, 222, 245, 0.24)',
    inputBorder: 'rgba(225, 222, 245, 0.22)',
    
    // Backgrounds
    backdropOverlay: 'rgba(23, 25, 37, 0.6)',
    filledInputBg: 'rgba(225, 222, 245, 0.06)',
    chipBackground: 'rgba(225, 222, 245, 0.08)',
    
    // Layout
    bodyBg: '#25293C',
    paper: '#2F3349',
    greyLight: '#353A52',
    chatBg: '#202534',
    trackBg: '#3A3F57',
    tableHeader: '#2F3349',
    avatarBg: '#373B50',
    snackbar: '#F7F4FF',
  },
} as const;

// ============================================
// MISC TOKENS
// ============================================

export const misc = {
  cardHeader: '24px',
  cardPadding: '24px',
  cardFooter: '24px',
  formGap: '24px',
  containerXl: '1140px',
  bgWhite: '#FFFFFF',
  bgBlack: '#000000',
  bgFacebook: '#4267B2',
  bgTwitter: '#1DA1F2',
  bgLinkedin: '#007BB6',
} as const;

// ============================================
// TYPES
// ============================================

export type SpacingScale = keyof typeof spacing.padding;
export type BorderRadiusScale = keyof typeof borderRadius;
export type ColorCategory = keyof typeof colors;
export type ColorScale = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type OpacityScale = 8 | 16 | 24 | 32 | 38;
export type ThemeMode = 'light' | 'dark';

// ============================================
// TAILWIND COMPATIBLE EXPORT
// ============================================

export const tailwindTokens = {
  spacing: {
    'padding-1': '4px',
    'padding-2': '8px',
    'padding-3': '12px',
    'padding-4': '16px',
    'padding-5': '20px',
    'padding-6': '24px',
    'padding-7': '28px',
    'padding-8': '32px',
    'padding-9': '36px',
    'padding-10': '40px',
    'padding-11': '44px',
    'padding-12': '48px',
    'padding-13': '52px',
    'padding-14': '56px',
    'padding-15': '60px',
    'padding-16': '64px',
    'padding-25': '100px',
    'gap-1': '4px',
    'gap-2': '8px',
    'gap-3': '12px',
    'gap-4': '16px',
    'gap-5': '20px',
    'gap-6': '24px',
    'gap-7': '28px',
    'gap-8': '32px',
    'gap-9': '36px',
    'gap-10': '40px',
    'gap-11': '44px',
    'gap-12': '48px',
    'gap-13': '52px',
    'gap-14': '56px',
    'gap-15': '60px',
    'gap-16': '64px',
    'gap-25': '100px',
  },
  borderRadius: {
    xs: '2px',
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '10px',
    round: '500px',
  },
  colors: {
    primary: colors.primary,
    secondary: colors.secondary,
    info: colors.info,
    success: colors.success,
    warning: colors.warning,
    error: colors.error,
    gray: colors.gray,
  },
} as const;
