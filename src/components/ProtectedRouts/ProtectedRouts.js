/* eslint-disable no-else-return */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable consistent-return */
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios';

function ProtectedRouts({ children }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    instance.get('/isAuthorized').then((response) => {
      if (response.data.status) setAuth(true);
      else navigate('/signup');
    });
  }, []);

  if (auth) return children;
}

export default ProtectedRouts;
