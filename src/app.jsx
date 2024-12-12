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
import Authenticated from './login/authenticated';


export function App() {

  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [authState, setAuthState] = useState(AuthState.Unauthenticated);
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(token);
    setAuthState(token ? AuthState.Authenticated : AuthState.Unauthenticated);
  }, []);
  
  useEffect(() => {
    if (token) {
      fetchRandomMovies();
    }
  }, [token]);
  
  useEffect(() => {
      if (options.length > 0) {
        fetchResults();
      }
  }, [options]);

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
      setResults(data);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

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
          'Authorization': `Bearer ${token}`, 
        },
        body: JSON.stringify({ id: movieId }),
      });
    
      const data = await res.json();
      if (res.ok) {
        fetchResults();
        fetchRandomMovies();
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }
  };

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      // Check if the response status is not OK (status codes 400-500 range)
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ msg: 'An error occurred during login' })); // Safe fallback
        setMessage(errorData.msg || 'Error logging in');
        return;
      }
  
      // Try to parse the response, catch if it's not JSON
      const data = await res.json().catch(() => null);
  
      if (data && data.id) {
        // If the login was successful, store data and update UI
        localStorage.setItem('userName', email);
        setUserName(email);
        setAuthState(AuthState.Authenticated);
        setMessage('Logged in successfully');
      } else {
        setMessage('Login failed, please check your credentials');
      }
    } catch (error) {
      // Catch any unexpected errors such as network issues or malformed responses
      console.error('Login error:', error);
      setMessage('An unexpected error occurred during login');
    }
  };

  const handleSignUp = async (email, password) => {
    const res = await fetch('/api/auth/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
  
    if (res.ok) {
      const data = await res.json();
      setUserName(email);
      setAuthState(AuthState.Authenticated);
      setMessage(data.msg || 'Sign up and login successful');
    } else {
      const data = await res.json();
      setMessage(data.msg || 'Error signing up');
    }
  };

  function handleAuthChange(newUserName, newAuthState){
    setUserName(newUserName);
    setAuthState(newAuthState);
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName('');
    setToken('');
    setAuthState(AuthState.Unauthenticated);
    handleAuthChange('', AuthState.Unauthenticated);
    setMessage('Logged out successfully');
  };

  //FOR DEBUGGING:
  useEffect(() => {
    console.log('Token:', token);  // Debugging token
    console.log('AuthState:', authState);  // Debugging authState
  }, [token, authState]);


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
              userName={userName}
                authState={authState}
                onAuthChange={handleAuthChange}
                onLogout={handleLogout}
                onLogin={handleLogin}
                onSignUp={handleSignUp}
                message={message}
              />
            }
            exact
          />
          <Route path='/vote' element={<Vote options={options} onVote={handleVote} authState={authState} />} />
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