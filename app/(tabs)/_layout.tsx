import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../auth/auth-context";

// --- Constants ---
const { width } = Dimensions.get("window");

const COLORS = {
  background: "#121212",
  backgroundSecondary: "#212121",
  textPrimary: "#ffffff",
  textSecondary: "#a0a0a0",
  active: "#ffffff",
  inactive: "#808080",
  online: "#4caf50",
  accent: "#bb86fc",
};

const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// --- Custom Drawer Content ---
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const { user, signOut } = useAuth();

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, backgroundColor: COLORS.background }}
    >
      <View style={styles.drawerContentContainer}>
        {/* Logo + Items */}
        <View style={styles.topSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="sparkles" size={40} color={COLORS.accent} />
            <Text style={styles.logoText}>Aikta</Text>
          </View>
          <DrawerItemList {...props} />
        </View>

        {/* User Section */}
        <View style={styles.userSection}>
          <View style={styles.userInfo}>
            <View style={styles.avatarContainer}>
              <Ionicons
                name="person-circle-outline"
                size={36}
                color={user ? COLORS.textPrimary : COLORS.textSecondary}
              />
              {user && (
                <View
                  style={[styles.statusIndicator, { backgroundColor: COLORS.online }]}
                />
              )}
            </View>
            <View>
              <Text style={styles.username}>
                {user?.email ?? "Guest"}
              </Text>
              <Text style={styles.userTag}>
                {user ? "Online" : "Not Logged In"}
              </Text>
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.userActions}>
            {user && (
              <TouchableOpacity
                onPress={signOut}
                style={styles.actionButton}
              >
                <Ionicons name="log-out-outline" size={22} color={COLORS.textSecondary} />
                <Text style={styles.actionText}>Logout</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => props.navigation.navigate("settings")}
              style={[styles.actionButton, { marginLeft: SPACING.sm }]}
            >
              <Ionicons name="settings-outline" size={22} color={COLORS.textSecondary} />
              <Text style={styles.actionText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

// --- Main Root Layout ---
export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SystemFont: require("../../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: "slide",
          overlayColor: "transparent",
          drawerStyle: {
            width: "75%",
            backgroundColor: COLORS.background,
            borderTopRightRadius: SPACING.lg,
            borderBottomRightRadius: SPACING.lg,
          },
          sceneContainerStyle: { backgroundColor: "black" },
          drawerActiveTintColor: COLORS.active,
          drawerInactiveTintColor: COLORS.inactive,
          drawerLabelStyle: {
            fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
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
            title: "Home",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: "Settings",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="settings-outline" size={size} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="+not-found"
          options={{
            title: "Not Found",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="help-circle-outline" size={size} color={color} />
            ),
          }}
        />
      </Drawer>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

// --- Styles ---
const styles = StyleSheet.create({
  drawerContentContainer: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: SPACING.lg,
  },
  topSection: {},
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.xl,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundSecondary,
    marginBottom: SPACING.md,
    justifyContent: "center",
  },
  logoText: {
    color: COLORS.textPrimary,
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    marginLeft: SPACING.sm,
  },
  userSection: {
    borderTopWidth: 1,
    borderTopColor: COLORS.backgroundSecondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.md,
  },
  avatarContainer: {
    marginRight: SPACING.md,
    position: "relative",
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: "absolute",
    bottom: 2,
    right: 2,
    borderWidth: 2,
    borderColor: COLORS.background,
  },
  username: {
    color: COLORS.textPrimary,
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
    fontWeight: "600",
  },
  userTag: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontFamily: Platform.OS === "ios" ? "System" : "Roboto",
  },
  userActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.backgroundSecondary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 10,
  },
  actionText: {
    color: COLORS.textSecondary,
    marginLeft: SPACING.xs,
    fontSize: 14,
  },
});
