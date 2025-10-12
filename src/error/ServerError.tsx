import React from 'react';
import ErrorPage from '../components/ErrorPage';

const ServerError: React.FC = () => {
  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <ErrorPage
      errorCode="500"
      errorMessage="Internal Server Error"
      showBackButton={true}
      onRetry={handleRetry}
    />
  );
};

export default ServerError;