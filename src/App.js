/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import ProtectedRouts from './components/ProtectedRouts/ProtectedRouts';
import VerifyEmail from './pages/VerifyEmail/VerifyEmail';
import SignupProtecter from './components/ProtectedRouts/SignupProtecter';
import Home from './pages/Home/Home';
import SignupAndLogin from './pages/SignupAndLogin/SignupAndLogin';
import Profile from './pages/Profile/ProfilePage';
import { UserContext } from './store/userContext';
import instance from './api/axios';
import ForgetPassword from './pages/ForgetPassword/ForgetPassword';

function App() {
  const [user, setUser] = useState({});
  useEffect(() => {
    instance.get('/getUser').then(({ data }) => {
      setUser(data);
    });
  }, []);
  return (
    <BrowserRouter>
      <UserContext.Provider value={user}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouts>
                <Home />
              </ProtectedRouts>
            }
          />

          <Route path="/verifyEmail" element={<VerifyEmail />} />

          <Route path="/verifyForgetPassword" element={<ForgetPassword />} />

          <Route
            path="/signup"
            element={
              <SignupProtecter>
                <SignupAndLogin />
              </SignupProtecter>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRouts>
                <Profile />
              </ProtectedRouts>
            }
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
