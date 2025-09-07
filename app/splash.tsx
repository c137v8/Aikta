import { View, Text, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function Splash() {
  return (
    <View style={styles.container}>
      <Animated.Text
        entering={FadeIn.duration(1500)}
        style={styles.title}
      >
        Aikta
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0d0d0d",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#a64dff", // purple
  },
});
