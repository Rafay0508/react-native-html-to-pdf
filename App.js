import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ReportPage from "./pages/ReportPage";

export default function App() {
  return (
    <View style={styles.container}>
      <ReportPage />
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
