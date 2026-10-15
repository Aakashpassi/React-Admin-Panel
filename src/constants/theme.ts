export const THEMES = {
  LIGHT: "light",
  DARK: "dark",
  // BLUE: "blue",
  // PURPLE: "purple",
  // GREEN: "green",
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const DEFAULT_THEME: Theme = THEMES.LIGHT;