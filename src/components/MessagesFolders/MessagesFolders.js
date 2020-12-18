import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// import './MessagesFolders.css';
import '../../main.css';
import MessagesSingleFolder from './MessagesSingleFolder/MessagesSingleFolder';
import {  getMessagesFromDB, refreshMessages, fillMyInbox } from '../../store/actions/MessagesActions';  // getMessages
import { FOLDER_NAME_INBOX, FOLDER_NAME_SENT, FOLDER_NAME_STARRED, FOLDER_NAME_TODO } from '../../constants';

class MessagesFolders extends Component {


    componentDidMount() {
        console.log("componentDidMount");
    }

    componentDidUpdate() {
        console.log("MessagesFolders - componentDidUpdate");
    }
    onSelectFolder = (folderName) => {
        console.log("onSelectFolder(): " + folderName);
        // this.props.refreshMessages();

        switch(folderName) {
            case FOLDER_NAME_SENT: 
                this.props.history.push("/u/sent"); 
                break;
            case FOLDER_NAME_STARRED: 
                this.props.history.push("/u/starred"); 
                break;
            case FOLDER_NAME_TODO: 
                this.props.history.push("/todos"); 
                break;
            default: 
                this.props.history.push("/u/inbox");             
        }
        
    }
    onFillMyInbox = () => {
        console.log("onFillMyInbox");
        this.props.fillMyInbox();
    }

    render() {
        return (
            <div className="MessagesFolders">
                <MessagesSingleFolder   name={"Inbox (" + this.props.newMessagesCount + ")"} 
                                        type={FOLDER_NAME_INBOX}
                                        selected={this.props.selectedFolder === FOLDER_NAME_INBOX? true : false} 
                                        clicked={this.onSelectFolder}
                                        icon="faInbox"/> 
                <MessagesSingleFolder   name="Sent"
                                        type={FOLDER_NAME_SENT}
                                        selected={this.props.selectedFolder === FOLDER_NAME_SENT? true : false} 
                                        clicked={this.onSelectFolder}
                                        icon="faPaperPlane"/> 
                <MessagesSingleFolder   name="Starred"
                                        type={FOLDER_NAME_STARRED}
                                        selected={this.props.selectedFolder === FOLDER_NAME_STARRED? true : false} 
                                        clicked={this.onSelectFolder}
                                        icon="faStar"/> 
                <MessagesSingleFolder   name="To Do"
                                        type={FOLDER_NAME_TODO}
                                        selected={this.props.selectedFolder === FOLDER_NAME_TODO? true : false} 
                                        clicked={this.onSelectFolder}
                                        icon="faCheckSquare"/> 
                <button className="TransparentButton" onClick={this.onFillMyInbox}></button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedFolder: state.messagesReducer.selectedFolder,
        newMessagesCount : state.messagesReducer.newMessagesCount
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getMessages: (folderName) => dispatch(getMessagesFromDB(folderName)),
        refreshMessages: () => dispatch(refreshMessages()),
        fillMyInbox : () => dispatch(fillMyInbox()),
    };
};
export default connect(mapStateToProps,mapDispatchToProps) (withRouter(MessagesFolders));

