import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";
import "../../Styles/MusicPlayer.css";

// Update the predefinedSongs array to reference files in your assets folder.
const predefinedSongs = [
  "/Assets/a1.mp3",
  "/Assets/a2.mp3",
  "/Assets/a3.mp3",
  "/Assets/a4.mp3",
  "/Assets/a5.mp3",
];

export default function MusicPlayer() {
  const [songs, setSongs] = useState(predefinedSongs);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Load new source when the current song or songs list changes.
  useEffect(() => {
    if (audioRef.current) {
      console.log("Loading audio source:", songs[currentIndex]);
      audioRef.current.load();
      // Attempt to play if already in playing state.
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Error playing audio:", err));
      }
    }
  }, [currentIndex, songs, isPlaying]);

  const playPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current
        .play()
        .catch((err) => console.error("Error playing audio:", err));
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIndex = (currentIndex + 1) % songs.length;
    setCurrentIndex(nextIndex);
    // Setting isPlaying true will let the effect and onCanPlay handle playback.
    setIsPlaying(true);
  };

  return (
    <div className=" p-4 mx-10 text-center bg-color h-96 pt-10 shadow-lg rounded-2xl bg-purple-950">
      <h2 className="text-xl  font-semibold my-2 text-white rounded-2xl ">
        Music Player
      </h2>
      <audio
        key={songs[currentIndex]} // Force remount when the song changes.
        ref={audioRef}
        onEnded={nextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onCanPlay={() => {
          if (isPlaying) {
            audioRef.current
              .play()
              .catch((err) =>
                console.error("Error playing audio on canplay:", err)
              );
          }
        }}
      >
        <source src={songs[currentIndex]} type="audio/mpeg" />
      </audio>
      <div className="flex gap-2 p-3 justify-center rounded-3xl shadow-2xl my-10">
        <button
          onClick={playPause}
          className="p-2 border rounded text-white hover:!bg-black"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={nextTrack}
          className="p-2 border rounded text-white hover:!bg-black"
        >
          <SkipForward size={20} />
        </button>
      </div>
      {/* <p className="text-md mt-2 text-white">
        Now Playing: {songs[currentIndex].split("/").pop()}
      </p> */}
      <div className="mt-7 bg-color py-3 rounded-2xl ">
        <h1 className="text-7xl ">🎵</h1>
      </div>
    </div>
  );
}
