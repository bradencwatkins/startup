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
        // Successful login or user creation
        const body = await response.json();
        localStorage.setItem('userName', userName);
        props.onLogin(userName);  // Assuming onLogin is passed as a prop
      } else {
        // Handle errors (handle error messages)
        const body = await response.json();
        setDisplayError(`⚠ Error: ${body.msg || 'An error occurred'}`);
      }
    } catch (error) {
      setDisplayError(`⚠ Error: ${error.message || 'Unknown error occurred'}`);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    const endpoint = event.target.name === 'login' ? '/api/auth/login' : '/api/auth/create';
    loginOrCreate(endpoint); // Call the appropriate API endpoint
  };

  // Directly call the loginOrCreate function
  function handleLogin() {
    loginOrCreate('/api/auth/login');
  }

  function handleSignUp() {
    loginOrCreate('/api/auth/create');
  }

    return (
    
      <main className="container-fluid text-center">
        <div>
          <h1 className="custom-text">Login to MarryaBook</h1>
          <form method="get" action="play.html" onSubmit={handleSubmit}>
            <div className="input-group mb-3">
              <span className="input-group-text">Email</span>
              <input className="form-control" type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="your@email.com" />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text">Password</span>
              <input className="form-control" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
            </div>
            <Button className="btn btn-primary login" variant='primary' type="submit" name="login" disabled={!userName || !password}>
                Login
            </Button>
            <Button className="btn btn-primary login" variant='secondary' type="submit" name="create" disabled={!userName || !password}>
                Create
            </Button>
          </form>
        </div>

        {displayError && <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />}
      </main>
    
    );
  }