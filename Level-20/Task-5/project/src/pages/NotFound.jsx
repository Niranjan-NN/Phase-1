import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>Oops! The page you're looking for doesn't exist or has been moved.</p>
          <div className="not-found-image">
            <img 
              src="https://images.pexels.com/photos/6248774/pexels-photo-6248774.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260" 
              alt="Empty plate" 
            />
          </div>
          <p>It seems this recipe isn't in our collection!</p>
          <Link to="/" className="button button-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;