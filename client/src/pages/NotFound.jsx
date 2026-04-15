
import { Link } from 'react-router-dom';
import '../styles/notFound.css';

const NotFound = () => {
  return (
    <div className="error-page">
      <div className="error-content">
        <h1 className="error-code">404</h1>
        <h2 className="error-message">Enough Thinking.</h2>
        <p className="error-desc">
          You've wandered off the paper. This page doesn't exist.
          <br />Don't overthink it—just head back home.
        </p>
        <Link to="/" className="error-home-btn">
          Back to Stationery
        </Link>
      </div>
    </div>
  );
};

export default NotFound;