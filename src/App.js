
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./components/Home";
import Post from "./components/Post";
import './styles/App.css';

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("/posts/articles.json")
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((err) => console.error("Error fetching posts:", err));
  }, [articles]);

  return (
      <Routes>
        <Route path="/" element={<Home articles={articles} />} />
        <Route path="/post/:slug" element={<Post articles={articles} />} />
      </Routes>
  );
};

export default App;
