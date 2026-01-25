export interface Theme {
   panelBackground: string;
   panelText: string;
   border: string;
   inputBg: string;
   inputBorder: string;
   primary: string;
   activeText: string;
   activeBg: string;
   hoverBorder: string;
   hoverText: string;
   panelShadow: string;
}

export const theme: { dark: Theme; light: Theme } = {
   dark: {
      panelBackground: "#faf9f6",
      panelText: "#000000",
      border: "#faf9f6",
      inputBg: "#e0e0e0",
      inputBorder: "#faf9f6",
      primary: "#0070f3",
      activeText: "#faf9f6",
      activeBg: "#0070f3",
      hoverBorder: "#0070f3",
      hoverText: "#0070f3",
      panelShadow: "0 4px 12px rgba(0,0,0,0.05)",
   },
   light: {
      panelBackground: "#000000",
      panelText: "#faf9f6",
      border: "#000000",
      inputBg: "#222222",
      inputBorder: "#000000",
      primary: "#0070f3",
      activeText: "#faf9f6",
      activeBg: "#0070f3",
      hoverBorder: "#0070f3",
      hoverText: "#0070f3",
      panelShadow: "0 4px 12px rgba(0,0,0,0.5)",
   },
};

export type ThemeMode = "light" | "dark";

export const getTheme = (dark?: boolean): Theme => (dark ? theme.dark : theme.light);
