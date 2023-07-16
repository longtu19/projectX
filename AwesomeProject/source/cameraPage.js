import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";

export default function Camera() {
  return (
    <View style={styles.container}>
      <Text>CAMERA PAGE</Text>
      <Pressable>
        <Text style={styles.text}>Capture</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
    lineHeight: 50,
    fontWeight: "bold",
    letterSpacing: 0.2,
    color: "white",
    backgroundColor: "black",
    padding: 12,
    borderRadius: 20,
    overflow: "hidden",
    top: 250,
  },
});
