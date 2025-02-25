import { Link } from "react-router-dom";
import { LogoIcon } from "../assets/icons";
import "../styles/Home.css";
import { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Skeleton Loader Component
const SkeletonLoader = () => (
  <SkeletonTheme baseColor="#666666" highlightColor="#999999">
    <title>Decentralized Thoughts – A Blog on Web3, AI & Future Tech</title>
    <meta name="description"
      content="Decentralized Thoughts is a blog exploring Web3, AI, blockchain, and the future of decentralized technology." />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="Decentralized Thoughts – A Blog on Web3, AI & Future Tech" />
    <meta property="og:description" content="Explore Web3, AI, blockchain, and the decentralized future in our blog." />
    <meta property="og:image" content="/android-chrome-512x512.png" />

    {Array.from({ length: 10 }).map((_, index) => (
      <Link to="/" key={index} className="article-tile">
        <div key={index} className="article-content">
          <Skeleton className="article-icon" height={50} width={50} />
          <div className="article-text">
            <Skeleton count={2} />
            <Skeleton width="50%" height={15} />
          </div>
        </div>
      </Link>
    ))}
  </SkeletonTheme>
);



const Home = ({ articles }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (articles.length > 0) {
      setLoading(false);
    }
  }, [articles]);

  return (
    <article className="article-wrapper">
      <header className="header">
        <div className="header__content">
          <div className="logo">
            <a href="/"><LogoIcon /></a>
            <h1>Blog of Decentralized Thoughts</h1>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="articles-grid">
          {loading ? (
            <SkeletonLoader />
          ) : (
            articles.map((article, index) => (
              <Link to={`/post/${article.slug}`} key={index} className="article-tile">
                <div className="article-content">
                  {/* First flex column */}
                  <img
                    className="article-icon"
                    src={`https://www.gravatar.com/avatar/${article.gravatarHash}?d=identicon`}
                    alt="Post Icon"
                  />
                  {/* Second flex column */}
                  <div className="article-text">
                    <h2>{article.title}</h2>
                    <p className="article-date">
                      {new Date(article.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>
    </article>
  );
};

export default Home;
