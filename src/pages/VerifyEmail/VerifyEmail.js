import React, { useEffect } from 'react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import instance from '../../api/axios';
import './verifyemail.css'

function VerifyEmail() {
  const navigate = useNavigate()
  const [confirmed, setConfirmed] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const token = query.get('token');
    instance.post('/verifyEmail', { token }).then(({ data }) => {
      if (data) {
        setConfirmed('Confirm');
      } else {
        setConfirmed('Invalid');
      }
    });
  }, []);
  return (
    <div className='email-verification-div'>
      {confirmed === 'Confirm' ? (<div
      ><h1>Email Confirmed Successfully </h1>
          <button onClick={()=>navigate('/signup')} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full'>Go to login</button>
      </div>
      ) : null}
      {confirmed === 'Invalid' ? <h1>Email Confirmation Failed </h1> : null}
    </div>
  );
}

export default VerifyEmail;
