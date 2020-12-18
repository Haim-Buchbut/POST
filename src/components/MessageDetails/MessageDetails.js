
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getMessageFromDB, deleteMessageFromDB, markMessageAsViewed, toggleStar } from '../../store/actions';
import { getSentTimeStrExt } from '../../Utilities.js';
import { withRouter } from 'react-router-dom';

// import './MessageDetails.css';
import '../../main.css';
import Spinner from '../UI/Spinner/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';

class MessageDetails extends Component {

    componentDidMount() {
        console.log("MessageDetails: componentDidMount()");
        const { match: { params } } = this.props;
        console.log(params.messageId);
        
        this.props.getMessage(params.messageId);
        // markMessageAsViewed(params.messageId);
    }
    onDeleteItem = () => {
        console.log("onDeleteItem - key=" + this.props.currentMessage.id);
        this.props.removeMessage(this.props.currentMessage.id);
        this.props.history.goBack();
    }
    onStarItem = () => {
        console.log("onStarItem");
        this.props.toggleStar(this.props.currentMessage.id, this.props.currentMessage.starred? false : true);
    }

    render() {
        if(this.props.getMessageInProgress)
            return <Spinner />;
        return (
            <div className="MessageCont">
                <div className="MessageHeaderMobile">
                    <div className="MessageHeaderTopRowMobile">
                        <h2 className="MessageTitle">{this.props.currentMessage.subject}</h2>
                        <div>
                            <span className={this.props.currentMessage.starred? "Star Starred" : "Star"} 
                                onClick={this.onStarItem}>
                                <FontAwesomeIcon icon={faStar}/>
                            </span>
                            <span 
                                // className="Action" 
                                onClick={this.onDeleteItem}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </span>
                        </div>
                    </div>
                    <div className="MessageHeaderBottomRowMobile">
                        <span className="MessageRecepient">
                            {this.props.currentMessage.messageType === 'outgoing' ? 'to ' : 'from '} 
                            {this.props.currentMessage.to}</span>
                        <span className="SentTimeInDetails">{getSentTimeStrExt(this.props.currentMessage.sentTime)}</span>
                    </div>
                </div>
                <div className="MessageHeaderDesktop">
                    <h2 className="MessageTitle">{this.props.currentMessage.subject}</h2>
                    <div className="BasicDetails">
                        <span className="MessageRecepient">
                            {this.props.currentMessage.messageType === 'outgoing' ? 'to ' : 'from '} 
                            {this.props.currentMessage.to}</span>
                        <div>
                            <span className="SentTimeInDetails">{getSentTimeStrExt(this.props.currentMessage.sentTime)}</span>
                            <span className={this.props.currentMessage.starred? "Star Starred" : "Star"} 
                                onClick={this.onStarItem}>
                                <FontAwesomeIcon icon={faStar}/>
                            </span>
                            <span 
                                // className="Action" 
                                onClick={this.onDeleteItem}>
                                <FontAwesomeIcon icon={faTrashAlt}/>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="MessageContent"
                    dangerouslySetInnerHTML={{__html: this.props.currentMessage.message}} ></div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        currentMessage : state.messagesReducer.currentMessage,
        getMessageInProgress : state.messagesReducer.getMessageInProgress 
    }
}
const mapDispatchToProp = dispatch => {
    return {
        getMessage: (messageId) => dispatch(getMessageFromDB(messageId)),
        removeMessage: (messageId) => dispatch(deleteMessageFromDB(messageId)),
        toggleStar: (messageId, isStarred) => dispatch(toggleStar(messageId, isStarred))
        // markMessageAsViewed: (messageId) => 
    }
}

export default connect(mapStateToProps, mapDispatchToProp)(withRouter(MessageDetails));
