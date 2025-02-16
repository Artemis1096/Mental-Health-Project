import "../Styles/MeditationTimer.css"; // Importing the CSS file for styling
import { useState } from "react"; // Importing useState hook for state management
import Timer from "../Components/Meditation Timer/Timer"; // Timer component for countdown
import Settings from "../Components/Meditation Timer/Settings"; // Settings component for configuring timer
import SettingsContext from "../Context/SettingsContext"; // Context to manage timer settings globally
import MusicSelector from "../Components/Meditation Timer/MusicSelector"; // Component for selecting background music

function MeditationTimer() {
  // State to toggle between timer and settings view
  const [showSettings, setShowSettings] = useState(false);

  // State to store meditation duration in minutes
  const [workMinutes, setWorkMinutes] = useState(10);

  return (
    <main className="w-full h-screen">
      {/* Heading */}
      <h1 className="p-3 my-10 text-5xl text-white rounded-2xl ">Meditate</h1>

      <div className="mx-10 grid grid-cols-1 gap-10">
        {/* Timer Section */}
        <div className="timer ml-10 w-full">
          <SettingsContext.Provider
            value={{
              showSettings,
              workMinutes,
              setShowSettings,
              setWorkMinutes,
            }}
          >
            {/* Show settings if toggled, otherwise show timer */}
            {showSettings ? <Settings /> : <Timer />}
          </SettingsContext.Provider>
        </div>

        {/* Music Selector Section */}
        <div>
          <MusicSelector />
        </div>
      </div>
    </main>
  );
}

export default MeditationTimer;
