import { useState } from "react";
import axios from "axios";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";

const moods = [
  { value: 1, label: "Very Unhappy", emoji: "😢" },
  { value: 2, label: "Unhappy", emoji: "☹️" },
  { value: 3, label: "Neutral", emoji: "😐" },
  { value: 4, label: "Happy", emoji: "🙂" },
  { value: 5, label: "Very Happy", emoji: "😁" },
];

const MoodComponent = ({ onMoodSubmit }) => {
  const [open, setOpen] = useState(true);
  const [selectedMood, setSelectedMood] = useState(null);
  const [error, setError] = useState("");

  const handleConfirm = async () => {
    if (!selectedMood) {
      setError("Please select a mood.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8000/api/mood/set",
        { mood: selectedMood },
        { withCredentials: true }
      );

      setOpen(false);
      onMoodSubmit(); // Hide the component after successful submission
    } catch (error) {
      console.error("Error saving mood:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-gray-800 p-6 shadow-xl sm:max-w-md">
            <DialogTitle as="h3" className="text-lg font-semibold text-white">
              How are you feeling today?
            </DialogTitle>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <div className="mt-4 flex justify-between">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-3 text-2xl rounded-full transition-all border-2 border-transparent hover:border-gray-300 ${
                    selectedMood === mood.value ? "border-blue-500" : ""
                  }`}
                >
                  {mood.emoji}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button onClick={() => setOpen(false)} className="px-4 py-2 text-white bg-black rounded-md">
                Cancel
              </button>
              <button onClick={handleConfirm} className="px-4 py-2 text-white bg-black rounded-md">
                Confirm
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default MoodComponent;
