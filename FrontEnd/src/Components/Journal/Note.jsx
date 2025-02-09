import React from "react";
import "../../Styles/Journal.css"

const Note = ({ journal, onDelete, handleToggle, isExpanded }) => {
  return (
    <div
      className="bg-journal shadow-lg rounded-lg p-4 m-2 w-full cursor-pointer"
      onClick={() => handleToggle(journal._id)}
    >
      {/* Title (Click to Expand) */}
      <div className="text-lg font-bold text-white flex justify-between items-center">
        {journal.title}
        <span className="text-white">{isExpanded ? "▲" : "▼"}</span>
      </div>

      {/* Content (Visible when expanded) */}
      {isExpanded && (
        <>
          <p className="mt-2 text-white">{journal.content}</p>

          {/* Delete Button - Prevents event bubbling */}
          <div className="flex justify-end mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from triggering expansion
                onDelete(journal._id);
              }}
              className="bg-black text-white px-3 py-1 rounded d-btn"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Note;
