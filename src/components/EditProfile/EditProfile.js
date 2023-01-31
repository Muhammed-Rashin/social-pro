import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './editprofile.css';
import instance from '../../api/axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 450,
  bgcolor: 'background.paper',
  boxShadow: 24,
  height: 580,
};

function EditProfile({
  open, setOpen, profileData, setProfileData,
}) {
  const [editData, setEditData] = useState({});

  const doEdit = () => {
    if (editData.username === '') toast.error('Username is required');
    else {
      instance.post('/editUserProfile', editData).then(({ data }) => {
        if (data === 'exist') toast.error('Username Already Exist');
        else {
          setProfileData(data);
          setOpen(false);
        }
      });
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
      >
        <Box sx={style}>
          <header className="edit-header">
            <h1>Edit Profile</h1>
          </header>
          <div className="edit-profile-container">
            <TextField
              sx={{ marginBottom: '30px' }}
              onChange={(e) => setEditData({ ...editData, username: e.target.value })}
              id="outlined-basic"
              label="Username"
              variant="outlined"
              defaultValue={profileData.username}
              required
            />
            <TextField
              sx={{ marginBottom: '30px' }}
              onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
              id="outlined-basic"
              label="First Name"
              variant="outlined"
              defaultValue={profileData.firstName}
            />
            <TextField
              sx={{ marginBottom: '30px' }}
              onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
              id="outlined-basic"
              label="Lasr Name"
              variant="outlined"
              defaultValue={profileData.lastName}
            />
            <TextField
              onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
              id="filled-multiline-static"
              label="Bio"
              multiline
              rows={4}
              defaultValue={profileData.bio}
            />
          </div>
          <Button
            onClick={doEdit}
            sx={{
              position: 'absolute',
              bottom: '15px',
              right: '15px',
              background: 'hsl(252, 75%, 60%)',
            }}
            variant="contained"
          >
            Edit
          </Button>
        </Box>
      </Modal>

      <ToastContainer position="top-center" />
    </div>
  );
}

export default EditProfile;
