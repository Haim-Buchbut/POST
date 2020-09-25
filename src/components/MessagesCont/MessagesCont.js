import React, { Component } from 'react';

import MessagesFolders from '../MessagesFolders/MessagesFolders';
import MessagesList from '../MessagesList/MessagesList';


class MessagesCont extends Component {
    render() {
        return (
            <div className="MessagesCont">
                <MessagesList selected="sent"/>
                <MessagesFolders selected="sent"/>
            </div>
        )
    }
}


export default MessagesCont; 
