import React, { useEffect, useCallback } from "react";
import { Platform, StyleSheet } from "react-native";

import {
  usePlayer,
  SourceType,
  PlayerView,
  AudioSession,
  BitmovinCastManager,
  PlayerViewConfig,
  PictureInPictureEnterEvent,
  PictureInPictureExitedEvent,
  PictureInPictureAvailabilityChangedEvent,
  PictureInPictureEnteredEvent,
  PictureInPictureExitEvent,
} from "bitmovin-player-react-native";

if (Platform.OS === "android") {
  BitmovinCastManager.updateContext();
}

export const Player = ({ source }: { source: string }) => {
  const player = usePlayer({
    licenseKey: process.env.EXPO_PUBLIC_BITMOVIN_PLAYER_LICENSE_KEY,
    analyticsConfig: {
      licenseKey: process.env.EXPO_PUBLIC_BITMOVIN_ANALYTICS_KEY,
    },
    remoteControlConfig: {
      isCastEnabled: true,
    },
    playbackConfig: {
      isAutoplayEnabled: true,
      isPictureInPictureEnabled: true,
    },
  });

  const config: PlayerViewConfig = {
    pictureInPictureConfig: {
      isEnabled: true,
      shouldEnterOnBackground: true,
    },
  };

  const load = useCallback(() => {
    AudioSession.setCategory("playback").catch((error) => {
      // Handle any native errors that might occur while setting the audio's category.
      console.log("Failed to set app's audio category to `playback`:\n", error);
    });
    player.load({
      url: source,
      type: SourceType.HLS,
      title: "Art of Motion",
      analyticsSourceMetadata: {
        videoId: "reactnative-wizard-Art_of_Motion-1754982797638",
        title: "Art of Motion",
        isLive: false,
      },
    });
  }, [player, source]);

  useEffect(() => {
    try {
      load();
    } catch (error) {
      console.log("error", error);
    }
    return () => {
      player.destroy();
    };
  }, [player]);

  // onReady is called when the player has downloaded initial
  // video and audio and is ready to start playback.
  // const onReady = useCallback(
  //   (event: ReadyEvent) => {
  //     // Start playback
  //     try {
  //       player.play();
  //       console.log(event.timestamp);
  //     } catch (error) {
  //       console.log("error", error);
  //     }
  //   },
  //   [player]
  // );

  const onPictureInPictureEnter = useCallback(
    (event: PictureInPictureEnterEvent) => {
      console.log("onPictureInPictureEnter", event);
    },
    []
  );

  const onPictureInPictureExit = useCallback(
    (event: PictureInPictureExitEvent) => {
      console.log("onPictureInPictureExit", event);
    },
    []
  );

  const onPictureInPictureExited = useCallback(
    (event: PictureInPictureExitedEvent) => {
      console.log("onPictureInPictureExited", event);
    },
    []
  );

  const onPictureInPictureAvailabilityChanged = useCallback(
    (event: PictureInPictureAvailabilityChangedEvent) => {
      console.log("onPictureInPictureAvailabilityChanged", event);
    },
    []
  );

  const onPictureInPictureEntered = useCallback(
    (event: PictureInPictureEnteredEvent) => {
      console.log("onPictureInPictureEntered", event);
    },
    []
  );

  return (
    <PlayerView
      style={styles.player}
      player={player}
      config={config}
      // isPictureInPictureRequested={true}
      onPictureInPictureEnter={onPictureInPictureEnter}
      onPictureInPictureExit={onPictureInPictureExit}
      onPictureInPictureExited={onPictureInPictureExited}
      onPictureInPictureAvailabilityChanged={
        onPictureInPictureAvailabilityChanged
      }
      onPictureInPictureEntered={onPictureInPictureEntered}
    />
  );
};

const styles = StyleSheet.create({
  player: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
});
