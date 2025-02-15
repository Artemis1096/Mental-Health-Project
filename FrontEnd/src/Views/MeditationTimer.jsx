import "../Styles/MeditationTimer.css";
import { useState } from "react";
import Timer from "../Components/Meditation Timer/Timer";
import Settings from "../Components/Meditation Timer/Settings";
import SettingsContext from "../Context/SettingsContext";
import MusicSelector from "../Components/Meditation Timer/MusicSelector";

function MeditationTimer() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(10);

  return (
    // Main container uses flex and padding to center content responsively.
    <main className="w-full h-screen flex flex-col items-center p-4 bg-color">
      {/* Responsive heading: adjusts size on small devices */}
      <h1 className="text-center p-3 my-10 text-3xl md:text-5xl text-white rounded-2xl">
        Meditate
      </h1>
      {/* Grid container: on small screens it stacks, on larger screens it uses 2 columns */}
      <div className="w-full mx-4 md:mx-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
        {/* Timer/Settings container: margin adjusted for small screens */}
        <div className="timer w-full ml-0 sm:ml-10">
          <SettingsContext.Provider
            value={{
              showSettings,
              workMinutes,
              setShowSettings,
              setWorkMinutes,
            }}
          >
            {showSettings ? <Settings /> : <Timer />}
          </SettingsContext.Provider>
        </div>
        {/* Music selector container */}
        <div className="w-full">
          <MusicSelector />
        </div>
      </div>
    </main>
  );
}

export default MeditationTimer;
