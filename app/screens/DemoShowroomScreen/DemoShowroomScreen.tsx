import React, { FC, useEffect, useState } from "react"
import {
  ActivityIndicator,
  SafeAreaView,
  ViewStyle,
} from "react-native"
import { Screen, Text } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing } from "../../theme"
import { setupPlayer, addTrack } from '../../../musicPlayerServices';
import MusicPlayer from "../MusicPlayer"
import TrackPlayer from "react-native-track-player"

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
  function DemoShowroomScreen(_props) {
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    
    useEffect(() => {
      setup();
    }, []);

    async function setup() {
      let isSetup = await setupPlayer()

      const queue = await TrackPlayer.getQueue();
      console.log("🚀 ~ file: DemoShowroomScreen.tsx:26 ~ setup ~ queue:", queue)
      if(isSetup && queue.length <= 0) {
        await addTrack();
      }
      
      setIsPlayerReady(isSetup)
    }

    if(!isPlayerReady) {
      return (
        <SafeAreaView style={$container}>
          <ActivityIndicator size="large" color="#bbb"/>
        </SafeAreaView>
      );
    }

    

    


    return (
      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        <MusicPlayer />
      </Screen>
    )
  }

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.xxl,
  
}
const $container: ViewStyle = {
  flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#112'
  
}
