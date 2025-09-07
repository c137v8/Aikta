// app/_layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useState, useEffect } from 'react';
import { View } from 'react-native';

import Splash from './splash'; // ✅ your splash component
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      // Show splash for a bit even after fonts load
      const timer = setTimeout(() => {
        setIsSplashVisible(false);
      }, 2000); // ⏳ adjust duration (ms) if you want
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded || isSplashVisible) {
    return <Splash />; // ✅ show splash until fonts + timer done
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
