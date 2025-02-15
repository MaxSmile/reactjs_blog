import { Link } from "react-router-dom";
import "../styles/Page404.css";

const Page404 = () => {
  return (
    <div className="page-404">
      <h1>404</h1>
      <p>Oops! The page you are looking for does not exist.</p>
      <Link to="/" className="home-button">Back to Home</Link>
    </div>
  );
};

export default Page404;
