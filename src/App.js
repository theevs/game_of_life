import React, { Component } from 'react';
import { Provider } from 'react-redux';

import createStore,  { sagaMiddleware } from './store';
import rootSaga from './saga';


import { Board } from './components';
import Main from './containers/Main';

const store = createStore({rows: 10, cols: 20});

class App extends Component {
  render() {
    return (
      <Provider store={store} >
         <Main></Main>
      </Provider>
    );
  }
}

sagaMiddleware.run(rootSaga);

export default App;
