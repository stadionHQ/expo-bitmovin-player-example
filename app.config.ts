import dotenv from "dotenv";

dotenv.config();

const bundleIdentifier = "com.stadionHQ.bitmovinplayer";
const playerLicenseKey = process.env.EXPO_PUBLIC_BITMOVIN_PLAYER_LICENSE_KEY;

export default {
  expo: {
    name: "expo-bitmoving-player-example",
    slug: "expo-bitmoving-player-example",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {
      image: "./assets/splash-icon.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: bundleIdentifier
    },
    android: {
      package: bundleIdentifier,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff"
      },
      edgeToEdgeEnabled: true
    },
    web: {
      favicon: "./assets/favicon.png"
    },
    plugins: [
      [
        "bitmovin-player-react-native",
        {
          // Required: Your Bitmovin Player license key
          playerLicenseKey,

          // Optional: Enable features as needed
          features: {
            // Enable AirPlay support (iOS only)
            airPlay: true,

            // Enable background playback
            backgroundPlayback: true,

            googleCastSDK: {
              android: "21.3.0",
              ios: {
                version: "4.8.1.2",
                appId: bundleIdentifier, // optional, will use default receiver app if not provided
                localNetworkUsageDescription: "CUSTOM NETWORK USAGE DESCRIPTION" // optional, will use default description if not provided
              }
            },

            // Enable offline playback
            offline: true,

            // Enable Picture-in-Picture
            pictureInPicture: true
          }
        }
      ]
    ]
  }
};
