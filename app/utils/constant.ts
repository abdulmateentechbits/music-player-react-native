import { Track } from 'react-native-track-player';

export const playListData: Track[] = [
    {
        id: 1,
        title: 'Dmitry Glushkov - Sinhala song',
        artist: 'Demitry',
        album: 'Happy Album',
        artwork: 'https://cdn.pixabay.com/photo/2021/09/13/23/10/vinyl-6622596_1280.jpg',
        url: require('../songs/demitry_1.mp3'),
    },
    {
        id: 2,
        title: ' Can you hear me',
        artist: 'Dopamine - Giulio Cercato',
        album: 'Dopamine (Lyrics)',
        artwork: 'https://cdn.pixabay.com/photo/2014/02/04/17/56/speakers-258175_640.jpg',
        url: require('../songs/dopamine.mp3'),
    },
    {
        id: 3,
        title: 'Children Music',
        artist: 'Jhon doe',
        album: 'Children',
        artwork: 'https://cdn.pixabay.com/photo/2016/08/28/02/01/solo-violinist-1625307_1280.jpg',
        url: require('../songs/demitry_1.mp3'),
    },
    {
        id: 4,
        title: 'Background music - life',
        artist: 'Non copyrighted',
        album: 'Background music',
        artwork: 'https://cdn.pixabay.com/photo/2016/11/19/00/12/wave-1837426_1280.png',
        url: require('../songs/dopamine.mp3'),
    },
]