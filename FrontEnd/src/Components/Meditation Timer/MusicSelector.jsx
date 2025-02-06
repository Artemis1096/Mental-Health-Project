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
        audioRef.current.play().catch((err) =>
          console.error("Error playing audio:", err)
        );
      }
    }
  }, [currentIndex, songs, isPlaying]);

  const playPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) =>
        console.error("Error playing audio:", err)
      );
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
    <div className="music-player p-4 text-center shadow-lg rounded-2xl bg-black">
      <h2 className="text-lg font-semibold mb-2 text-white">Music Player</h2>
      <audio
        key={songs[currentIndex]} // Force remount when the song changes.
        ref={audioRef}
        onEnded={nextTrack}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onCanPlay={() => {
          if (isPlaying) {
            audioRef.current.play().catch((err) =>
              console.error("Error playing audio on canplay:", err)
            );
          }
        }}
      >
        <source src={songs[currentIndex]} type="audio/mpeg" />
      </audio>
      <div className="flex gap-2 justify-center mt-4">
        <button
          onClick={playPause}
          className="p-2 border rounded bg-blue-500 text-white hover:bg-blue-600"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button
          onClick={nextTrack}
          className="p-2 border rounded bg-gray-200 hover:bg-gray-300"
        >
          <SkipForward size={20} />
        </button>
      </div>
      <p className="text-sm mt-2 text-white">
        Now Playing: {songs[currentIndex].split("/").pop()}
      </p>
    </div>
  );
}
