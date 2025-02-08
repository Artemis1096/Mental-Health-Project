import React from "react";
import "../Styles/MeditationTimer.css";
import Timer from "../Components/Meditation Timer/Timer";
import Settings from "../Components/Meditation Timer/Settings";
import { useState } from "react";
import SettingsContext from "../Context/SettingsContext";
import MusicSelector from "../Components/Meditation Timer/MusicSelector";
import "../Styles/MeditationTimer.css"

function MeditationTimer() {
  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(10);

  return (
    <main className="p-8 w-full">
      <h1 className="m-6 text-4xl">Meditate</h1>
      <div className="med-main flex flex-col ">
        <div className="timer">
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
        <div className="music-player">
          <MusicSelector />
        </div>
      </div>
    </main>
  );
}

export default MeditationTimer;
