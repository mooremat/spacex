import React from 'react';

const LoadingSpinner = ({ loading }) => {
  return (
    <div>  
      {loading && <i className="fas fa-spinner fa-spin spinner"></i>}
    </div>
  )
}

export default LoadingSpinner;
