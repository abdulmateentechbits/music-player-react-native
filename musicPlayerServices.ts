import TrackPlayer, { AppKilledPlaybackBehavior, Capability, Event, RepeatMode } from 'react-native-track-player';
import { getPlaylistData } from './app/utils/constant';

export async function setupPlayer() {
    let isSetup = false;
    try {
      await TrackPlayer.getActiveTrackIndex();
      isSetup = true;
    }
    catch {
      await TrackPlayer.setupPlayer();
      await TrackPlayer.updateOptions({
        android: {
          appKilledPlaybackBehavior:
            AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification,
        },
        capabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
          Capability.SkipToPrevious,
          Capability.SeekTo,
        ],
        compactCapabilities: [
          Capability.Play,
          Capability.Pause,
          Capability.SkipToNext,
        ],
        progressUpdateEventInterval: 2,

      });
  
      isSetup = true;
    }
    finally {
      return isSetup;
    }
  }
  

export async function addTrack() {
    const playlistData = await getPlaylistData();
    await setupPlayer();
    await TrackPlayer.add(playlistData);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue);
}

export async function playbackService() {

    TrackPlayer.addEventListener(Event.RemotePlay, () => {
        TrackPlayer.play();
    })
    TrackPlayer.addEventListener(Event.RemotePause, () => {
        TrackPlayer.pause();
    })
    TrackPlayer.addEventListener(Event.RemotePrevious, () => {
        TrackPlayer.skipToPrevious();
    })
    TrackPlayer.addEventListener(Event.RemoteNext, () => {
        TrackPlayer.skipToNext();
    })

    TrackPlayer.addEventListener(Event.RemoteSeek, async (position) => {
        await TrackPlayer.seekTo(position.position)
      });

}