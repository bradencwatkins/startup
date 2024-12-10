import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  async function loginOrCreate(endpoint) {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify({ email: userName, password: password }),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      });
  
      if (response.ok) {
        const body = await response.json();
        localStorage.setItem('token', body.token);
        localStorage.setItem('userName', userName);
        props.onLogin(userName);
      } else {
        const errorBody = await response.text();
        setDisplayError(`⚠ Error: ${errorBody || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setDisplayError(`⚠ Error: ${error.message || 'Unknown error occurred'}`);
    }
  }

  async function loginUser() {
    props.onLogin(userName, password);
  }

  async function createUser() {
    props.onSignUp(userName, password);
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