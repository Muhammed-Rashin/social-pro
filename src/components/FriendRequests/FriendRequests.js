import React from 'react';
import './friendRequests.css';
import profile from '../../assets/dummyData/images/profile-13.jpg';

function FriendRequests() {
  return (
    <div>
      <div className="friend-requests">
        <h4>Requests</h4>
        <div className="request">
          <div className="info">
            <div className="profile-pic">
              <img src={profile} alt="" />
            </div>
            <div>
              <h5>Wilson Fisk</h5>
              <p className="text-muted">8 mutual friends</p>
            </div>
          </div>
          <div className="action">
            <button className="btn btn-primary" type="button">
              Accept
            </button>
            <button className="btn" type="button">
              Decline
            </button>
          </div>
        </div>

        <div className="request">
          <div className="info">
            <div className="profile-pic">
              <img src={profile} alt="" />
            </div>
            <div>
              <h5>Wilson Fisk</h5>
              <p className="text-muted">8 mutual friends</p>
            </div>
          </div>
          <div className="action">
            <button className="btn btn-primary" type="button">
              Accept
            </button>
            <button className="btn" type="button">
              Decline
            </button>
          </div>
        </div>

        <div className="request">
          <div className="info">
            <div className="profile-pic">
              <img src={profile} alt="" />
            </div>
            <div>
              <h5>Wilson Fisk</h5>
              <p className="text-muted">8 mutual friends</p>
            </div>
          </div>
          <div className="action">
            <button className="btn btn-primary" type="button">
              Accept
            </button>
            <button className="btn" type="button">
              Decline
            </button>
          </div>
        </div>

        <div className="request">
          <div className="info">
            <div className="profile-pic">
              <img src={profile} alt="" />
            </div>
            <div>
              <h5>Wilson Fisk</h5>
              <p className="text-muted">8 mutual friends</p>
            </div>
          </div>
          <div className="action">
            <button className="btn btn-primary" type="button">
              Accept
            </button>
            <button className="btn" type="button">
              Decline
            </button>
          </div>
        </div>

        <div className="request">
          <div className="info">
            <div className="profile-pic">
              <img src={profile} alt="" />
            </div>
            <div>
              <h5>Wilson Fisk</h5>
              <p className="text-muted">8 mutual friends</p>
            </div>
          </div>
          <div className="action">
            <button className="btn btn-primary" type="button">
              Accept
            </button>
            <button className="btn" type="button">
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FriendRequests;
