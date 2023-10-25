import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import React, { useState, useEffect } from 'react'
import TrackPlayer, { Event, Track, useTrackPlayerEvents } from 'react-native-track-player'
import useLoadPlaylist from 'app/utils/useLoadPlaylist';


function PlayList() {
    const [currentTrack, setCurrentTrack] = useState(0);
    const { queue } = useLoadPlaylist();


    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        let currentTrackIndex = event.index;
        setCurrentTrack(currentTrackIndex);
    });



    return (
        <View>
            <View style={styles.playlist}>
                <FlatList
                    data={queue}
                    renderItem={({ item, index }) => <PlaylistItem
                        index={index}
                        title={item.title}
                        isCurrent={currentTrack == index} />
                    }
                />
            </View>
        </View>
    )
}



const PlaylistItem = ({ index, title, isCurrent }) => {

    function handleItemPress() {
        TrackPlayer.skip(index);
    }

    return (
        <TouchableOpacity onPress={handleItemPress}>
            <Text
                style={{
                    ...styles.playlistItem,
                    ...{ backgroundColor: isCurrent ? '#666' : 'transparent' }
                }}>
                {title}
            </Text>
        </TouchableOpacity >
    )
}

export default PlayList

const styles = StyleSheet.create({
    playlist: {
        marginTop: 5,
        marginBottom:5
    },
    playlistItem: {
        fontSize: 16,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4
    },
})