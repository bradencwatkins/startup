import React from 'react';

import { Unauthenticated } from './unauthenticated';
import Authenticated from './authenticated';
import AuthState from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container-fluid text-center'>
      <div>
        {authState !== AuthState.Unknown && <div>Loading...</div>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange('')} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => onAuthChange(loginUserName)}
          />
        )}
      </div>
    </main>
  
  );
}