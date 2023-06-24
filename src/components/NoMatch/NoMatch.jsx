import React from 'react';
import "./NoMatch.css";
import { useNavigate } from 'react-router-dom';

const NoMatch = () => {
    const navigate=useNavigate();
  return (
    <div className="no-match">
          <div className="not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text">Page Not Found</p>
      <p className="not-found-description">
        The page you are looking for does not exist.
      </p>
      <button className="not-found-button" onClick={()=>navigate("/")}>Go Back</button>
    </div>
    </div>
  )
}

export default NoMatch