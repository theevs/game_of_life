import { createActions, handleActions } from 'redux-actions';
import { createSelector } from 'reselect';

export const BOARD_CREATE = 'BOARD_CREATE';
export const BOARD_CREATED_SUCCESSFUL = 'BOARD_CREATED_SUCCESSFUL';
export const GAME_START = 'GAME_START';
export const GAME_STARTED = 'GAME_STARTED';
export const GAME_STOPED = 'GAME_STOPPED';
export const CELL_CLICK = 'CELL_CLICK'

export const {boardCreate, cellClick, boardCreatedSuccessful, gameStart} = createActions(
  {
    BOARD_CREATE: (rows, cols) => ({rows, cols}),
    CELL_CLICK: (x, y) => ({x, y})
  },
  BOARD_CREATED_SUCCESSFUL,
  GAME_START,

)

export default handleActions({
  [boardCreatedSuccessful](state, {payload}) {
    return {...state, data: payload};
  },
  [GAME_STARTED](state) {
    return {...state, started: true}
  },
  [GAME_STOPED](state) {
    return {...state, started: false}
  },
  [cellClick](state, {payload: {x, y}}) {
    const data = state.data;
    data[x][y] = (state.data[x][y] + 1) % 2
    return {...state, data: [...data]}
  }
}, {started: false});

export const dataSelector = state => state.data;

export const boardSelector = createSelector(
  dataSelector,
  data => {
    const rows = data && data.length ? data.length : 0;
    const cols = rows && data[0] ? data[0].length : 0;
    return {data, rows, cols}
  }
)