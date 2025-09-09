// app/index.tsx
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [aura, setAura] = useState(51);
  const insets = useSafeAreaInsets();
  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.auraContainer}>
          <Ionicons name="sparkles" size={22} color="#a78bfa" />
          <Text style={styles.auraText}>{aura}</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>what can you do?</Text>
asdf

      </View>

      {/* Bottom Request Button */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
  },
  auraContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  auraText: {
    color: "#a78bfa",
    fontSize: 16,
    marginLeft: 6,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 30,
  },
  buttonRow: {
    flexDirection: "row",
    marginBottom: 15,
  },
  optionButton: {
    backgroundColor: "#111",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "#333",
  },
  optionText: {
    color: "#fff",
    fontSize: 14,
  },
  sendButton: {
    backgroundColor: "#6d28d9",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },
  sendText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
