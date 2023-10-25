// hooks/useLoadPlaylist.js
import { useState, useEffect } from 'react';
import TrackPlayer, { Track } from 'react-native-track-player';

function useLoadPlaylist() {
  const [queue, setQueue] = useState<Track[]>([]);

  async function loadPlaylist() {
    const queue = await TrackPlayer.getQueue();
    setQueue(queue);
  }

  useEffect(() => {
    loadPlaylist();
  }, []);

  return { queue, loadPlaylist };
}

export default useLoadPlaylist;
