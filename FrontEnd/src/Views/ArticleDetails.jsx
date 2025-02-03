import React from "react";
import { useParams } from "react-router";

const ArticleDetails = () => {
  const { id } = useParams();

  const article = dummyArticles.find((article) => article.id === parseInt(id));

  return (
    <div className="max-w-4xl mx-auto my-8 px-8 py-12 bg-white rounded-lg shadow-lg ">
      <div className="h-svh overflow-y-auto">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        {/* Article Title */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          {article.title}
        </h1>

        {/* Article Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.category.map((category, index) => (
            <span
              key={index}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-md"
            >
              #{category}
            </span>
          ))}
        </div>

        {/* Article Content */}
        <p className="text-gray-700 text-lg mb-6">{article.content}</p>

        {/* Likes Section */}
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-red-500 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052a5.5 5.5 0 014.313-2.052c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"
            />
          </svg>
          <span className="text-gray-700 font-semibold">
            {article.likes} Likes
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;

const dummyArticles = [
  {
    id: 1,
    title: "Exploring the Sahara Desert",
    content:
      "The Sahara Desert is the largest hot desert in the world, covering much of North Africa. It is known for its vast sand dunes and extreme temperatures.",
    image: "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg",
    category: ["Travel", "Nature"],
    likes: 120,
  },
  {
    id: 2,
    title: "The Rise of Artificial Intelligence",
    content:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
    image:
      "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: ["Technology", "Innovation"],
    likes: 95,
  },
  {
    id: 3,
    title: "Benefits of a Plant-Based Diet",
    content:
      "A plant-based diet is rich in nutrients and has numerous health benefits. It reduces the risk of chronic diseases and promotes overall well-being.",
    image:
      "https://images.pexels.com/photos/5965655/pexels-photo-5965655.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: ["Health", "Lifestyle"],
    likes: 78,
  },
  {
    id: 4,
    title: "Space Exploration: The Next Frontier",
    content:
      "With recent advancements in space technology, humanity is closer than ever to exploring Mars and beyond. SpaceX and NASA are leading the way.",
    image:
      "https://images.pexels.com/photos/1252890/pexels-photo-1252890.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: ["Science", "Space"],
    likes: 150,
  },
  {
    id: 5,
    title: "Mastering JavaScript in 2025",
    content:
      "JavaScript continues to evolve, with new frameworks and best practices. Learning JavaScript in 2025 requires mastering ES6+ features and modern tools.",
    image:
      "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=400",
    category: ["Programming", "Web Development"],
    likes: 200,
  },
];
