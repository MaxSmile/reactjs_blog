import { useParams, Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { LogoIcon } from "../assets/icons";

const Post = ({ articles }) => {
  const { slug } = useParams();
  const index = articles.findIndex((a) => a.slug === slug);
  const article = articles[index];

  if (!article) return <h2>Article Not Found</h2>;

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

        <h2>{article.title}</h2>

        <main>
          <Markdown>{article.content}</Markdown>
        </main>

        <footer className="article-footer">
          <p className="date">Published: {new Date(article.timestamp).toLocaleDateString()}</p>

          <div className="navigation">
            <p className="left">
          {nextArticle && (
              <Link to={`/post/${nextArticle.slug}`} className="nav-link">
                ← {nextArticle.title}
              </Link>
            )}
            </p>
            
            <p className="right">
            {prevArticle && (
              <Link to={`/post/${prevArticle.slug}`} className="nav-link">
                 {prevArticle.title}  →
              </Link>
            )}
            </p>
            
          </div>
        </footer>
      </article>
    </div>
  );
};

export default Post;
