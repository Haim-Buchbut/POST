import React, { Component } from 'react';
import './MessagesActionsBar.css';
import { searchMessagesInDB } from '../../../store/actions/MessagesActions';
import { connect } from 'react-redux';

class MessagesActionsBar extends Component {
    onSearchClick = (e) => {
        console.log("onSearchClick(): " + e.target.value);
        if(e.keyCode === 13) // pressed Enter
            this.props.searchMessages(e.target.value);
    }
    render() {
        return (
            <div className="MessagesActionsBar">
                <input className="SearchBar" type="text" placeholder="Search"
                    onKeyDown={this.onSearchClick}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};
const mapDispatchToProps = dispatch => {
    return {
        searchMessages: (searchQuery) => dispatch(searchMessagesInDB(searchQuery))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )(MessagesActionsBar);
