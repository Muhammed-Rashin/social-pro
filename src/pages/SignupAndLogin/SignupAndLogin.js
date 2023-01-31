/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import instance from '../../api/axios';
import Swal from 'sweetalert2';
import './SignupAndLogin.css';
import background from './assets/Backgorund.mp4';

function SignupAndLogin() {
  const [toggle, setToggle] = useState(false);
  const [signUpData, setSignUpData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [matchPassword, setMatchPassword] = useState(false);

  const navigate = useNavigate();

  const doSignup = async (e) => {
    e.preventDefault();

    if (!matchPassword) {
      const lowerCaseLetters = /[a-z]/g;
      const upperCaseLetters = /[A-Z]/g;
      const numbers = /[0-9]/g;
      const specialChars = /[`!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

      if (signUpData.username === '') toast.error('Username is required');
      else if (signUpData.email === '') toast.error('Email is required');
      else if (signUpData.password === '') toast.error('Password is required');
      else if (signUpData.username.length < 3)
        toast.error('Username at least 3 charecters');
      else if (signUpData.username.match(specialChars))
        toast.error('Cant use Special Charecters for Username');
      else if (
        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signUpData.email)
      )
        toast.error('Please Provide a Valid Email Address ');
      else if (signUpData.password.length < 8)
        toast.error('Password at least 8 charecters');
      else if (!signUpData.password.match(lowerCaseLetters))
        toast.error('Password must include a Lowercase letter');
      else if (!signUpData.password.match(upperCaseLetters))
        toast.error('Password must include a Uppercase letter');
      else if (!signUpData.password.match(numbers))
        toast.error('Password must include a Number');
      else if (!signUpData.password.match(specialChars))
        toast.error('Password must include a Special Charecter');
      else {
        Swal.fire({
          title: 'Confirmation Mai',
          text: 'We send a confirmation Mail to ' + signUpData.email,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Change Email',
          confirmButtonText: 'Yes, Send it!',
        }).then(async (result) => {
          if (result.isConfirmed) {
            const response = await instance.post('/signup', signUpData);
            if (response.data) {
              if (response.data === 'emailExist')
                toast.error('Email is Already Exist');
              else if (response.data === 'usernameExist')
                toast.error('Username is Already Taken');
              else if (response.data.status) {
                Swal.fire(
                  'Sented!',
                  'An Verification link is sented to ' + signUpData.email,
                  'success',
                );
              }
            } else toast.error('Sorry,Error While Sign Up');
          }
        });
      }
    }
  };

  const doLogin = async (e) => {
    e.preventDefault();

    if (loginData.email === '') toast.error('Email is required');
    else if (loginData.password === '') toast.error('Password is required');
    else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(loginData.email)
    )
      toast.error('Please Provide a Valid Email Address ');
    else {
      const { data } = await instance.post('/login', loginData);
      if (data === 'notConfirmed') {
        Swal.fire({
          title: 'Email Not Confirmed!',
          text: 'You want to resend email',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          cancelButtonText: 'No',
          confirmButtonText: 'Yes, Send it!',
        }).then((result) => {
          if (result.isConfirmed) {
            instance
              .post('/resendEmail', { email: loginData.email })
              .then(({ data }) => {
                if (data) {
                  Swal.fire(
                    'Resended!',
                    'Verification Email Sented to ' + loginData.email,
                    'success',
                  );
                } else toast.error('Something Went Wrong Cant Send Now!');
              });
          }
        });
      } else if (data.Accesstoken) {
        localStorage.setItem('Accesstoken', data.Accesstoken);
        localStorage.setItem('id', data.id);
        window.location = '/';
      } else toast.error('Incorrect Email Or Password');
    }
  };

  const forgetPassword = () => {
    Swal.fire({
      title: 'Enter Your Email Id',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      confirmButtonText: 'Send',
      showLoaderOnConfirm: true,
      preConfirm: (email) => {
        instance
          .post('/forgetPasswordConfirmation', { email })
          .then(({ data }) => {
            if (data === 'emailNotExist') {
              Swal.fire(
                'Email Not Registerd !',
                email + ' not found as registerd please signup',
                'error',
              );
            } else if (data) {
              Swal.fire(
                'Resended!',
                'Verification Email Sented to ' + email,
                'success',
              );
            } else {
              toast.error('Something Went Wrong');
            }
          });
      },
    });
  };

  return (
    <div className="outer">
      <video autoPlay muted loop id="myVideo">
        <source src={background} type="video/mp4" />
      </video>

      <div
        className={`parent ${toggle && 'right-panel-active'}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form className="sign-form" onSubmit={doSignup}>
            <h1 className="sign-h1">Create Account</h1>
            <div className="social-container">
              {/* <a href="/#" className="social sign-a">
                <i className="fab fa-google-plus-g" />
              </a> */}
            </div>
            <span className="sign-span">
              {/* or use your email for registration */}
            </span>
            <input
              className="sign-input"
              type="text"
              placeholder="User Name"
              value={signUpData.username}
              onChange={(e) => {
                setSignUpData({ ...signUpData, username: e.target.value });
              }}
            />
            <input
              className="sign-input"
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setSignUpData({ ...signUpData, email: e.target.value });
              }}
            />
            <input
              className="sign-input"
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setSignUpData({ ...signUpData, password: e.target.value });
                if (
                  e.target.value !== signUpData.confirmPassword &&
                  e.target.value !== '' &&
                  signUpData.confirmPassword !== ''
                )
                  setMatchPassword(true);
                else setMatchPassword(false);
              }}
            />
            {matchPassword ? (
              <p style={{ color: 'red', fontWeight: 'bold' }}>
                Passwords are not match
              </p>
            ) : null}
            <input
              className="sign-input"
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => {
                setSignUpData({
                  ...signUpData,
                  confirmPassword: e.target.value,
                });
                if (
                  signUpData.password !== e.target.value &&
                  signUpData.password !== '' &&
                  e.target.value !== ''
                )
                  setMatchPassword(true);
                else setMatchPassword(false);
              }}
            />
            <button className="sign-button" type="submit">
              Sign Up
            </button>
            <p className="already-account">
            Have an account? <span onClick={()=>setToggle(false)}>Log in</span>
            </p>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={doLogin} className="sign-form">
            <h1 className="sign-h1">Sign in</h1>
            <div className="social-container">
              {/* <a href="/#" className="social sign-a">
                <i className="fab fa-google-plus-g" />
              </a> */}
            </div>
            {/* <span className="sign-span">or use your account</span> */}
            <input
              className="sign-input"
              type="text"
              placeholder="Email"
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
            />
            <input
              className="sign-input"
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
            />
            <a className="sign-a" onClick={forgetPassword}>
              Forgot your password?
            </a>
            <button className="sign-button" type="submit">
              Sign In
            </button>

            <p className="new-account">
              Don't have an account?<span onClick={()=>setToggle(true)}> Sign up</span>
            </p>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1 className="sign-h1">Welcome Back!</h1>
              <p className="sign-p">
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost sign-button"
                id="signIn"
                type="button"
                onClick={() => setToggle(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="sign-h1">Hello, Friend!</h1>
              <p className="sign-p">
                Enter your personal details and start journey with us
              </p>
              <button
                className="ghost sign-button"
                id="signUp"
                type="button"
                onClick={() => setToggle(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default SignupAndLogin;
