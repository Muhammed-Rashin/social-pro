/* eslint-disable react/self-closing-comp */
import React from 'react';
import { Modal } from '@mui/material';
import './addCaptions.css';
import { Box } from '@mui/system';

function AddCaptions({
  open,
  setOpen,
  image,
  setCaption,
  setLocation,
  createPost,
}) {
  const preview = URL.createObjectURL(image);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    bgcolor: 'white',
    boxShadow: 24,
    borderRadius:'20px',
    minWidth:'10px',
    maxWidth:'800px',
    maxHeight:'100%'
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <div className="add-">
          <header className="add-caption-header">
            <h4>Add Captions</h4>
            <button
              type="button"
              className="bg-transparent text-blue-700 font-semibold py-2 px-4 border border-blue-500 hover:border-transparent rounded post-button"
              onClick={createPost}
            >
              Post
            </button>
          </header>
          <div className="show-image-div">
            <img src={preview} alt="" />
          </div>
          <div className="add-captions-div">
            <textarea
              type="text"
              className="caption-input"
              placeholder="Add a caption ....."
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />

            <input
              type="text"
              className="location-input"
              placeholder="Add loacation"
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default AddCaptions;
