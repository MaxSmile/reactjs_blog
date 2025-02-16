import { useParams, Link } from "react-router-dom";
import Markdown from "markdown-to-jsx";
import { LogoIcon } from "../assets/icons";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Page404 from "./Page404"; // Import 404 Page

const Post = ({ articles }) => {
  const { slug } = useParams();
  const isLoading = !articles; // articles is not ready yet (data not loaded)
  const index = articles.findIndex((a) => a.slug === slug);
  // Show 404 if articles exist but the slug is invalid
  if (!isLoading && index === -1) { // the data is loaded but the slug is invalid
    return <Page404 />;
  }

  const article = index !== -1 ? articles[index] : null; // Valid article or null
 

  // Find Previous & Next articles
  const prevArticle = index > 0 ? articles[index - 1] : null;
  const nextArticle = index < articles.length - 1 ? articles[index + 1] : null;

  return (
    <SkeletonTheme baseColor="#666666" highlightColor="#999999">
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
          <div className="article-content">
            {/* First flex column */}
            {isLoading ? <Skeleton className="article-icon" height={50} width={50} /> : <img
              className="article-icon"
              src={`https://www.gravatar.com/avatar/${article.gravatarHash}?d=identicon`}
              alt="Post Icon"
            />
            }
            {/* Second flex column */}
            <h2>{isLoading ? <Skeleton width={300} height={30} /> : article.title}</h2>
          </div>


          <main>
            {isLoading ? (
              <Skeleton count={12} />
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
    </SkeletonTheme>
  );
};

export default Post;
