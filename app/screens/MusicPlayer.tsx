import { Dimensions, FlatList, Image, PanResponder, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import TrackPlayer, { Track, useTrackPlayerEvents, Event } from 'react-native-track-player'
import { playListData } from 'app/utils/constant';
import SongInfo from 'app/components/SongInfo';
import SongSlider from 'app/components/SongSlider';
import ControlCenter from 'app/components/ControlCenter';

const { width } = Dimensions.get("window");

const MusicPlayer = () => {
    const [track, setTrack] = useState<Track | null>();

    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async event => {
        
        switch (event.type) {
            case Event.PlaybackActiveTrackChanged:
                const playingTrack = await TrackPlayer.getTrack(event.index)
                setTrack(playingTrack)
                break;
        
        }
    });

    const handleSkipNext = async () => {
        await TrackPlayer.skipToNext();
    };

    const handleSkipPrevious = async () => {
        await TrackPlayer.skipToPrevious();
    };

    const panResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gestureState) => {
            
            // Determine the horizontal swipe direction
            if (gestureState.dx > 100) {
                // Swipe right (previous track)
                handleSkipPrevious();
            } else if (gestureState.dx < -100) {
                // Swipe left (next track)
                handleSkipNext();
            }
        },
    });

   

    const renderArtWork = () => {
        return (
            <View style={styles.listArtWrapper} {...panResponder.panHandlers}  >
                <View style={styles.albumContainer}>
                    {track?.artwork ? (
                        <Image
                            style={styles.albumArtImg}
                            source={{ uri: track?.artwork?.toString() }}
                        />
                    ) : null}
                </View>
            </View>
        )
    }
    
    return (
        <View style={styles.container}>
            <FlatList
                horizontal
                data={playListData}
                renderItem={renderArtWork}
                keyExtractor={song => song.id.toString()}
            />

            <SongInfo track={track} />
            <SongSlider />
            <ControlCenter />
        </View>
    )
}

export default MusicPlayer

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#001d23',
        marginTop:0
    },
    listArtWrapper: {
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:25
    },
    albumContainer: {
        width: 200,
        height: 200,
    },
    albumArtImg: {
        height:300,
        borderRadius: 4,
    },
});