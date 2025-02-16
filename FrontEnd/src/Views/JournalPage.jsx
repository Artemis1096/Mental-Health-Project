import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import Note from "../Components/Journal/Note";
import axios from "axios";
import "../Styles/Journal.css";

const JournalPage = () => {
  //all necessary states needed in this section
  const [isExpandedId, setIsExpandedId] = useState(null);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [journals, setJournals] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");

  const user = useSelector((state) => state.user);

  const userId = user.User.id;

  //useEffect to fetch all user's journals
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/users/journals/${userId}`,
          { withCredentials: true }
        );
        setJournals(sortJournalsByDate(res.data.journals, sortOrder));
      } catch (err) {
        console.log(err);
      }
    };
    fetchJournals();
  }, [userId, sortOrder, journals]);

  //function to sort the journals according to date
  const sortJournalsByDate = (journals, order) => {
    return [...journals].sort((a, b) => {
      return order === "asc"
        ? new Date(a.createdAt) - new Date(b.createdAt)
        : new Date(b.createdAt) - new Date(a.createdAt);
    });
  };

  const toggleSortOrder = () =>
    setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));

  const handleToggle = (id) =>
    setIsExpandedId((prevId) => (prevId === id ? null : id));

  //function to delete a journal entry.
  const onDelete = async (id) => {
    setJournals((prev) => prev.filter((note) => note.id !== id));

    try {
      const res = await axios.delete(
        `http://localhost:8000/api/users/journals/delete/${id}`,
        { withCredentials: true }
      );
      console.log(res);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setNewNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //function to add a journal entry
  const handleAddNote = async (e) => {
    e.preventDefault();
    if (newNote.title && newNote.content) {
      try {
        const res = await axios.post(
          "http://localhost:8000/api/users/journals/add",
          {
            ...newNote,
            userId,
          },
          { withCredentials: true }
        );
        setJournals((prev) =>
          sortJournalsByDate([...prev, res.data.journal], sortOrder)
        );
        setNewNote({ title: "", content: "" });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-color">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Personal Journal
          </h1>
          <p className="text-white">Capture your thoughts and memories</p>
        </div>

        {/* New Entry Section */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-b rounded-2xl shadow-xl mb-8 overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">
              New Entry
            </h2>
            <form onSubmit={handleAddNote} className="space-y-4">
              <div className="space-y-2">
                <input
                  type="text"
                  name="title"
                  placeholder="Entry Title"
                  value={newNote.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl bg-color-r transition-all duration-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <textarea
                  name="content"
                  placeholder="Write your thoughts..."
                  value={newNote.content}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl text-white bg-color-r transition-all duration-300 min-h-[150px]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-color text-white font-semibold rounded-xl transition-all duration-300  active:scale-[0.98] shadow-lg hover:shadow-xl"
              >
                Save Entry
              </button>
            </form>
          </div>
        </motion.div>

        {/* Entries Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Your Entries</h2>
          <button
            onClick={toggleSortOrder}
            className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-black rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span className="text-sm font-medium text-white">
              {sortOrder === "desc" ? "Newest First" : "Oldest First"}
            </span>
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
              />
            </svg>
          </button>
        </div>

        {/* Scrollable Entries */}
        <div className="h-[400px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-purple-200 dark:scrollbar-thumb-purple-400 dark:scrollbar-track-purple-900">
          <AnimatePresence>
            {journals.map((journal) => (
              <motion.div
                key={journal._id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                layout
                className="w-full"
              >
                <Note
                  journal={journal}
                  onDelete={onDelete}
                  handleToggle={handleToggle}
                  isExpanded={isExpandedId === journal._id}
                />
              </motion.div>
            ))}
          </AnimatePresence>
          {journals.length === 0 && (
            <div className="text-center py-12 text-white">
              No journal entries yet. Start writing your first entry above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
