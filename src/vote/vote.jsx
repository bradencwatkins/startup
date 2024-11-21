import React, { useState } from 'react';
import './vote.css'

export function Vote({ options, onVote }) {
  


  return (
    <main>
      <h2 class="title">Which Is Better?</h2>
        <div class="container">
          {options.map(option => (
            <div class="swipey" key={option.id}>
              <h2>{option.name}</h2>
              <button class="img-button" onClick={() => handleVote(option.id)}>
                <img src={`${option.name.toLowerCase().replace(' ', '-')}`} width="300" height="400" class="imgBorder" alt={option.name} />
              </button>  
              <button type="submit" class="btn btn-primary login butt">I Don't Know This One</button>
            </div>
          ))}
        </div>     
    </main>
  );
}