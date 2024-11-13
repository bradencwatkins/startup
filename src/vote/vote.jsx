import React from 'react';
import './vote.css'

export function Vote() {
  return (
    <main>
      <h2 class="title">Which Is Better?</h2>
        <div class="container">
            <div class="swipey">
              <h2>Jurassic Park</h2>
              <button class="img-button">
                <img src="jurassic.jpg" width="300" height="400" class="imgBorder"></img>
              </button>  
              <button type="submit" class="btn btn-primary login butt">I Don't Know This One</button>
            </div>

            <div class="swipey">
              <h2>Star Wars</h2>
              <button class="img-button">
                <img src="star wars.webp" width="300" height="400" class="imgBorder"></img>
              </button> 
              <button type="submit" class="btn btn-primary login butt">I Don't Know This One</button>
            </div>
        </div>
    </main>
  );
}