import React, { useState, useEffect } from "react";

const ParallaxShowcase = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [trainPosition, setTrainPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (position / maxScroll) * 100;
      setScrollPosition(scrollPercentage);

      // Move train horizontally
      const newTrainPosition = scrollPercentage * 1.2;
      setTrainPosition(Math.min(newTrainPosition, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* First Page */}
      <div className="h-screen relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            transform: `translateY(${scrollPosition * 0.1}px)`,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5))`,
          }}
        />

        {/* Main Content */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-4 transition-opacity duration-500 mt-20"
          style={{ opacity: Math.max(1 - scrollPosition / 50, 0) }}
        >
          <div className="bg-black/30 p-8 rounded-xl backdrop-blur-sm text-center">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6">
              Scroll to Discover
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto">
              Explore a world full of endless possibilities! 🌍✨
            </p>
          </div>
        </div>
      </div>

      {/* Second Page */}
    </div>
  );
};

export default ParallaxShowcase;
