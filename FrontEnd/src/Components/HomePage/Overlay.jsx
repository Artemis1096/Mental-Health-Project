import { useProgress } from "@react-three/drei";
import { usePlay } from "../../Context/Play";
import { Link } from "react-router";

export const Overlay = () => {
  const { progress } = useProgress();
  const { play, end, setPlay, hasScroll } = usePlay();
  return (
    <div
      className={`overlay ${play ? "overlay--disable" : ""}
    ${hasScroll ? "overlay--scrolled" : ""}`}
    >
      <div
        className={`loader ${progress === 100 ? "loader--disappear" : ""}`}
      />
      {progress === 100 && (
        <div className={`intro ${play ? "intro--disappear" : ""}`}>
          <h1 className="logo">
            Vellura 和
            <div className="spinner">
              <div className="spinner__image" />
            </div>
          </h1>
          <p className="intro__scroll">Scroll to begin the journey</p>
          <button
            className="explore"
            onClick={() => {
              setPlay(true);
            }}
          >
            Explore
          </button>
        </div>
      )}
      <div className={`outro ${end ? "outro--appear" : ""}`}>
        <p className="outro__text">
          WE WELCOME YOU <br />
          TO YOUR OWN SAFE SPACE.
        </p>
        <div className="button-class">
          <button className="btn">
            <Link to="/login">Login</Link>
          </button>
          <button className="btn">
            <Link to="/register">Signup</Link>
          </button>
        </div>
      </div>
    </div>
  );
};
