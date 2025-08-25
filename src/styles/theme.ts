// src/styles/theme.ts
import { Appearance, TextStyle, ViewStyle } from "react-native";

const colorScheme = Appearance.getColorScheme(); // "light" ou "dark"

export const Colors = {
  light: {
    background: "#f5f5f5",
    card: "#fff",
    primary: "#2196F3",
    secondary: "#4CAF50",
    danger: "#e53935",
    text: "#333",
    border: "#2ecc71",
    header: "#2ecc71", // verde alegre para header
  },
  dark: {
    background: "#121212",
    card: "#1e1e1e",
    primary: "#64B5F6",
    secondary: "#81C784",
    danger: "#ef5350",
    text: "#fff",
    border: "#444",
    header: "#388E3C", // tom verde mais escuro para dark
  },
};

export const currentColors = colorScheme === "dark" ? Colors.dark : Colors.light;

export const Typography = {
  title: { fontSize: 24, fontWeight: "bold" as const },
  subtitle: { fontSize: 18, fontWeight: "600" as const },
  body: { fontSize: 16 },
  small: { fontSize: 14, color: "#666" },
  headerTitle: { fontSize: 18, fontWeight: "bold" as const } // header title style
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  radius: 8,
};

