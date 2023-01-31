/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Home.css';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
// import Stories from '../../components/Stories/Stories';
import CreatPost from '../../components/CreatPost/CreatPost';
import Posts from '../../components/Posts/Posts';
import Massages from '../../components/Massages/Massages';
import FriendRequests from '../../components/FriendRequests/FriendRequests';

function Home() {
  const [posts, setPosts] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const [messageProfiles, setMessageProfiles] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

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
        <div className="container">
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
          <div className="middle">
            {/* <Stories /> */}
            <CreatPost setPosts={setPosts} />
            <Posts posts={posts} setPosts={setPosts} />
          </div>

          <div className="right">
            <Massages
              messageProfiles={messageProfiles}
              onlineUsers={onlineUsers}
              setCurrentUser={setCurrentUser}
              setOpenChat={setOpenChat}
            />
            {/* <FriendRequests /> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
