import React from 'react';
import "./results.css";

export function Results() {
  return (
    <main className='container-fluid text-center'>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Movie</th>
            <th>Percentage Chosen</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Jaws</td>
            <td>45%</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Spongebob</td>
            <td>23%</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}