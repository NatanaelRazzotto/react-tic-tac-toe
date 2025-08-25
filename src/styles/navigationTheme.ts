// src/styles/navigationTheme.ts
import { currentColors, Typography } from "./theme";
import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";

// Opções do Bottom Tab (footer)
export const bottomTabOptions: BottomTabNavigationOptions = {
    headerStyle: {
    backgroundColor: currentColors.secondary,
  },
  headerTintColor: "#fff",
  headerTitleAlign: "center" as const,
  headerTitleStyle: {
    ...Typography.subtitle,
    fontWeight: "bold",
  },
  tabBarStyle: {
    backgroundColor: currentColors.secondary,
    height: 60,
  },
  tabBarActiveTintColor: currentColors.card,
  tabBarInactiveTintColor: currentColors.text,
  tabBarShowLabel: false,
};

