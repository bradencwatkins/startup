import React from 'react';

import { Unauthenticated } from './unauthenticated';
import Authenticated from './authenticated';
import AuthState from './authState';

export function Login({ userName, authState, onAuthChange, onLogin, onLogout, onSignUp }) {
  return (
    <main className='container-fluid text-center'>
      <div>
        {authState !== AuthState.Unknown}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onAuthChange={onAuthChange} onLogout={onLogout} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={onLogin}
            onSignUp={onSignUp}
          />
        )}
      </div>
    </main>
  
  );
}