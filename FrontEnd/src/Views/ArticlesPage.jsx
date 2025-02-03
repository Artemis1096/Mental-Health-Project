import { useState } from "react";
import ArticleCard from "../Components/ArticlesPage/ArticleCard";

function ArticlesPage() {
  const [articles, setArticles] = useState(dummyArticles);

  return (
    <>
      <h1 className="text-5xl font-bold text-center py-4 permanent-marker-regular">
        Articles
      </h1>
      <div className="max-h-[80vh] overflow-y-scroll">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-3 py-7">
          {articles.map((article) => (
            <ArticleCard key={article.title} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ArticlesPage;

const dummyArticles = [
  {
    id: 1,
    title: "Exploring the Sahara Desert",
    content:
      "The Sahara Desert is the largest hot desert in the world, covering much of North Africa. It is known for its vast sand dunes and extreme temperatures.",
    image: "https://example.com/images/sahara.jpg",
    category: ["Travel", "Nature"],
    likes: 120,
  },
  {
    id: 2,
    title: "The Rise of Artificial Intelligence",
    content:
      "Artificial intelligence is transforming industries worldwide, from healthcare to finance. AI-driven solutions are improving efficiency and decision-making.",
    image: "https://example.com/images/ai.jpg",
    category: ["Technology", "Innovation"],
    likes: 95,
  },
  {
    id: 3,
    title: "Benefits of a Plant-Based Diet",
    content:
      "A plant-based diet is rich in nutrients and has numerous health benefits. It reduces the risk of chronic diseases and promotes overall well-being.",
    image: "https://example.com/images/plant-diet.jpg",
    category: ["Health", "Lifestyle"],
    likes: 78,
  },
  {
    id: 4,
    title: "Space Exploration: The Next Frontier",
    content:
      "With recent advancements in space technology, humanity is closer than ever to exploring Mars and beyond. SpaceX and NASA are leading the way.",
    image: "https://example.com/images/space.jpg",
    category: ["Science", "Space"],
    likes: 150,
  },
  {
    id: 5,
    title: "Mastering JavaScript in 2025",
    content:
      "JavaScript continues to evolve, with new frameworks and best practices. Learning JavaScript in 2025 requires mastering ES6+ features and modern tools.",
    image: "https://example.com/images/javascript.jpg",
    category: ["Programming", "Web Development"],
    likes: 200,
  },
];
