type MusicItem = {
    title: string,
    src: string,
    start?: number,
    end?: number,
    spotifyLink?: string,
    appleMusicLink?: string,
    youtubeLink?: string,
};

const musicBaseUrl = '/audio-proxy/music';
const buildMusicSrc = (fileName: string) => `${musicBaseUrl}/${fileName}`;

export const musicItems: MusicItem[] = [
    {
        title: "Color In Grey",
        src: buildMusicSrc("Color%20In%20Grey%20-%20main%20mix%20master%203.wav"),
        start: 263,
        end: 293,
    },
    {
        title: "Last Night (Instrumental)",
        src: buildMusicSrc("last%20night%20-%20rough%202%20(1).mp3"),
        start: 170,
        end: 200,
    },
    {
        title: "You Don't Know Me Know (Instrumental)",
        src: buildMusicSrc("you%20dont%20know%20me%20-%20rough%203.mp3"),
        start: 0,
        end: 30,
    }, {
        title: "In Your Eyes (Instrumental)",
        src: buildMusicSrc("Weapon%20Eyes_rough_1.mp3"),
        start: 0,
        end: 30,
    },
    {
        title: "Climbing You (Instrumental)",
        src: buildMusicSrc("climbing%20you%20-%20rough%201.mp3"),
        start: 156,
        end: 186,
    },
    {
        title: "Sisyphus (Instrumental)",
        src: buildMusicSrc("Sisyphus_rough%201.mp3"),
        start: 0,
        end: 30,
    }

];