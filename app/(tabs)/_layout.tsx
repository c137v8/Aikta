import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import 'react-native-reanimated';

// Import icons and AuthContext
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../auth-context';

// --- Constants for better maintainability ---
const { width } = Dimensions.get('window');

const COLORS = {
  background: '#121212',
  backgroundSecondary: '#212121',
  textPrimary: '#ffffff',
  textSecondary: '#a0a0a0',
  active: '#ffffff',
  inactive: '#808080',
  online: '#4caf50',
  accent: '#bb86fc', // Minimalist accent color
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
  const { user, signOut } = useAuth();

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1, backgroundColor: COLORS.background }}>
      <View style={styles.drawerContentContainer}>
        {/* Top Section: Logo and Navigation Items */}
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="sparkles" size={40} color={COLORS.accent} />
            <Text style={styles.logoText}>Aikta</Text>
          </View>
          <DrawerItemList {...props} />
        </View>

        {/* Bottom Section: User Profile */}
        {user ? (
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <View style={styles.avatarContainer}>
                <Ionicons name="person-circle-outline" size={32} color={COLORS.textPrimary} />
                <View style={[styles.statusIndicator, { backgroundColor: COLORS.online }]} />
              </View>
              <View>
                <Text style={styles.username}>{user.email}</Text>
                <Text style={styles.userTag}>#{user.uid.substring(0, 4)}</Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={signOut} style={{marginRight: SPACING.md}}>
                <Ionicons name="log-out-outline" size={24} color={COLORS.textSecondary} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={24} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.userSection}>
            <View style={styles.userInfo}>
              <Ionicons name="person-circle-outline" size={32} color={COLORS.textSecondary} />
              <View>
                <Text style={styles.username}>Guest</Text>
                <Text style={styles.userTag}>Not Logged In</Text>
              </View>
            </View>
            <TouchableOpacity>
              <Ionicons name="settings-outline" size={24} color={COLORS.textSecondary} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </DrawerContentScrollView>
  );
}

// --- Main Root Layout Component ---
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    // Use system default fonts for a cleaner look
    'SystemFont': require('../../assets/fonts/SpaceMono-Regular.ttf'),
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
          drawerType: 'slide',
          overlayColor: 'transparent',
          drawerStyle: {
            width: '75%',
            backgroundColor: COLORS.background,
            borderTopRightRadius: SPACING.lg,
            borderBottomRightRadius: SPACING.lg,
          },
          sceneContainerStyle: {
            backgroundColor: 'black',
          },
          drawerActiveTintColor: COLORS.active,
          drawerInactiveTintColor: COLORS.inactive,
          drawerLabelStyle: {
            // Use system fonts for a cleaner look
            fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
            fontSize: 16,
            marginLeft: -SPACING.md,
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
    justifyContent: 'space-between',
    paddingBottom: SPACING.lg,
  },
  topSection: {
    // Top section container
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundSecondary,
    marginBottom: SPACING.md,
    justifyContent: 'center',
  },
  logoText: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    marginLeft: SPACING.sm,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundSecondary,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginRight: SPACING.md,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  username: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
    fontWeight: '600',
  },
  userTag: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto',
  },
});
