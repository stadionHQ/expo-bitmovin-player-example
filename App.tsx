import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { Player } from "./Player";
import { ReloadButton } from "./src/ReloadButton";
import { useState } from "react";

const m3u8 =
  "https://bitmovin-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";

export default function App() {
  const [key, setKey] = useState(0);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Player key={key} source={m3u8} />
      <View style={styles.retryButtonContainer}>
        <ReloadButton onPress={() => setKey(key + 1)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  retryButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 30,
    paddingBottom: 50,
    alignItems: "center",
  },
});
