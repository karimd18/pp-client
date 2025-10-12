import React from 'react';
import ErrorPage from '../components/ErrorPage';

const NotFound: React.FC = () => {
  return (
    <ErrorPage
      errorCode="404"
      errorMessage="Page Not Found"
      showBackButton={true}
    />
  );
};

export default NotFound;