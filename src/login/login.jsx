import React from 'react';

export function Login() {
  return (
  
    <main className="container-fluid text-center">
      <div>
        <h1 className="custom-text">Login to MarryaBook</h1>
        <form method="get" action="play.html">
          <div class="input-group mb-3">
            <span class="input-group-text">Email</span>
            <input class="form-control" type="text" placeholder="your@email.com" />
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text">Password</span>
            <input class="form-control" type="password" placeholder="password" />
          </div>
          <button type="submit" class="btn btn-primary login">Login</button>
          <button type="submit" class="btn btn-primary login">Create</button>
        </form>
      </div>
    </main>
  
  );
}