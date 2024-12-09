import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Vote } from './vote/vote';
import { Results } from './results/results';
import { About } from './about/about';
import AuthState from './login/authState';
import { ErrorBoundary } from "react-error-boundary"


export function App() {

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const [options, setOptions] = useState(getRandomOptions());
  const [results, setResults] = useState(allOptions.map(option => ({ ...option })));
  const [authState, setAuthState] = useState(userName ? 'Authenticated' : 'Unauthenticated');
  const [token, setToken] = useState(localStorage.getItem('token'|| ''));
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      fetchRandomMovies();
    }
  }, [token]);

  const fetchRandomMovies = async () => {
    try {
      const res = await fetch('/api/vote');
      const data = await res.json();
      setOptions(data);
    } catch (error) {
      console.error('Error fetching random movies:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const res = await fetch('/api/results');
      const data = await res.json();
      setResults(data); // Set the results
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };
  
  function getRandomOptions() {
    const shuffled = [...allOptions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

  const handleVote = async (movieId) => {
    if (!token) {
      alert('You must be logged in to vote');
      return;
    }

    try {
      const res = await fetch('/api/vote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: movieId }),
      });

      const data = await res.json();
      if (res.ok) {
        setOptions(data.updatedMovies); // Update movies after voting
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const handleLogin = async (email, password) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setToken(data.token);
      localStorage.setItem('token', data.token);
      setUserName(email);
      setAuthState('Authenticated');
      setMessage('Logged in successfully');
    } else {
      const data = await res.json();
      setMessage(data.msg || 'Error logging in');
    }
  };

  const handleSignUp = async (email, password) => {
    const res = await fetch('/api/auth/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      setUserName('');
      setToken('');
      localStorage.removeItem('token');
      setAuthState('Unauthenticated');
      setMessage('Logged out successfully');
    }
  };


    return (
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <BrowserRouter>
      <div className='body text-light'>
        <header className='container-fluid'>
          <nav className='navbar fixed-top navbar-dark custom-navbar'>
            <div className='navbar-brand'>
              MarryaBook
            </div>
            <div className='ml-auto'>
            <menu className='navbar-nav'>
              <li className='nav-item'>
                <NavLink className='nav-link' to=''>
                  Home
                </NavLink>
              </li>
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='vote'>
                    Vote
                  </NavLink>
                </li>
              )}
              {authState === AuthState.Authenticated && (
                <li className='nav-item'>
                  <NavLink className='nav-link' to='results'>
                    Results
                  </NavLink>
                </li>
              )}
              <li className='nav-item'>
                <NavLink className='nav-link' to='about'>
                  About
                </NavLink>
              </li>
            </menu>
            </div>
          </nav>
        </header>
  
        <Routes>
          <Route
            path='/'
            element={
              <Login
                onLogin={handleLogin}
                authState={authState}
                onSignUp={handleSignUp}
                onAuthChange={(newUserName) => setUserName(newUserName)}
                message={message}
              />
            }
            exact
          />
          <Route path='/vote' element={<Vote options={options} onVote={handleVote}/>} />
          <Route path='/results' element={<Results options={results} />} />
          <Route path='/about' element={<About />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
  
        <footer className=''>
          <div className='padder'>
            <span>Braden Watkins-||- </span>
            <a href="https://github.com/bradencwatkins/startup" target="_blank"> GitHub</a>
          </div>
        </footer>
      </div>
      </BrowserRouter>
      </ErrorBoundary>
    );
  }

  function NotFound() {
    return <main className='container-fluid text-center'>404: Return to sender. Address unknown.</main>;
  }

  export default App;