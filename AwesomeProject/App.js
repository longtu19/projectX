import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import Camera from "./source/cameraPage";
import ResultPage from "./source/History/resultPage";

export default function App() {
  return (
    <View style={styles.container}>
      <ResultPage />
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
});
