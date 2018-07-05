import { all, takeLatest, select, put, take, cancel, fork, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { BOARD_CREATE, boardCreatedSuccessful, GAME_START, GAME_STARTED, GAME_STOPED, dataSelector, gameSelector } from './ducks';

function* boardCreate({payload: {rows, cols}}) {
  const data = Array(rows).fill().map( () => Array(cols).fill(0));
  yield put(boardCreatedSuccessful(data));
}

function* toggleStart() {
  let task;
  while (true) {
    yield take(GAME_START);
    const started = yield select(gameSelector);
    if (!started) {
      task = yield fork(game);
      yield put({type: GAME_STARTED})
    } else {
      yield cancel(task);
      yield put({type: GAME_STOPED})
    }
  }  
}

function getCell(data, rows, cols, x, y) {
  
  if (x === -1) x = rows-1;
  if (x ===  rows) x = 0;
  if (y === -1) y = cols-1;
  if (y === cols) y = 0;
  return data[x][y];
}

function aliveNeighbours(data, x, y) {
  let res = 0;
  const rows = data.length;
  const cols = data[0].length;
  for(let dx = -1; dx <= 1; dx++) {
    for(let dy = -1; dy <= 1; dy++) {
      if ( !dx && !dy ) continue;
      res += getCell(data, rows, cols, x+dx, y+dy);
    }
  }
  return res;
}

function mapper(data, x, y) {

  let neighbours = aliveNeighbours(data, x, y);
  if (data[x][y]) {
    if (neighbours < 2 || neighbours > 3 ) return 0;
    return 1;
  } else {
    if (neighbours === 3) return 1;
    return 0;
  }
  
}

function nextData(data) {
  const newData = data.map( (row, x) => row.map( (cell, y) => mapper(data, x, y) ));
  return newData;
}

function* next() {
  const data = yield select(dataSelector);
  const next = yield call(nextData, data);
  return  next;
}

function* game() {  
  while(true) {
    const [data, _] = yield all([next(), delay(500)]);
    yield put(boardCreatedSuccessful(data));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(BOARD_CREATE, boardCreate),
    toggleStart(),

  ]);
}
