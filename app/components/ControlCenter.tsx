import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { playbackService } from 'musicPlayerServices';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import useLoadPlaylist from 'app/utils/useLoadPlaylist';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ControlCenter = () => {
    const playBackState = usePlaybackState();
    const { loadPlaylist } = useLoadPlaylist();


    async function handleShuffle() {
        let queue = await TrackPlayer.getQueue();
        console.log("Before shuffle:", queue);

        await TrackPlayer.reset();
        queue.sort(() => Math.random() - 0.5);
        await TrackPlayer.add(queue);

        let shuffledQueue = await TrackPlayer.getQueue();
        console.log("After shuffle:", shuffledQueue);

        loadPlaylist();
    }


    const skipToNext = async () => {
        await TrackPlayer.skipToNext();
    }

    const skipToPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    }

    const togglePlayBack = async (playback: State) => {

        const currentTrack = await TrackPlayer.getActiveTrackIndex();

        if (currentTrack !== null) {
            // There is an active track, perform playback actions based on the playback state
            if (playback === State.Paused || playback === State.Ready) {
                await TrackPlayer.play();
            } else {
                await TrackPlayer.pause();
            }
        } else {
            console.log("No active track. Handle this case as needed.");
        }

    }



    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icon style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable onPress={() => togglePlayBack(playBackState.state)}>
                <Icon style={styles.icon}
                    name={playBackState.state === State.Playing ? "pause" : "play-arrow"}
                    size={75} />
            </Pressable>
            <Pressable onPress={skipToNext}>
                <Icon style={styles.icon} name="skip-next" size={40} />
            </Pressable>
            <Pressable onPress={handleShuffle}>
                <Icon style={styles.icon} name="shuffle" size={40} />
            </Pressable>
        </View>
    )
}

export default ControlCenter

const styles = StyleSheet.create({
    container: {
        marginBottom: 65,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10
    },
    icon: {
        color: '#FFFFFF'
    }
})