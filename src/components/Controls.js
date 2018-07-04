import React, { PureComponent } from 'react';


import './Controls.css';

export class Controls extends PureComponent {
  constructor(props) {
    super(props);
    this.handleChange.bind(this)
  }
  
  handleChange(rows, cols) {
    if (rows >=0 && cols>= 0 && rows <= 60 && cols <= 70) this.props.boardCreate(rows, cols)
  }

  render() {
    const {rows, cols, started} = this.props;
    return (
      <div className="Controls">
        <div className="inputs">
          <label>Rows: <input type="text" value={rows} onChange={ (e) => this.handleChange(+e.target.value, cols)} disabled={started}/></label>
          <label>Cols: <input type="text" value={cols} onChange={ (e) => this.handleChange(rows, +e.target.value)} disabled={started}/></label>
          <button onClick={() => this.props.gameStart()} >Start</button>
        </div>
      </div>
    )
  }
}