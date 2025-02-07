import { useState, useEffect } from "react";
import ArticleCard from "../Components/ArticlesPage/ArticleCard";
import axios from "axios";
import { UseAuthContext } from "../Context/AuthContext";
import bg from "../Assets/articlebg.jpg";

function ArticlesPage() {
  const { auth } = UseAuthContext();
  const [articles, setArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All");
  const [categories, setCategories] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/articles", {
          withCredentials: true,
        });
        const fetchedArticles = response.data.data.map((article) => ({
          ...article,
          likedByCurrentUser: article.likedByCurrentUser || false,
        }));
        setArticles(fetchedArticles);
        // console.log(fetchedArticles);
        

        const uniqueCategories = [...new Set(response.data.data.map((article) => article.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticles();

    if (auth && auth.userType === "admin") {
      setIsAdmin(true);
    }
  }, []);

  const handleLike = async (articleId) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/articles/like/${articleId}`,
        {},
        { withCredentials: true }
      );

      setArticles((prevArticles) =>
        prevArticles.map((article) =>
          article._id === articleId
            ? {
                ...article,
                likedByCurrentUser: response.data.likedByCurrentUser,
                likes: response.data.likesCount,
              }
            : article
        )
      );
    } catch (error) {
      console.error("Error toggling like:", error.message);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || article.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <img src={bg} alt="Background" className="absolute inset-0 w-full h-full object-cover -z-10" />
      <h1 className="text-5xl font-bold text-center py-4">Articles</h1>

      <div className="flex justify-center gap-4 my-4">
        {isAdmin && (
          <button className="!bg-purple-400 !text-black rounded-2xl p-3">Add Article</button>
        )}
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-md"
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="p-2 border bg-purple-900 border-gray-300 rounded-md">
          <option value="All">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 py-7">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => (
            <ArticleCard key={article._id} article={article} handleLike={handleLike} />
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No articles found.</p>
        )}
      </div>
    </>
  );
}

export default ArticlesPage;
