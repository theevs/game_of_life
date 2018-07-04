import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { boardSelector, boardCreate as boardCreateAction, gameStart as gameStartAction, cellClick as cellClickAction } from '../ducks';

import './Main.css';

import { Board, Controls } from '../components';

class Main extends PureComponent {

  onChange(e) {
    const {boardCreate} = this.props;
    boardCreate()
  }
  componentDidMount() {
    this.props.boardCreate(5, 5);
  }
  render() {
    const {data, rows, cols} = this.props;
    return (
      <div className="Main">
        <Controls {...this.props} />
        {!!rows && !! !!cols && <Board data={data} cellClick={this.props.cellClick}/>}
      </div>
    )
  }
}

export default connect(
  boardSelector,
  {
    boardCreate: boardCreateAction,
    gameStart: gameStartAction,
    cellClick: cellClickAction
  }
) (Main);