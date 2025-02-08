import { useState } from "react";
import "../../Styles/Articles.css"

function CategoryDropdown({ category, setCategory, categories }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-40 ">
      {/* Button to open dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 w-full px-6 text-left border bg-color !text-white !border-gray-300 rounded-xl focus:ring-2"
      >
        {"Select Category"}
      </button>

      {/* Dropdown List */}
      {isOpen && (
        <ul className="absolute left-0 mt-1 w-full bg-color border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
          <li
            className="p-2 hover:bg-purple-200 text-center cursor-pointer"
            onClick={() => {
              setCategory("All");
              setIsOpen(false);
            }}
          >
            All Categories
            <hr/>
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
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CategoryDropdown;
