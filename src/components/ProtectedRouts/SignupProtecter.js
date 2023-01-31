import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/axios';

function SignupProtecter({ children }) {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    instance.get('/isAuthorized').then((response) => {
      if (response.data.status) navigate('/');
      else setAuth(true);
    });
  }, []);
  if (auth) return children;
}

export default SignupProtecter;
