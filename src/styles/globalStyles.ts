// src/styles/globalStyles.ts
import { StyleSheet } from "react-native";
import { currentColors, Spacing, Typography } from "./theme";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: currentColors.background,
    padding: Spacing.md,

    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: currentColors.card,
    padding: Spacing.md,
    borderRadius: Spacing.radius,
    marginBottom: Spacing.sm,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    ...Typography.title,
    color: currentColors.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.subtitle,
    color: currentColors.text,
  },
  text: {
    ...Typography.body,
    color: currentColors.text,
  },
  button: {
    backgroundColor: currentColors.primary,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    borderRadius: Spacing.radius,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
