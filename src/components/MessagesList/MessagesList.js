import React, { Component } from 'react';
import { connect } from 'react-redux';

import MessagesListItem from './MessagesListItem/MessagesListItem';
import './MessagesList.css';
import '../../App.css';
import '../../App.js';
import { FOLDER_NAME_INBOX, FOLDER_NAME_SENT, FOLDER_NAME_STARRED } from '../../constants';
import Spinner from '../UI/Spinner/Spinner';
import {  getMessagesFromDB, searchMessagesInDB } from '../../store/actions/MessagesActions';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faFolderOpen } from '@fortawesome/free-solid-svg-icons';

class MessagesList extends Component {
    
    getTitle = () => {
        switch (this.props.selectedFolder) {
            case FOLDER_NAME_INBOX:
                return "Inbox";
            case FOLDER_NAME_SENT:
                return "Sent";
            case FOLDER_NAME_STARRED:
                return "Starred";
            default:
                return "Search results";
        }

    }

    fetchMessages() {
        console.log("fetchMessages()");
        const { match: { params } } = this.props; 
        console.log(params);     
        if(params.folderName !== undefined) {
            console.log("folder name: " + params.folderName);
            this.props.getMessages(params.folderName);
        } else {
            console.log("search term: " + params.searchTerm);
            this.props.searchMessages(params.searchTerm);      
        }
    }
    componentDidMount() {
        console.log("MessageLists - componentDidMount()");
        this.fetchMessages();
    }
    componentDidUpdate(prevProps) {
        console.log("MessageLists - componentDidUpdate()"); 
        console.log(this.props);

        if(!this.props.getMessagesInProgress)
        {
            if( (this.props.location !== prevProps.location) ||
                (!this.props.messagesUptodate) ) 
                this.fetchMessages();
        }
    }


    render() {
        if(this.props.deleteInProgress || this.props.addInProgress || this.props.getMessagesInProgress)
            return <Spinner />;

        // if(this.props !== undefined) {
            if(this.props.messages.length === 0)
                return (
                    <div className="EmptyResults">
                        <FontAwesomeIcon className="EmptyResultsIcon" size="3x" icon={(this.props.selectedFolder === null)? faSearch : faFolderOpen} />
                        <span className="EmptyResultsText">{(this.props.selectedFolder === null)? "No emails matched your search" : "Nothing in the '" + this.getTitle() + "' folder"}</span>
                    </div>
                );
        // }

        var messagesList = null;
        if(this.props.errorMsg)
            messagesList = <p>{this.props.errorMsg}</p>
        else if(this.props.messages) {
            messagesList = this.props.messages.map( currMessage => (
                <MessagesListItem
                    key={currMessage.id}
                    id={currMessage.id}
                    to={currMessage.to}
                    subject={currMessage.subject}
                    message={currMessage.message}
                    sentTime={currMessage.sentTime}
                    viewed={currMessage.viewed}
                    starred={currMessage.starred}
                />
            ));    
        }

        return (  
            <div className="MessageList">
                <div className="ListTitle">{this.getTitle()}</div>
                <ul>
                    { messagesList }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        messages : state.messagesReducer.messages,
        messagesUptodate : state.messagesReducer.messagesUptodate,
        deleteInProgress : state.messagesReducer.deleteInProgress,
        addInProgress : state.messagesReducer.addInProgress,
        getMessagesInProgress : state.messagesReducer.getMessagesInProgress,
        errorMsg : state.messagesReducer.errorMsg,
        selectedFolder : state.messagesReducer.selectedFolder
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getMessages: (selectedFolder) => dispatch(getMessagesFromDB(selectedFolder)),
        searchMessages: (searchQuery) => dispatch(searchMessagesInDB(searchQuery))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(MessagesList));