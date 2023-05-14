import React from 'react';
import { useLocation } from 'react-router-dom';

function UnknownPage() {
    const location = useLocation();
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>Actual road is : {location.pathname}</p>
    </div>
  );
}

export default UnknownPage;
