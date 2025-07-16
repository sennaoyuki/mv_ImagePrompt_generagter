import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      primaryHover: string;
      secondary: string;
      success: string;
      warning: string;
      error: string;
      background: string;
      backgroundSecondary: string;
      border: string;
      text: string;
      textSecondary: string;
      textMuted: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    typography: {
      fontSizes: {
        xs: string;
        sm: string;
        base: string;
        lg: string;
        xl: string;
        '2xl': string;
        '3xl': string;
      };
      fontWeights: {
        normal: number;
        medium: number;
        semibold: number;
        bold: number;
      };
      lineHeights: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}