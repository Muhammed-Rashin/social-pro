import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import instance from '../../api/axios';
import './forgetPassword.css';

function ForgetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState();
  const [confirmed, setConfirmed] = useState(false);

  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    instance.post('/verifyEmail', { forgetToken: token }).then(({ data }) => {
      if (data) {
        setConfirmed(true);
        setEmail(data);
      } else {
        setConfirmed(false);
      }
    });
  }, []);
  const resetPassword = (e) => {
    e.preventDefault();

    const lowerCaseLetters = /[a-z]/g;
    const upperCaseLetters = /[A-Z]/g;
    const numbers = /[0-9]/g;
    const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (password !== confirmPassword) toast.error('Password Not Match');
    else if (password === '') toast.error('Password is required');
    else if (password.length < 8) toast.error('Password at least 8 charecters');
    else if (!password.match(lowerCaseLetters))
      toast.error('Password must include a Lowercase letter');
    else if (!password.match(upperCaseLetters))
      toast.error('Password must include a Uppercase letter');
    else if (!password.match(numbers))
      toast.error('Password must include a Number');
    else if (!password.match(specialChars))
      toast.error('Password must include a Special Charecter');
    else {
      instance.post('/changePassword', { email, password }).then(({ data }) => {
        Swal.fire('Password Successfully Changed', 'success');
        navigate('/signup');
      });
    }
  };
  return (
    <div>
      {confirmed ? (
        <div className="forgetPassword-div">
          <h1>Please Reset Your Password</h1>
          <form onSubmit={resetPassword}>
            <div>
              <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Confirm Password"
                variant="outlined"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
            >
              Reset Password
            </button>
          </form>
        </div>
      ) : (
        <div className="forgetPassword-div">
          <h1>Sorry the link is not valid</h1>
        </div>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
}

export default ForgetPassword;
