import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginUser() {
    if (!userName || !password) {
        setDisplayError('Please enter both a username and password.');
        return;
    }

    try{
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
    } catch (error) {
        setDisplayError('An error occurred during login.');
    }
  }

  async function createUser() {
    if (!userName || !password) {
        setDisplayError('Please enter both a username and password.');
        return;
    }
  
      
    try {
        localStorage.setItem('userName', userName);  // Save username in localStorage
        props.onLogin(userName);  // Call onLogin with the username
    } catch (error) {
        setDisplayError('An error occurred during user creation.');
    }
    }

    return (
    
      <main className="container-fluid text-center">
        <div>
  
          <h1 className="custom-text">Login to MarryaBook</h1>
          <form method="get" action="play.html">
            <div className="input-group mb-3">
              <span className="input-group-text">Email</span>
              <input className="form-control" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Password</span>
              <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            </div>
            <Button className="btn btn-primary login" variant='primary' onClick={() => loginUser()} disabled={!userName || !password}>
                Login
            </Button>
            <Button className="btn btn-primary login" variant='secondary' onClick={() => createUser()} disabled={!userName || !password}>
                Create
            </Button>
          </form>
        </div>

        {displayError && <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />}
      </main>
    
    );
  }