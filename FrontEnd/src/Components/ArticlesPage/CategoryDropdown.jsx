import { useState } from "react";

function CategoryDropdown({ category, setCategory, categories }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-40 ">
      {/* Button to open dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 w-full text-left border !bg-purple-900 !text-white !border-gray-300 rounded-xl focus:ring-2 focus:!ring-purple-500"
      >
        {"Select Category ⬇️"}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-purple-800 border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          <li
            className="p-2 hover:bg-purple-200 text-center cursor-pointer"
            onClick={() => {
              setCategory("All");
              setIsOpen(false);
            }}
          >
            All Categories
          </li>
          {categories.map((cat, index) => (
            <li
              key={index}
              className="p-2 hover:bg-purple-200 cursor-pointer"
              onClick={() => {
                setCategory(cat);
                setIsOpen(false);
              }}
            >
              {cat}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryDropdown;
