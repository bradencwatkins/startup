import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import AuthState from './authState';


export function Authenticated({ userName, onAuthChange, onLogout}) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: localStorage.getItem('token') }), 
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Logout failed');
        }
        localStorage.removeItem('userName');
        localStorage.removeItem('token');
        
        onLogout();
        onAuthChange('', AuthState.Unauthenticated);
      })
      .catch((error) => {
        console.error('Logout error:', error);
      });
  }

  return (
    <div>
    <h1>Welcome to MarryaBook</h1>
      <div className='playerName'>{userName}</div>
      <Button className="btn btn-primary login" variant='primary' onClick={() => navigate('/vote')}>
        Vote
      </Button>
      <Button className="btn btn-primary login" variant='secondary' onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default Authenticated;