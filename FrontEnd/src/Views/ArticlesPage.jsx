import { useState, useEffect } from "react";
import ArticleCard from "../Components/ArticlesPage/ArticleCard";
import axios from "axios";

function ArticlesPage() {
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state
  const [category, setCategory] = useState("All"); // Selected category
  const [categories, setCategories] = useState([]); // All available categories

  // Fetch articles from the backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/articles");
        setArticles(response.data.data);

        // Extract unique categories from articles
        const uniqueCategories = [
          ...new Set(response.data.data.flatMap((article) => article.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };
    fetchArticles();
  }, []);

  // Filter articles based on search term and category
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      category === "All" || article.category.includes(category);

    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <h1 className="text-5xl font-bold text-center py-4 permanent-marker-regular">
        Articles
      </h1>

      {/* Search & Filter Section */}
      <div className="flex justify-center gap-4 my-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="All">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Articles List */}
      <div className="max-h-[80vh] overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 py-7">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No articles found.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ArticlesPage;
