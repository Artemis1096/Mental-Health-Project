import React from 'react'
import "../Styles/MeditationTimer.css"
import Timer from "../Components/Meditation Timer/Timer";
import Settings from "../Components/Meditation Timer/Settings";
import {useState} from "react";
import SettingsContext from "../Context/SettingsContext";

function MeditationTimer() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <main>
      <SettingsContext.Provider value={{
        showSettings,
        workMinutes,
        breakMinutes,
        setShowSettings,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
    </main>
  );
}

export default MeditationTimer;