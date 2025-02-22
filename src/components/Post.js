import { useParams, Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { LogoIcon } from "../assets/icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Page404 from "./Page404";

const Post = ({ articles }) => {
  const { slug } = useParams();

  // 1) If articles is null/undefined, return your skeleton immediately
  if (!articles) {
    return (
      <SkeletonTheme baseColor="#666" highlightColor="#999">
        <div className="article-wrapper">
          {/* Just show skeleton placeholders here... */}
          <Skeleton className="article-icon" height={50} width={50} />
          <Skeleton width={300} height={30} />
          <Skeleton count={12} />
        </div>
      </SkeletonTheme>
    );
  }

  // 2) If we do have articles, find the matching article
  const index = articles.findIndex((a) => a.slug === slug);

  // 3) If the slug does not exist in our loaded articles, show 404
  if (index === -1) {
    return <Page404 />;
  }

  // 4) Otherwise, we have a valid post!
  const article = articles[index];
  const prevArticle = index > 0 ? articles[index - 1] : null;
  const nextArticle = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <SkeletonTheme baseColor="#666666" highlightColor="#999999">
      <div className="article-wrapper">
        <article>
          <header className="header">
            <div className="header__content">
              <div className="logo">
                <a href="/">
                  <LogoIcon />
                </a>
                <h1>Blog of Decentralized Thoughts</h1>
              </div>
            </div>
          </header>

          <div className="article-content">
            <img
              className="article-icon"
              src={`https://www.gravatar.com/avatar/${article.gravatarHash}?d=identicon`}
              alt="Post Icon"
            />
            <h2>{article.title}</h2>
          </div>

          <main>
            <Markdown>{article.content}</Markdown>
          </main>

          <p className="date">
            Published: {new Date(article.timestamp).toLocaleDateString()}
          </p>
        </article>

        <footer className="article-footer">
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
                {prevArticle.title} →
              </Link>
            )}
          </p>
        </footer>
      </div>
    </SkeletonTheme>
  );
};

export default Post;
