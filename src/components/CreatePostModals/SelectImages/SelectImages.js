import React from 'react';
import { Modal } from '@mui/material';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import './selectImages.css';
import { Box } from '@mui/system';

function SelectImages({ open, setOpen, setImage }) {
  
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'white',
  boxShadow: 24,
  borderRadius:'20px',
  p: 4,
  minWidth:'10px'
};


  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus
    >
      <Box sx={style}>
      <div className="select-media">
        <header className="select-media-header">
          <h4>Create New Post</h4>
        </header>
        <div className="upload-icon-div">
          <CollectionsOutlinedIcon
            className="upload-icon"
            sx={{ fontSize: '100px' }}
          />
          <h2 className="">Drag Images Here</h2>
        </div>

        <div className="mt-8 text-center">
          <label htmlFor="file-upload" className="image-select-button">
            Select from computer
          </label>
          <input
            id="file-upload"
            accept="image/*"
            type="file"
            className="w-1/3 imageSelectionInput"
            onChange={(event) => setImage(event.target.files[0])}
          />
        </div>
      </div>
      </Box>
    </Modal>
  );
}

export default SelectImages;
