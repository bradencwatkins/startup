import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = React.useState(props.userName);
  const [password, setPassword] = React.useState('');
  const [displayError, setDisplayError] = React.useState(null);

  // Directly call the loginOrCreate function
  async function loginUser() {
    loginOrCreate('/api/auth/login');
  }

  async function createUser() {
    loginOrCreate('/api/auth/create');
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: JSON.stringify({ email: userName, password: password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      localStorage.setItem('userName', userName); // Store the email in localStorage
      props.onLogin(userName); // Notify parent component that user is logged in
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
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
            <Button className="btn btn-primary login" variant='primary'  onClick={() => loginUser()} disabled={!userName || !password}>
                Login
            </Button>
            <Button className="btn btn-primary login" variant='secondary'  onClick={() => createUser()} disabled={!userName || !password}>
                Create
            </Button>
          </form>
        </div>

        {displayError && <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />}
      </main>
    
    );
  }