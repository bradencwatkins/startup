import React, { useState } from 'react';
import './vote.css'

export function Vote({ options, onVote }) {
  


  return (
    <main>
      <h2 className="title">Which Is Better?</h2>
        <div className="container">
          {options.map(option => (
            <div className="swipey" key={option.id}>
              <h2>{option.name}</h2>
              <button className="img-button" onClick={() => onVote(option.id)}>
                <img src={`${option.name.toLowerCase().replace(' ', '-')}.jpg`}
                 width="300" height="400" className="imgBorder" alt={option.name} />
              </button>  
              <button type="button" className="btn btn-primary login butt">I Don't Know This One</button>
            </div>
          ))}
        </div>     
    </main>
  );
}