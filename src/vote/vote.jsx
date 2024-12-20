import React, { useEffect } from 'react';
import './vote.css'
import AuthState from '../login/authState';

export function Vote({ options, onVote, authState }) {
  
  if (authState !== AuthState.Authenticated) {
    return <div>You must be logged in to vote.</div>;
  }


  return (
    <main>
      <h2 className="title">Which Is Better?</h2>
        <div className="container">
        {options.length === 0 ? (
          <p>Loading movie options...</p>
        ) : (
          options.map(option => (
            <div className="swipey" key={option.id}>
              <h2>{option.name}</h2>
              <button className="img-button" onClick={() => onVote(option.id)}>
                <img src={option.image_url}
                 width="300" height="400" className="imgBorder" alt={option.name} />
              </button>  
              <button type="button" className="btn btn-primary login butt">I Don't Know This One</button>
            </div>
            ))
          )}
        </div>     
    </main>
  );
}