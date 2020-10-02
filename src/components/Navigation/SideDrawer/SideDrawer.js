import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faInbox, faStar } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane, faCheckSquare } from '@fortawesome/free-regular-svg-icons';

// import './SideDrawer.css'; 
import '../../../main.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import actionTypes from '../../../store/actions/actionTypes';

class SideDrawer extends Component {

    render() {
        console.log("SideDrawer component");
        var drawerClasses = "DrawerCont";
        if(!this.props.showSideDrawer)
            drawerClasses = drawerClasses.concat(" HideSideDrawer");

        return (
            <div>
                <Backdrop   show={this.props.showSideDrawer} 
                            clicked={this.props.toggleSideDrawer}/>
                <div className={drawerClasses}>
                    <div className="DrawerHeader">
                        <span className="SDAppName">Rmail</span>
                        {/* CloseDrawer */}
                        <FontAwesomeIcon icon={faTimes} className="fa-lg"
                            onClick={this.props.toggleSideDrawer}/>
                    </div>



                    <a href="/u/inbox">
                        <div className="Folder">
                            <div><FontAwesomeIcon icon={faInbox}/></div>
                            <span>Inbox</span>
                        </div>                        
                    </a>
                    <a href="/u/sent">
                        <div className="Folder">
                            <div><FontAwesomeIcon icon={faPaperPlane}/></div> 
                            <span>Sent</span>
                        </div>
                    </a>
                    <a href="/u/starred">
                        <div className="Folder">
                            <div><FontAwesomeIcon icon={faStar}/></div>
                            <span>Starred</span>
                        </div>
                    </a>
                    <a href="/todos">
                        <div className="Folder">
                            <div><FontAwesomeIcon icon={faCheckSquare}/></div> 
                            <span>To Do</span>
                        </div>
                    </a>

{/* 

                    <a href="/" className="MyLink">
                        <div className="NavigationLink">
                            Inbox
                        </div>
                    </a>
                    <a href="/sent" className="MyLink">
                        <div className="NavigationLink">
                            Sent
                        </div>
                    </a> */}
                
                
                </div>
            </div>
        )
    }
}
       
const mapStateToProps = state => {
    return {
        showSideDrawer : state.messagesReducer.showSideDrawer
    }
}
const mapDispatchToProps = dispatch => {
    return {
        toggleSideDrawer: () => dispatch ( 
            {
                type : actionTypes.TOGGLE_SIDE_DRAWER
            } 
        )
    }
};
export default connect(mapStateToProps, mapDispatchToProps) (withRouter(SideDrawer));