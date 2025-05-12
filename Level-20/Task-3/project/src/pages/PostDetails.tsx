import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Post Details
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Loading post {id}...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;