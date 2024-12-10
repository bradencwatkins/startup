import React from 'react';
import './about.css';

export function About(props) {
  const [joke, setJoke] = React.useState('Loading...');

  React.useEffect(() => {
    fetch('https://icanhazdadjoke.com/', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJoke(data.joke);
      })
      .catch();
  }, []);

  return (
    <main className='container-fluid text-center'>
      <h2>About MarryaBook</h2>
        <div className="bordered-box">
          <p>Do you want to know what the best movie or book is?</p>
          <p>Are you tired of not knowing what to watch or what to read?</p>
          <p className="bold-text">MarryaBook is for you!!</p>    
          <p>This website allows you to voice your opinion on what the best media is on the market today!</p>
          <p>By logging in and going to the vote section, you can let others know what you think is the best movies to watch and books to read.</p>
          <p>Here is a random joke because why not: </p>
          <p>{joke}</p>
        </div>
        <div className="pic">
          <img src="logo.png" width="300" height="300" class="imgBorder"></img>
        </div>
    </main>
        
  );
}