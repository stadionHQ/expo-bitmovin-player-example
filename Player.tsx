import React, { useEffect, useCallback } from "react";
import { View, StyleSheet } from "react-native";

import {
  usePlayer,
  SourceType,
  PlayerView,
  ReadyEvent,
} from "bitmovin-player-react-native";

export const Player = () => {
  const player = usePlayer({
    // Bitmovin player license key
    licenseKey: process.env.EXPO_PUBLIC_BITMOVIN_PLAYER_LICENSE_KEY,
    analyticsConfig: {
      // Bitmovin analytics key from the Analytics Dashboard
      licenseKey: process.env.EXPO_PUBLIC_BITMOVIN_ANALYTICS_KEY,
    },
  });

  useEffect(() => {
    try {
      player.load({
        url: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
        type: SourceType.HLS,
        title: "Art of Motion",
        analyticsSourceMetadata: {
          videoId: "reactnative-wizard-Art_of_Motion-1754982797638",
          title: "Art of Motion",
          isLive: false,
        },
      });
      console.log("player mounted", player);
    } catch (error) {
      console.log("error", error);
    }
  }, [player]);

  // onReady is called when the player has downloaded initial
  // video and audio and is ready to start playback.
  const onReady = useCallback(
    (event: ReadyEvent) => {
      // Start playback
      try {
        player.play();
        console.log(event.timestamp);
      } catch (error) {
        console.log("error", error);
      }
    },
    [player]
  );

  return (
    <View style={styles.flex1}>
      <PlayerView style={styles.flex1} player={player} onReady={onReady} />
    </View>
  );
};

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    backgroundColor: "black",
    aspectRatio: 16 / 9,
  },
});
