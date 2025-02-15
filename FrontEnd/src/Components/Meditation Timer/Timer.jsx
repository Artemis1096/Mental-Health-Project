import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";
import SettingsButton from "./SettingsButton";
import { useContext, useState, useEffect, useRef } from "react";
import SettingsContext from "../../Context/SettingsContext";
import "../../Styles/Slider.css";

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  const totalSeconds = settingsInfo.workMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="bg-color pb-3 rounded-2xl shadow-2xl w-56">
      <div className="bg-color p-5 rounded-2xl shadow-4xl w-56">
        {/* Container to layer the progress bars */}
        <div style={{ position: "relative" }}>
          {/* Outer progress bar acting as a white border */}
          <CircularProgressbar
            value={100}
            styles={buildStyles({
              pathColor: "white",
              trailColor: "transparent",
            })}
            // Adjust the strokeWidth to control the border thickness
            strokeWidth={7}
          />
          {/* Inner progress bar with gradient stroke and timer text */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <CircularProgressbar
              value={percentage}
              text={`${minutes}:${seconds}`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "url(#gradient)",
                trailColor: "rgba(255,255,255,.2)",
              })}
              // A slightly smaller strokeWidth so the white border shows around it
              strokeWidth={6}
            />
            {/* Define the gradient used by the inner progress bar */}
            <svg width={0} height={0}>
              <defs>
                <linearGradient
                  id="gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#2980b9" />
                  <stop offset="100%" stopColor="#7d3c98" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
      <div className="play-btn">
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <div className="shadow-2xl bg-color w-full rounded-3xl p-2">
        <SettingsButton
          onClick={() => settingsInfo.setShowSettings(true)}
        />
      </div>
    </div>
  );
}

export default Timer;
