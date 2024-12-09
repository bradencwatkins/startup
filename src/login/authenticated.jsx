import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';


export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem('userName');
    localStorage.removeItem('token');
    props.onLogout();
  }

  return (
    <div>
    <h1>Welcome to MarryaBook</h1>
      <div className='playerName'>{props.userName}</div>
      <Button className="btn btn-primary login" variant='primary' onClick={() => navigate('/vote')}>
        Vote
      </Button>
      <Button className="btn btn-primary login" variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}

export default Authenticated;