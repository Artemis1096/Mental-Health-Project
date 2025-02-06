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
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main className="p-8 flex">
      <div className="timer">
        <h1 className="m-6 text-4xl">Meditate</h1>
        <SettingsContext.Provider
          value={{
            showSettings,
            workMinutes,
            breakMinutes,
            setShowSettings,
            setWorkMinutes,
            setBreakMinutes,
          }}
        >
          {showSettings ? <Settings /> : <Timer />}
        </SettingsContext.Provider>
      </div>
      <div className="music-player m-20">
        <MusicSelector/>
      </div>
    </main>
  );
}

export default MeditationTimer;
