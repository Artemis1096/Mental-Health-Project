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
    <main className="w-full h-screen">
      <h1 className="p-3 my-10 text-5xl text-white rounded-2xl ">
        Meditate
      </h1>
      <div className=" mx-10 grid grid-cols-1 sm:grid-cols-2 gap-10">
        <div className="timer ml-10  w-full">
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
        <div className="">
          <MusicSelector />
        </div>
      </div>
    </main>
  );
}

export default MeditationTimer;
