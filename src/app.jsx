import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Vote } from './vote/vote';
import { Results } from './results/results';
import { About } from './about/about';

const allOptions = [
  { id: 1, name: 'Jurassic Park', votes: 0 },
  { id: 2, name: 'Star Wars', votes: 0 },
  { id: 3, name: 'Harry Potter', votes: 0 },
  { id: 4, name: 'Jaws', votes: 0 },
];

export default function App() {

  const [options, setOptions] = useState(getRandomOptions());
  const [results, setResults] = useState(allOptions.map(option => ({ ...option })))
  
  function getRandomOptions() {
    const shuffled = [...allOptions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  }

  const handleVote = (id) => {
    const updatedResults = results.map(option =>
      option.id == id ? { ...option, votes: option.votes + 1 } : option
    );
    setResults(updatedResults);
    setOptions(getRandomOptions());
    
  };


    return (
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
              <li className='nav-item'>
                <NavLink className='nav-link' to='vote'>
                  Vote
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to='results'>
                  Results
                </NavLink>
              </li>
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
            <Route path='/' element={<Login />} exact />
            <Route path='/vote' element={<Vote options={options} onVote={handleVote}/>} />
            <Route path='/results' element={<Results options={options} />} />
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
    );
  }

  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }