import React from 'react';
import './about.css';

export function About() {
  return (
    <main className='container-fluid text-center'>
      <h2>About MarryaBook</h2>
        <div class="bordered-box">
          <p>Do you want to know what the best movie or book is?</p>
          <p>Are you tired of not knowing what to watch or what to read?</p>
          <p class="bold-text">MarryaBook is for you!!</p>    
          <p>This website allows you to voice your opinion on what the best media is on the market today!</p>
          <p>By logging in and going to the vote section, you can let others know what you think is the best movies to watch and books to read.</p>
        </div>
        <div class="pic">
          <img src="logo.png" width="300" height="300" class="imgBorder"></img>
        </div>
    </main>
        
  );
}