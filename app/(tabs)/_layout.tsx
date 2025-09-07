// app/_layout.tsx

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';

// Import icons
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

// --- Constants for better maintainability ---
const { width } = Dimensions.get('window');

const COLORS = {
  background: '#232428',
  backgroundSecondary: '#2f3136',
  textPrimary: '#ffffff',
  textSecondary: '#b9bbbe',
  active: '#ffffff',
  inactive: '#b9bbbe',
  online: '#3ba55d',
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// --- Custom Drawer Content Component ---
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Encapsulate content to use flexbox for layout */}
      <View style={styles.drawerContentContainer}>
        {/* Top Section: Logo and Navigation Items */}
        <View>
          <View style={styles.logoContainer}>
            <Image
              source={require('../../assets/images/Aiktadark.png')} // Replace with your logo path
              style={styles.logo}
            />
            <Text style={styles.logoText}>Aikta</Text>
          </View>
          <DrawerItemList {...props} />
        </View>

        {/* Bottom Section: User Profile */}
        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../assets/images/Aiktadark.png')} // Replace with your user avatar path
                style={styles.avatar}
              />
              <View style={styles.statusIndicator} />
            </View>
            <View>
              <Text style={styles.username}>Username</Text>
              <Text style={styles.userTag}>#1234</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color={COLORS.textSecondary} />
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

// --- Main Root Layout Component ---
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'slide', // 'front' or 'slide' for different animation feel
          overlayColor: 'transparent',
          drawerStyle: {
            width: '75%', // Slightly wider for better spacing
            backgroundColor: COLORS.background,
            borderTopRightRadius: SPACING.lg,
            borderBottomRightRadius: SPACING.lg,
          },
          sceneContainerStyle: {
            backgroundColor: 'black', // Keeps the main screen dark
          },
          drawerActiveTintColor: COLORS.active,
          drawerInactiveTintColor: COLORS.inactive,
          drawerLabelStyle: {
            fontFamily: 'SpaceMono',
            fontSize: 16,
            marginLeft: -SPACING.md, // Adjust to align with icon
          },
          drawerItemStyle: {
            borderRadius: SPACING.sm,
            paddingHorizontal: SPACING.sm,
          },
          swipeEnabled: true,
          swipeEdgeWidth: width,
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            title: 'Home',
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{
            title: 'Not Found',
            drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
          }}
        />
      </Drawer>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

// --- Stylesheet ---
const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
    justifyContent: 'space-between', // Pushes user section to the bottom
    paddingBottom: SPACING.lg,
  },
  logoContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundSecondary,
    marginBottom: SPACING.md,
  },
  logo: {
    width: 52,
    height: 52,
    marginBottom: SPACING.sm,
    borderRadius: SPACING.md,
  },
  logoText: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'SpaceMono',
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundSecondary,
    backgroundColor: 'rgba(0,0,0,0.1)', // Slightly different background for user panel
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: SPACING.md,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.online,
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  username: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontFamily: 'SpaceMono',
    fontWeight: '600',
  },
  userTag: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: 'SpaceMono',
  },
});