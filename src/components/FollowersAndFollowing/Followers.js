import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import './followers.css';
import FollowButton from '../FollowButton/FollowButton';
import { useEffect } from 'react';
import instance from '../../api/axios';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  height: 'auto',
  boxShadow: 24,
  p: 4,
};

function Followers({ followOpen, setFollowOpen, id }) {
  const handleClose = () => setFollowOpen(false);
  const [data, setData] = useState([]);

  function func() {
    if (followOpen === 'followers') {
      instance.post('/getFollowers', { id }).then(({ data }) => {
        if (data) {
          setData(data);
        } else setData([]);
      });
    } else if (followOpen === 'following') {
      instance.post('/getFollowing').then(({ data }) => {
        setData(data);
      });
    }
  }

  useEffect(() => {
    func();
  }, [followOpen, id]);

  return (
    <div>
      <Modal
        open={followOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        disableAutoFocus
      >
        <Box sx={style}>
          <div className="followers-main-div">
            <h1>Followers</h1>
            {data.map((result) => {
              return (
                <div
                  key={result._id}
                  className="results"
                  onClick={() => {
                    // setSearch(false);
                    // navigate(`/profile?id=${result._id}`);
                  }}
                >
                  <div className="search-details">
                    <div className="result-profile-image">
                      <img
                        src={
                          result.profileImg
                            ? result.profileImg
                            : 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'
                        }
                        alt=""
                      />
                    </div>
                    <div className="result-details">
                      <span>
                        <b>{result.username}</b>
                      </span>
                      {result.firstName || result.lastName ? (
                        <span>{`${result.firstName} ${result.lastName}`}</span>
                      ) : null}
                    </div>
                  </div>
                  <div className="follow-button">
                    {result.followed ? (
                      <FollowButton id={result._id} func={func} />
                    ) : (
                      <FollowButton type="follow" id={result._id} func={func} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default Followers;
