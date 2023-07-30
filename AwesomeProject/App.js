import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import CameraPage from "./source/CameraPage/cameraPage";
import ResultPage from "./source/History/resultPage";

export default function App() {
  return (
    <View style={styles.container}>
      <CameraPage />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  
    justifyContent: "center",
  },
});
