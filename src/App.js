import React, { Component } from 'react';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MessagesReducer from './store/reducers/MessagesReducer';
import TodosReducer from './store/reducers/TodosReducer';
import AuthReducer from './store/reducers/AuthReducer';
import RouterComponent from './components/RouterComponent';

import './main.css';

const rootReducer = combineReducers({
  messagesReducer: MessagesReducer,
  todosReducer: TodosReducer,
  authReducer: AuthReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(  rootReducer, 
                            composeEnhancer(applyMiddleware(thunk)));

class App extends Component {
  render() {
    return ( 
        <Provider store={store}>
          <div>
            <RouterComponent />
          </div>
        </Provider>
    )
  }
}

export default App; 

