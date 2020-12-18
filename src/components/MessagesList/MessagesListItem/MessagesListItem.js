import React, { Component } from 'react';
import {connect} from 'react-redux';
// import './MessagesListItem.css'; 
import '../../../main.css';
// import actionTypes from '../../../store/actions/actionTypes';
import { deleteMessageFromDB, getMessageFromDB, toggleStar } from '../../../store/actions/MessagesActions';
import { getSentTimeStr } from '../../../Utilities.js';
import { withRouter } from 'react-router-dom';
// import { trash-alt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';


class MessagesListItem extends Component 
{
    state = {
        shouldDisplayDelete : false
    }
    onDeleteItem = () => {
        this.props.removeMessage(this.props.id, this.props.viewed == false);
    }
    onViewItem = () => {
        this.props.history.push("/message/" + this.props.id)
    }
    onStarItem = () => {
        this.props.toggleStar(this.props.id, this.props.starred? false : true);
    }
    showDelete = (e) => {
        this.setState({shouldDisplayDelete: true});
    }
    hideDelete = (e) => {
        this.setState({shouldDisplayDelete: false});
    }


    render() {
        var emailContainerClassesMobile = "EmailContainerMobile";
        var emailContainerClassesWeb = "EmailContainerWeb";
        if( this.props.viewed ) {
            emailContainerClassesMobile = emailContainerClassesMobile.concat(" Viewed");
            emailContainerClassesWeb = emailContainerClassesWeb.concat(" Viewed");
        }

        return (
            <div>
                <div className={emailContainerClassesMobile}>
                    <div className="EmailMobileTopRow" onClick={this.onViewItem}>
                        <span className="To" onClick={this.onViewItem}>{this.props.to}</span>
                        <span className="SentTimeInList">{getSentTimeStr(this.props.sentTime)}</span>
                    </div>
                    <div className="EmailMobileBottomRow">
                        <span className="Subject" onClick={this.onViewItem}>{this.props.subject}</span>
                        <div>
                            <span onClick={this.onDeleteItem} className="DeleteIcon"><FontAwesomeIcon icon={faTrashAlt}/></span>
                            <span onClick={this.onStarItem} className={this.props.starred? "Star Starred" : "Star"}><FontAwesomeIcon icon={faStar}/></span>
                        </div>
                    </div>
                </div>

                <div className={emailContainerClassesWeb}
                    onMouseOver={this.showDelete}
                    onMouseOut={this.hideDelete}>
                    <span onClick={this.onStarItem} 
                        className={this.props.starred? "Star Starred" : "Star"}>
                        <FontAwesomeIcon icon={faStar}/>
                    </span>
                    <span className="To" onClick={this.onViewItem}>{this.props.to}</span>
                    <span className="Subject" onClick={this.onViewItem}>{this.props.subject}</span>
                    <div className="ActionsCont">
                        <span className="SentTimeInList">{getSentTimeStr(this.props.sentTime)}</span>
                        <span   className={this.state.shouldDisplayDelete? "" : "Invisible"} 
                                onClick={this.onDeleteItem}><FontAwesomeIcon icon={faTrashAlt}/></span>
                    </div>
                </div>

            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        // Standard call
        // removeMessage: (messageId) => dispatch({ 
        //                                     type: actionTypes.REMOVE_MESSAGE,
        //                                     messageId : messageId })
        // With create action
        removeMessage: (messageId, newMessage) => dispatch(deleteMessageFromDB(messageId, newMessage)),
        getMessage: (messageId) => dispatch(getMessageFromDB(messageId)),
        toggleStar: (messageId, isStarred) => dispatch(toggleStar(messageId, isStarred))
    }
}
export default connect(null, mapDispatchToProps)(withRouter(MessagesListItem));