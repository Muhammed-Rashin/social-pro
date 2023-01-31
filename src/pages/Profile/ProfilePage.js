import React, { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useLocation } from 'react-router-dom';
import instance from '../../api/axios';
import EditProfile from '../../components/EditProfile/EditProfile';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import './Profile.css';
import FollowButton from '../../components/FollowButton/FollowButton';
import Followers from '../../components/FollowersAndFollowing/Followers';
import Dropdown from '../../components/Dropdown/Dropdown';

function ProfilePage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');

  const [open, setOpen] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [postData, setPostData] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);
  const [followOpen, setFollowOpen] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [messageProfiles, setMessageProfiles] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

  const getUserData = () => {
    instance.post('/getUserProfile', { id }).then(({ data }) => {
      console.log('data = ',data.user);
      setProfileData(data.user);
      setPostData(data.posts);
    });
  };

  useEffect(() => {
    getUserData();
  }, [id]);

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
  const updateProfileImage = async (e) => {
    setProfileLoading(true);
    const base64 = await convertBase64(e.target.files[0]);
    instance
      .post('/updateProfileImage', { profileImage: base64 })
      .then(({ data }) => {
        setProfileData(data);
        setProfileLoading(false);
      });
  };

  const elements = [
    {
      text: 'Home',
      icon: 'uil uil-home',
      path: '/',
    },
    {
      text: 'Explore',
      icon: 'uil uil-compass',
    },
    {
      text: 'Notification',
      icon: 'uil uil-bell',
      count: 9,
    },
    {
      text: 'Messages',
      icon: 'uil uil-envelope-alt',
    },
    {
      text: 'Analystic',
      icon: 'uil uil-chart-line',
    },
    {
      text: 'Theme',
      icon: 'uil uil-palette',
    },
    {
      text: 'Settings',
      icon: 'uil uil-setting',
    },
  ];
  return (
    <div>
      <Navbar />
      <main>
        <div className="profile-container">
          <Sidebar
            elements={elements}
            messageProfiles={messageProfiles}
            setMessageProfiles={setMessageProfiles}
            onlineUsers={onlineUsers}
            setOnlineUsers={setOnlineUsers}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setOpenChat={setOpenChat}
            openChat={openChat}
            create
            profile
          />
          <div>
            <div className="profile-container">
              <div className="banner-image">
                <div className="profile-image">
                  {profileLoading ? (
                    <CircularProgress
                      sx={{ position: 'absolute', top: '35%', zIndex: 9999 }}
                    />
                  ) : null}
                  <div className="circle">
                    {id ? null : (
                      <input
                        type="file"
                        onChange={updateProfileImage}
                        accept="image/*"
                      />
                    )}
                    <img
                      src={
                        profileData.profileImg
                          ? profileData.profileImg
                          : 'https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png'
                      }
                      alt=""
                    />
                    {id ? null : (
                      <ul className="social">
                        <li>
                          <i>Change Profile</i>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>

                <div className="details">
                  <div className="user-options">
                    <span>
                      <b>{profileData.username}</b>
                      <br />
                    </span>

                    {id ? (
                      profileData.followed ? (
                        <FollowButton  id={id} func={getUserData} />
                      ) : (
                        <FollowButton
                          type="follow"
                          id={id}
                          func={getUserData}
                        />
                      )
                    ) : (
                      <button
                        onClick={() => setOpen(true)}
                        className="text-white font-bold py-2 px-4 rounded"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                  <div className="user-details">
                    <span>{postData.length} posts</span>
                    {profileData.followers ? (
                      <span onClick={() => setFollowOpen('followers')}>
                        {profileData.followers.length} followers
                      </span>
                    ) : (
                      <span>0 followers</span>
                    )}
                    <span onClick={() => setFollowOpen('following')}>
                      13 following
                    </span>
                  </div>
                  <b>
                    {profileData.firstName || profileData.lastName
                      ? `${profileData.firstName} ${profileData.lastName}`
                      : null}
                  </b>
                  <p>{profileData.bio}</p>
                </div>
              </div>
            </div>

            <div className="gallery">
              {postData.map((post) => (
                <div className="postsImgaes" key={post._id}>
                  <div className="post-more-dropdown">
                    {id ? null : (
                      <Dropdown setPostData={setPostData} id={post._id} />
                    )}
                  </div>
                  <img src={post.imageUrl} alt="" />
                  <ul className="properties">
                    <li>
                      <i className="fa-light fa-heart" />
                      <span>{post.likes.length}</span>
                    </li>
                    {/* <li>
                        <i className="fa-light fa-comment" />
                        <span>&nbsp;&nbsp;56</span>
                      </li> */}
                  </ul>

                  <span className="caption">{post.caption}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <EditProfile
        open={open}
        setOpen={setOpen}
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <Followers
        followOpen={followOpen}
        setFollowOpen={setFollowOpen}
        id={id}
      />
    </div>
  );
}

export default ProfilePage;
