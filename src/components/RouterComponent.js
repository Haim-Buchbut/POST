import React, { Component} from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import MailSlurp from 'mailslurp-client'
import { MAILSLURP_API_KEY } from '../constants'; 
import { createBrowserHistory } from 'history';
// import { connect } from 'react-redux';

import Auth from './Auth/Auth';
import NewMessage from './NewMessage/NewMessage';
import MessageLists from './MessagesList/MessagesList'
import MessageFolders from './MessagesFolders/MessagesFolders'
import MessageDetails from './MessageDetails/MessageDetails';
import TodosModule from './Todos/TodosModule/TodosModule';
import Toolbar from './Navigation/Toolbar/Toolbar';
import SideDrawer from './Navigation/SideDrawer/SideDrawer';

const mailSlurp = new MailSlurp({ apiKey: MAILSLURP_API_KEY });

class RouterComponent extends Component {
  render () 
  {
    return (
      <div>
          <Router history={createBrowserHistory()}>
            <Switch>
                <Route exact path="/auth" component={Auth} />
                <Route>{DefaultContainer()}</Route> 
            </Switch>
          </Router>
      </div>
    )
  }
}

const DefaultContainer = () => (
    <div>
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
        <Route exact path="/todos">
          <div style={{display:"flex", flexDirection:"row", height:"100%"}}>
            <MessageFolders />
            <TodosModule />
          </div>
        </Route>  
        <Route>
          <Redirect to="/u/inbox"/>
        </Route>      
      </Switch>
    </div>
)

// Removed support for back-end authentication validation 
// const mapStateToProps = state => {
//     return {
//         authenticated: state.authReducer.authenticated
//     }
// }
// export default connect(mapStateToProps,null) (RouterComponent); 

export default (RouterComponent); 
