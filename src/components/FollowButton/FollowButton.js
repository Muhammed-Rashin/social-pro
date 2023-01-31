import React from 'react';
import instance from '../../api/axios';
import './followButton.css';

function FollowButton({ type, id, func }) {
  const doFollow = (e) => {
    e.stopPropagation();
    instance.post('/doFollow', { id }).then(() => {
      if (func) func();
    });
  };
  const doUnfollow = (e) => {
    e.stopPropagation();
    instance.post('/doUnfollow', { id }).then(() => {
      if (func) func();
    });
  };

  return (
    <div>
      {type === 'follow' ? (
        <button
          onClick={(e) => doFollow(e)}
          className="text-white font-bold py-2 px-4 rounded"
          style={{ backgroundColor: '#6b4ce6' }}
        >
          Follow
        </button>
      ) : (
        <button
          onClick={(e) => doUnfollow(e)}
          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          style={{ backgroundColor: 'transparent', border: '1px solid #6b4ce6' }}
        >
          Unfollow
        </button>
      )}
    </div>
  );
}

export default FollowButton;
