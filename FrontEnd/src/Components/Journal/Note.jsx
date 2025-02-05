import React from "react";

const Note = ({ journal, onDelete, handleToggle, isExpanded }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-4 m-2 w-full cursor-pointer"
      onClick={() => handleToggle(journal._id)}
    >
      {/* Title (Click to Expand) */}
      <div className="text-lg font-bold text-gray-900 flex justify-between items-center">
        {journal.title}
        <span className="text-gray-600">{isExpanded ? "▲" : "▼"}</span>
      </div>

      {/* Content (Visible when expanded) */}
      {isExpanded && (
        <>
          <p className="mt-2 text-gray-800">{journal.content}</p>

          {/* Delete Button - Prevents event bubbling */}
          <div className="flex justify-end mt-2">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent click from triggering expansion
                onDelete(journal._id);
              }}
              className="!bg-red-500 text-white px-3 py-1 rounded hover:!bg-red-600"
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
