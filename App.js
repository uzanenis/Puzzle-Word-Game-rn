import { SafeAreaView, StyleSheet, View } from "react-native";
import Menu from "./screens/Menu";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <Menu />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue",
  },
});
