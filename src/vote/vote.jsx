import React from 'react';

export function Vote() {
  return (
    <main>
            <div class="swipey">
                <h2>Ellen Johnson</h2>
                <img src="ellen.jpg" width="300" height="400"></img>
                <p>Age: 21  Height: 5'2"</p>
                <button type="button" class="btn btn-success">
                    <i class="bi bi-check"></i> 
                </button>
                <button type="button" class="btn btn-danger">
                    <i class="bi bi-x"></i>
                </button>
            </div>
        </main>
  );
}