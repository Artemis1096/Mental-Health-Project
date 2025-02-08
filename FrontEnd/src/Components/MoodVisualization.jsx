import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

// Register required components for Line Chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MoodVisualization = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/mood/get", {
          withCredentials: true,
        });
        console.log("API Response:", response.data);

        if (!response.data || !response.data.moodData) {
          throw new Error("No mood data available");
        }

        const moodData = response.data.moodData;

        if (moodData.length === 0) {
          throw new Error("No mood entries found");
        }

        // Sort by date (optional)
        moodData.sort((a, b) => new Date(a.date) - new Date(b.date));

        // Extract dates and mood values
        const labels = moodData.map((item) =>
          new Date(item.date).toLocaleDateString()
        );
        const moodValues = moodData.map((item) => item.mood);

        // Set chart data
        setChartData({
          labels,
          datasets: [
            {
              label: "Mood Level (1-5)",
              data: moodValues,
              borderColor: "rgba(75, 192, 192, 1)", // Line color
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill under line
              pointBackgroundColor: "rgba(75, 192, 192, 1)", // Dots on data points
              pointBorderColor: "#fff",
              pointRadius: 5,
              fill: true,
              tension: 0.3, // Smoother curve
            },
          ],
        });

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMoodData();
  }, []);

  return (
    <div className="w-full h-xl mt-5 text-black p-2 bg-white rounded-lg">
      <h1 className="text-center">Mood Trends Over Time</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {chartData && <Line data={chartData} />}
    </div>
  );
};

export default MoodVisualization;
