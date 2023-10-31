import TrackPlayer, { Track } from 'react-native-track-player';
import * as MediaLibrary from 'expo-media-library';
import { check, PERMISSIONS, RESULTS, request } from 'react-native-permissions';
import {
    load,
    save,
    remove,
    clear,
} from './storage';

let playListData: Track[] = [];

async function requestAndLoadLocalTracks() {
    console.log("Hello ");
    try {
        const result = await check(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

        if (result === RESULTS.GRANTED) {
            await loadLocalTracks();
        } else {
            // Permission is not granted, request it
            const permissionRequestResult = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);

            if (permissionRequestResult === RESULTS.GRANTED) {
                // Permission has been granted, load local tracks
                await loadLocalTracks();
            } else {
                // Handle the case when permission request is denied
                console.error('Permission to access media library not granted.');
            }
        }
    } catch (error) {
        console.error('Error requesting or loading local tracks:', error);
    }
}

async function loadLocalTracks() {
    try {
        const permission = await MediaLibrary.requestPermissionsAsync();
        console.log("🚀 ~ file: constant.ts:41 ~ loadLocalTracks ~ permission:", permission)
        
        const { assets } = await MediaLibrary.getAssetsAsync({ mediaType: 'audio' });
        const localTracks: Track[] = assets.map((asset, index) => ({
            id: index.toString(),
            title: asset?.filename?.slice(0, 10),
            artist: 'Local Artist',
            album: 'Local Album',
            artwork: 'https://cdn.pixabay.com/photo/2021/09/13/23/10/vinyl-6622596_1280.jpg',
            url: decodeURIComponent(asset?.uri),
        }));

        // Store the localTracks array in storage
        save('localTracks', localTracks);
        console.log("🚀 ~ file: constant.ts:58 ~ loadLocalTracks ~ localTracks:", localTracks)

        playListData = localTracks;

    } catch (error) {
        console.error('Error loading local tracks:', error);
    }
}

async function getLocalTracks() {
    // Check if tracks are already loaded
    if (playListData.length === 0) {
        await requestAndLoadLocalTracks();
    }
    return playListData;
}

// You can also preload the tracks when this module is imported
requestAndLoadLocalTracks();


// Export a function to get the playListData
export function getPlaylistData() {
    return getLocalTracks();
}
