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

  const [showModal, setShowModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    category: "",
    image: "",
  });
  const [image, setImage] = useState(null);

  // const ad = user.userType === "admin";

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
  }, [showModal]);

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
  
  const handleAddArticle = async () => {
    setShowModal(true);

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("img", fileName);
      data.append("file", image);
      newArticle.image = fileName;
      try {
        await axios.post("http://localhost:8000/api/upload", data);
      } catch (error) {
        console.log("error uploading image\n", error.message);
      }
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/articles/create",
        newArticle,
        { withCredentials: true }
      );
    } catch (error) {
      console.log("error creating article : client", error.message);
    }

    setShowModal(false);
  };
  
  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "All" || article.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <img
        src={bg}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover -z-10"
      />
      <h1 className="text-5xl font-bold text-center py-4 permanent-marker-regular">
        Articles
      </h1>

      {/* Search & Filter Section */}
      <div className="flex justify-center gap-4 my-4">
        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="!bg-purple-400 !text-black rounded-2xl p-3"
          >
            Add Article
          </button>
        )}
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border bg-purple-900 border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500"
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
      <div className="max-h-[80vh] w-full overflow-y-scroll grid ">
        <div className="  grid grid-cols-1   sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 py-7  place-content-center">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <ArticleCard key={article._id} article={article} handleLike={handleLike}/>
            ))
          ) : (
            <p className="text-center text-gray-500 text-lg">
              No articles found.
            </p>
          )}
        </div>
      </div>

      {/* Modal for Adding an Article */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl text-black font-bold mb-4">Add Article</h2>
            <input
              type="text"
              placeholder="Title"
              value={newArticle.title}
              onChange={(e) =>
                setNewArticle({ ...newArticle, title: e.target.value })
              }
              className="w-full p-2 mb-3 border text-black border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Content"
              value={newArticle.content}
              onChange={(e) =>
                setNewArticle({ ...newArticle, content: e.target.value })
              }
              className="w-full p-2 mb-3 border border-gray-300 rounded-md"
            ></textarea>
            <input
              type="text"
              placeholder="Category"
              value={newArticle.category}
              onChange={(e) =>
                setNewArticle({ ...newArticle, category: e.target.value })
              }
              className="w-full p-2 mb-3 border text-black border-gray-300 rounded-md"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full p-2 mb-3 border border-gray-300 rounded-md"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 !bg-gray-400 text-white rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddArticle}
                className="px-4 py-2 !bg-blue-500 text-white rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ArticlesPage;
