import React, { Component } from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import MessagesReducer from './store/reducers/MessagesReducer';
import TodosReducer from './store/reducers/TodosReducer';

import './main.css';
import NewMessage from './components/NewMessage/NewMessage';
import MessageLists from './components/MessagesList/MessagesList'
import MessageFolders from './components/MessagesFolders/MessagesFolders'
import { MAILSLURP_API_KEY } from './constants'; 
import MessageDetails from './components/MessageDetails/MessageDetails';
import TodosModule from './components/Todos/TodosModule/TodosModule';
import Toolbar from './components/Navigation/Toolbar/Toolbar';
import { MailSlurp } from "mailslurp-client";
import SideDrawer from './components/Navigation/SideDrawer/SideDrawer';


const rootReducer = combineReducers({
  messagesReducer: MessagesReducer,
  todosReducer: TodosReducer
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(  rootReducer, 
                            composeEnhancer(applyMiddleware(thunk)));
const mailSlurp = new MailSlurp({ apiKey: MAILSLURP_API_KEY });

class App extends Component {
  render() {
    return ( 
      <Provider store={store}>
        <Router history={createBrowserHistory()}>
          <div className="App">
            <Toolbar />
            <SideDrawer />
            <Switch>
              <Route path="/new">
                <NewMessage mailSlurp={mailSlurp}/>
              </Route>

              <Route path="/message/:messageId">
                <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
                    <MessageFolders />
                    <MessageDetails />
                    {/* <Route path="/message/:messageId" component={MessageDetails}/> */}
                </div>
              </Route>

              <Route path="/search/:searchTerm">
                <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
                    <MessageFolders />
                    <MessageLists />
                </div>
              </Route>

              <Route path="/u/:folderName">
                <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
                    <MessageFolders />
                    <MessageLists />
                </div>
              </Route>

              {/* <Route exact path="/sent">
                <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
                    <MessageFolders />
                    <MessageLists selectedFolder={FOLDER_NAME_SENT}/>
                </div>
              </Route>
              
              <Route exact path="/starred">
                <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
                    <MessageFolders />
                    <MessageLists selectedFolder={FOLDER_NAME_STARRED}/>
                </div>
              </Route> */}
              
              <Route exact path="/todos">
                <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
                  <MessageFolders />
                  <TodosModule />
                </div>
              </Route>

              {/* <Route exact path={["/", "/inbox"]}>
                <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
                  <MessageFolders />
                  <MessageLists selectedFolder={FOLDER_NAME_INBOX}/>
                </div>
              </Route> */}

              <Route>
                <Redirect to="/u/inbox"/>
              </Route>
            </Switch>
          </div>
        </Router>
      </Provider>
    );  
  }
}

export default App;
