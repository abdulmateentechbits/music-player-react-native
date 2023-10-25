import {
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import React, { useState, useEffect } from 'react'
import TrackPlayer, { Event, Track, useTrackPlayerEvents } from 'react-native-track-player'


function PlayList() {
    const [queue, setQueue] = useState<Track[]>();
    const [currentTrack, setCurrentTrack] = useState(0);

    async function loadPlaylist() {
        const queue = await TrackPlayer.getQueue();
        setQueue(queue);
    }

    useEffect(() => {
        loadPlaylist();
    }, []);


    useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
        let currentTrackIndex = event.index;
        setCurrentTrack(currentTrackIndex);
    })

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
        marginTop: 40,
        marginBottom: 40
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