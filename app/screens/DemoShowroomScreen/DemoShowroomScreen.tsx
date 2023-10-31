import React, { FC, useEffect, useState } from "react"
import {
  ActivityIndicator,
  Button,
  FlatList,
  SafeAreaView,
  View,
  ViewStyle,
  PermissionsAndroid,
  Platform,
  Linking
} from "react-native"
import { Screen, Text } from "../../components"
import { DemoTabScreenProps } from "../../navigators/DemoNavigator"
import { spacing } from "../../theme"
import { setupPlayer, addTrack } from '../../../musicPlayerServices';
import MusicPlayer from "../MusicPlayer"
import TrackPlayer, { Event, Track, useTrackPlayerEvents } from "react-native-track-player"
import { DemoDivider } from "./DemoDivider"
import PlayList from "app/components/PlayList"
import * as MediaLibrary from 'expo-media-library';
import { PERMISSIONS, request } from "react-native-permissions"

export const DemoShowroomScreen: FC<DemoTabScreenProps<"DemoShowroom">> =
  function DemoShowroomScreen(_props) {
    
    const [audioFiles, setAudioFiles] = useState([]);
    const [hasPermission, setHasPermission] = useState(null);
    
    const [isPlayerReady, setIsPlayerReady] = useState(false);
    const [queue, setQueue] = useState<Track[]>();
    const [currentTrack, setCurrentTrack] = useState(0);
    const persmission = MediaLibrary.usePermissions()
    
    useEffect(() => {
      setup();
  
    }, []);

    
   
   
    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
      let currentTrackIndex = event.index;
      if (currentTrackIndex) {
        let currentIndex = await TrackPlayer.getActiveTrackIndex();
        setCurrentTrack(currentIndex);
      }
    });

    async function setup() {
      let isSetup = await setupPlayer()

      const queue = await TrackPlayer.getQueue();
      if (queue.length > 0) {
        setQueue(queue);
      }

      if (isSetup && queue.length <= 0) {
        await addTrack();
      }

      setIsPlayerReady(isSetup)
    }

    const handleMediaLibraryChange = (event) => {
      console.log("🚀 ~ file: DemoShowroomScreen.tsx:65 ~ handleMediaLibraryChange ~ event:", event)
      if (event.hasIncrementalChanges) {
        // Check for deleted, inserted, or updated assets
        if (event.deletedAssets.length > 0) {
          // Handle deleted assets
        }
        if (event.insertedAssets.length > 0) {
          // Handle inserted assets
        }
        if (event.updatedAssets.length > 0) {
          // Handle updated assets
        }
      }
    };
    
    
    if (!isPlayerReady) {
      return (
        <SafeAreaView style={$container}>
          <ActivityIndicator size="large" color="#bbb" />
        </SafeAreaView>
      );
    }






    return (
      <Screen
        preset="auto"
        contentContainerStyle={$screenContentContainer}
        safeAreaEdges={["top", "bottom"]}
      >
        {/* play list */}
      
        {/* <PlayList /> */}

        <DemoDivider />       
        <MusicPlayer />
        <View style={{height:300,}} />
        <DemoDivider />
        <DemoDivider />
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
