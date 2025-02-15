import { useParams, Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { LogoIcon } from "../assets/icons";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Page404 from "./Page404"; // Import 404 Page

const Post = ({ articles }) => {
  const { slug } = useParams();
  const index = articles.findIndex((a) => a.slug === slug);
  const article = index !== -1 ? articles[index] : null; // Valid article or null
  const isLoading = articles.length === 0; // Ensure articles have loaded

  // Show 404 if articles exist but the slug is invalid
  if (!isLoading && !article) {
    return <Page404 />;
  }

  // Find Previous & Next articles
  const prevArticle = index > 0 ? articles[index - 1] : null;
  const nextArticle = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <div className="article-wrapper">
      <article>
        <header className="header">
          <div className="header__content">
            <div className="logo">
              <a href="/"><LogoIcon /></a>
              <h1>Blog of Decentralized Thoughts</h1>
            </div>
          </div>
        </header>

        <h2>{isLoading ? <Skeleton width={300} height={30} /> : article.title}</h2>

        <main>
          {isLoading ? (
            <Skeleton count={5} height={20} />
          ) : (
            <Markdown>{article.content}</Markdown>
          )}
        </main>

        <p className="date">
          {isLoading ? <Skeleton width={150} /> : `Published: ${new Date(article.timestamp).toLocaleDateString()}`}
        </p>
      </article>

      <footer className="article-footer">
        <p className="left">
          {isLoading ? (
            <Skeleton width={120} />
          ) : (
            nextArticle && (
              <Link to={`/post/${nextArticle.slug}`} className="nav-link">
                ← {nextArticle.title}
              </Link>
            )
          )}
        </p>

        <p className="right">
          {isLoading ? (
            <Skeleton width={120} />
          ) : (
            prevArticle && (
              <Link to={`/post/${prevArticle.slug}`} className="nav-link">
                {prevArticle.title} →
              </Link>
            )
          )}
        </p>
      </footer>
    </div>
  );
};

export default Post;
