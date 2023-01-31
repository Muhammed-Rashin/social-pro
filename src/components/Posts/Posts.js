/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react';
import './posts.css';

import instance from '../../api/axios';
import Comments from '../Comments/Comments';

function Posts({ posts, setPosts }) {
  const [commentOpen, setCommentOpen] = useState(false);

  useEffect(() => {
    instance.get('/getPosts').then(({ data }) => {
      setPosts(data.posts);
    });
  }, []);

  function doLike(id, isLiked) {
    if (isLiked) {
      instance.post('/dislikePost', { id }).then(() => {
        instance.get('/getPosts').then(({ data }) => {
          setPosts(data.posts);
        });
      });
    } else {
      instance.post('/likePost', { id }).then(() => {
        instance.get('/getPosts').then(({ data }) => {
          setPosts(data.posts);
        });
      });
    }
  }
  return (
    <div>
      <div className="feeds">
        {posts.map((element) => (
          <div className="feed" key={element._id}>
            <div className="head">
              <div className="user">
                <div className="profile-pic">
                  <img
                    src={
                      element.userId.profileImg
                        ? element.userId.profileImg
                        : 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'
                    }
                    alt=""
                  />
                </div>
                <div className="info">
                  <h3>{element.userId.username}</h3>
                  <small>{element.location}</small>
                  {/* <span className='edit'>
                <i className='uil uil-ellipsis-h' />
              </span> */}
                </div>
              </div>

              {/* <div className="">
            
              </div> */}
            </div>

            <div className="photo">
              <img src={element.imageUrl} alt="" />
            </div>

            <div className="action-button">
              <div className="interaction-button">
                <span
                  onClick={() => {
                    doLike(element._id, element.liked);
                    element.liked
                      ? (element.liked = false)
                      : (element.liked = true);
                  }}
                >
                  <i
                    className={`like-icon ${
                      element.liked
                        ? 'fa-heart fa-solid'
                        : 'fa-heart fa-regular'
                    }`}
                  />
                </span>
                <span onClick={() => setCommentOpen(element)}>
                  <i className="uil uil-comment" />
                </span>
                <span>
                  <i className="uil uil-share" />
                </span>
              </div>
              <div className="bookmark">
                <span>
                  <i className="uil uil-bookmark" />
                </span>
              </div>
            </div>

            <div className="liked-by">
              <span>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt=""
                />
              </span>
              <span>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt=""
                />
              </span>
              <span>
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                  alt=""
                />
              </span>
              ,
              <p>
                <b>{element.likes.length} Likes</b>
              </p>
            </div>

            <div className="caption">
              <p>
                <b>{element.userId.username}</b>
                {element.caption}
                <span className="hash-tag">#lifestyle</span>
              </p>
            </div>
            <div className="comments text-muted">View all 130 comments</div>
          </div>
        ))}
      </div>

      {commentOpen ? (
        <Comments commentOpen={commentOpen} setCommentOpen={setCommentOpen} />
      ) : null}
    </div>
  );
}

export default Posts;
