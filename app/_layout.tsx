import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from './auth-context';
import Splash from './splash';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      const timer = setTimeout(() => {
        setIsSplashVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [loaded]);

  if (!loaded || isSplashVisible) {
    return <Splash />;
  }

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <LayoutContent />
      </ThemeProvider>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}

function LayoutContent() {
  const { user, loading } = useAuth();

  // If we are still checking the auth state, show a loading indicator.
  if (loading) {
    return <Splash />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {user ? (
        // If the user is authenticated, show the main app tabs
        <Stack.Screen name="(tabs)" />
      ) : (
        // If not authenticated, show the login screen
        <Stack.Screen name="login" />
      )}
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
