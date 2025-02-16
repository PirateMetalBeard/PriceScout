import { ThemeProvider } from "@/context/ThemeContext";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: true}}>
          <Stack.Screen name="index" options={{ title: "Scanner"}}/>
          <Stack.Screen name="ScannedResult" options={{ title: "Price Compare"}}/>
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
  
}
