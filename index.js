// This is the first file that ReactNative will run when it starts up.
// If you use Expo (`yarn expo:start`), the entry point is ./App.js instead.
// Both do essentially the same thing.

import App from "./app/app.tsx"
import React from "react"
import { AppRegistry } from "react-native"
import RNBootSplash from "react-native-bootsplash"
import TrackPlayer from "react-native-track-player"
import { playbackService } from "./musicPlayerServices"

function IgniteApp() {
  return <App hideSplashScreen={RNBootSplash.hide} />
}

AppRegistry.registerComponent("awsAmplifyAuthentication", () => IgniteApp)
TrackPlayer.registerPlaybackService(() => playbackService());

export default App
