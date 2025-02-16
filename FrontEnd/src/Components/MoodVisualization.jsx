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
import "../Styles/Profile.css";

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
              borderColor: "#7d3c98", // Line color
              backgroundColor: "#7b187b6d", // Fill under line
              pointBackgroundColor: "#7b187b6d", // Dots on data points
              pointBorderColor: "#9d609dba",
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

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow responsive height control via CSS
    plugins: {
      title: {
        display: true,
        text: "Mood Trends Over Time",
        color: "white", // Set title text color to white
      },
      tooltip: {
        bodyColor: "white", // Set tooltip text color to white
      },
      legend: {
        labels: {
          color: "white", // Set legend labels color to white
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white", // Set x-axis labels color to white
        },
      },
      y: {
        ticks: {
          color: "white", // Set y-axis labels color to white
        },
      },
    },
  };

  return (
    <div className="w-full h-[300px] md:h-[400px] mt-5 text-white p-2 chart-bg rounded-lg">
      <h1 className="text-center text-white">Mood Trends Over Time</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-white">{error}</p>}
      {chartData && (
        <Line className="text-white" data={chartData} options={options} />
      )}
    </div>
  );
};

export default MoodVisualization;
