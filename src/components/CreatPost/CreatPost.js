import React, { useState } from 'react';
import './createPost.css';
import instance from '../../api/axios';
import AddCaptions from '../CreatePostModals/AddCaptions/AddCaptions';
import SelectImages from '../CreatePostModals/SelectImages/SelectImages';

function CreatPost({ setPosts }) {
  const [open, setOpen] = useState(false);

  const [image, setImage] = useState(null);

  const [caption, setCaption] = useState('');

  const [location, setLocation] = useState('');

  function convertBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const createPost = async () => {
    const base64 = await convertBase64(image);
    const postData = {
      caption,
      location,
      image: base64,
    };
    instance
      .post('/createPost', postData)
      .then(() => {
        instance.get('/getPosts').then(({ data }) => {
          setPosts(data.posts);
        });
        setOpen(false);
        setImage(null);
      })
      .catch(() => {
        alert('Sorry Some Error Gotacha.....');
      });
  };

  return (
    <div>
      <form className="create-post">
        <div className="profile-pic">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            alt=""
          />
        </div>
        <input
          type="text"
          placeholder="What's on your mind ?"
          id="create-post"
        />
        <input
          type="button"
          value="Post"
          onClick={() => {
            setOpen(true);
          }}
          className="btn btn-primary"
        />
      </form>
      {image ? (
        <AddCaptions
          open={open}
          setOpen={setOpen}
          image={image}
          setImage={setImage}
          setCaption={setCaption}
          setLocation={setLocation}
          createPost={createPost}
        />
      ) : (
        <SelectImages open={open} setOpen={setOpen} setImage={setImage} />
      )}
    </div>
  );
}

export default CreatPost;
