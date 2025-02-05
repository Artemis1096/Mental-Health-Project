import React from "react";
import bg from "../../Assets/Bg-video.mp4";

const BackgroundVideo = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
        <source src={bg} type="video/mp4" />
      </video>
    </div>
  );
};

export default BackgroundVideo;
