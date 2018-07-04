import { applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './ducks';

export const sagaMiddleware = createSagaMiddleware();

export default initialState => createStore(
  reducer, 
  initialState,
  compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ?
    window.devToolsExtension() : f => f
  )
)