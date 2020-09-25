import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

// import './Toolbar.css';
import '../../../main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import composeImage from '../../../assets/images/write_fa.png'; 
import DrawerToggle from '../DrawerToggle/DrawerToggle';

import { searchMessagesInDB } from '../../../store/actions/MessagesActions';
import { signOut } from '../../../store/actions/AuthActions';

class Toolbar extends Component {
    style = {
        isDrawerOpen: false
    }

    onSearchClick = (e) => { 
        console.log("onSearchClick(): " + e.target.value);
        if(e.keyCode === 13) // pressed Enter 
        {
            this.props.searchMessages(e.target.value);
            this.props.history.push("/search/" + e.target.value);
        }
    }
    toggleDrawerVisibility = () => {
        this.setState({
            isDrawerOpen : !this.state.isDrawerOpen
        });
    } 
 
    render() {
        // let signOutClasses = "SignOut";
        // if(!this.props.authenticated)
        //     signOutClasses = signOutClasses.concat(" Hidden");

        return (
            <div className="Toolbar">
                <nav className="LeftCont">  
                    <DrawerToggle clicked={this.toggleDrawerVisibility}/>
                    <Link to="/u/inbox" exact style={{ textDecoration: 'none' }}> 
                        <FontAwesomeIcon icon={faEnvelope} className="Logo"/>
                    </Link>
                    <Link to="/u/inbox" exact style={{ textDecoration: 'none' }}> 
                        <span className="AppName">POST</span>
                    </Link>
                    <div className="SearchCont">
                        <FontAwesomeIcon icon={faSearch}/>
                        <input className="SearchBar" type="text" placeholder="Search your mail"
                            onKeyDown={this.onSearchClick}/>
                    </div>
                    <Link to="/new">
                        <img src={composeImage} className="ComposeImage" alt="Compose Message"/>
                    </Link>  
                    {/* <Link to="/new" style={{ textDecoration: 'none' }}>
                        <span className="Actions ComposeCTA">Compose</span>
                    </Link> */}
                </nav>            
                <div className="RightCont">
                    {/* <Link style={{ textDecoration: 'none' }}> */}
                        {/* <span className={signOutClasses} onClick={this.props.signOut}>Sign out</span> */}
                    {/* </Link> */}
                    {/* <FontAwesomeIcon icon={faUser} className="UserMenu fa-lg" title="user@rmail.com"/> */}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.authReducer.authenticated
    }
}
const mapDispatchToProps = dispatch => {
    return {
        searchMessages: (searchQuery) => dispatch(searchMessagesInDB(searchQuery)),
        signOut: () => dispatch(signOut())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Toolbar));