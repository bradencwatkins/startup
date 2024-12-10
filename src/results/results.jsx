import React from 'react';
import "./results.css";

export function Results({ options }) {
  const sortedOptions = [...options].sort((a, b) => b.votes - a.votes);
  console.log(options);
  
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
          {sortedOptions.map((option, index) => {
            const percentage = option.appearances > 0 ? (option.votes / option.appearances) * 100 : 0;
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