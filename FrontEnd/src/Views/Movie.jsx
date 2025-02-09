import React, { useState } from "react";

import ABMRAPI from "abmrapi"; // Import your API file

const Movie = () => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecommendation = async () => {
    setLoading(true);
    setMovie(null);

    const api = new ABMRAPI();
    try {
      const MovieRecommendation = await api.requestMovieRecommendation(
        "Suggest a movie for me!"
      );

      if (MovieRecommendation && MovieRecommendation.title) {
        setMovie(MovieRecommendation);
      } else {
        setMovie({ title: "No recommendations found", description: "" });
      }
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setMovie({
        title: "Error fetching movie",
        description: "Please try again later.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="recommendation-container">
      <h1>🎬 Movie Recommendation</h1>
      <button
        className="fetch-button"
        onClick={fetchRecommendation}
        disabled={loading}
      >
        {loading ? "Fetching..." : "Suggest a Movie"}
      </button>

      {movie && (
        <div className="movie-card">
          <h2>{movie.title}</h2>
          <p>{movie.description || "No description available."}</p>
        </div>
      )}
    </div>
  );
};

export default Movie;
