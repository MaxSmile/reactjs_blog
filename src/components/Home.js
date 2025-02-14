import { Link } from "react-router-dom";
import { LogoIcon } from "../assets/icons";
import "../styles/Home.css";

const Home = ({ articles }) => {
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
        {articles.length === 0 ? (
          <p>Loading articles...</p>
        ) : (
          <div className="articles-grid">
            {articles.map((article, index) => (
              <Link to={`/post/${article.slug}`} key={index} className="article-tile">
                <div className="article-content">
                  <h2>{article.title}</h2>
                  <p className="article-date">
                    {new Date(article.timestamp).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </article>
  );
};

export default Home;
