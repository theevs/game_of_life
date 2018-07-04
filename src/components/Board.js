import React from 'react';

import './Board.css';



export const Board = ({data, cellClick}) => (
  <div className="Board">
    {data.map( (row, x) => (
      <div className="row" key={`row${x}`}>
        {row.map((cell, y) => <div className="cell" key={`cell${y}`} onClick={() => cellClick(x, y)} className={ 'cell' + (cell ? ' live': '')}></div>)}
      </div>
    ))}
  </div>
)