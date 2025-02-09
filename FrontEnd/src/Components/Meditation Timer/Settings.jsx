import ReactSlider from "react-slider";
import "../../Styles/Slider.css";
import SettingsContext from "../../Context/SettingsContext";
import { useContext } from "react";
import BackButton from "./BackButton";

function Settings() {
  const settingsInfo = useContext(SettingsContext);
  return (
    <div
      style={{ textAlign: "left" }}
      className="relative p-5 ml-20 rounded-2xl shadow-2xl bg-color w-full"
    >
      <label className="text-xl">Set Time: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <BackButton onClick={() => settingsInfo.setShowSettings(false)} />
      </div>
    </div>
  );
}

export default Settings;
