import React from 'react';
import './Massages.css';

import profile from '../../assets/dummyData/images/profile-9.jpg';

function Massages({
  messageProfiles,
  onlineUsers,
  setCurrentUser,
  setOpenChat,
}) {
  return (
    <div className="messages">
      <div className="heading">
        <h4>Messages</h4>
        <span>
          <i className="uil uil-edit" />
        </span>
      </div>

      <div className="search-bar">
        <span>
          <i className="uil uil-search" />
        </span>
        <input
          type="search"
          placeholder="Search Messages"
          id="message-search"
        />
      </div>

      {/* <div className="category">
        <h6 className="active">Primary</h6>
        <h6>General</h6>
        <h6 className="message-requests">Requests(7)</h6>
      </div> */}
      {messageProfiles.map((profile) => {
        return (
          <div
            onClick={() => {
              setCurrentUser(profile);
              setOpenChat(true);
            }}
            className="message"
            key={profile._id}
          >
            <div className="profile-pic">
              <img
                src={
                  profile.profileImg
                    ? profile.profileImg
                    : 'https://www.pngall.com/wp-content/uploads/5/Profile-PNG-File.png'
                }
                alt=""
              />

              {onlineUsers.find((element) => element.userId === profile._id) ? (
                <div className="active" />
              ) : null}
            </div>
            <div className="message-body">
              <h5>{profile.username}</h5>
              <p className="text-muted">Just woke up bruh..</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Massages;
