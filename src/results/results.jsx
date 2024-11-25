import React from 'react';
import "./results.css";

export function Results({ options }) {
  const totalVotes = options.reduce((total, option) => total + option.votes, 0);
  
  return (
    <main className='container-fluid text-center'>
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Movie</th>
            <th>Votes</th>
            <th>Percentage Chosen</th>
          </tr>
        </thead>
        <tbody>
          {options.map((option, index) => {
            const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            return (
              <tr key={option.id}>
                <td>{index + 1}</td>
                <td>{option.name}</td>
                <td>{option.votes}</td>
                <td>{percentage.toFixed(2)}%</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}