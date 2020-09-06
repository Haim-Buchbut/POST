import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faCheckSquare, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { TODO_STATUS_ACTIVE, TODO_STATUS_DONE } from '../../../../constants';
// import './TodoListItem.css'; 
import '../../../../main.css';


class todosListItem extends Component {
    state = {
        text: this.props.text,
        shouldDisplayDelete: false,
        activeElement: false
    }

    handleTextChange = e => {
        this.setState({ text: e.target.value })
    }
    handleKeyDown = e => {
        if (e.which === 13) {
            this.handleSubmit(e);
            document.activeElement.blur();
        }
    }
    handleSubmit = e => {
        const text = this.state.text.trim();
        if(!text || text.length === 0)
            this.props.deleteHandler(this.props.id);
        else 
            this.props.updateHandler(this.props.id, this.state.text);
        
        this.toggleCharCountVisibility();
    }
    showDelete = (e) => {
        this.setState({shouldDisplayDelete: true});
    }
    hideDelete = (e) => {
        this.setState({shouldDisplayDelete: false});
    }
    toggleCharCountVisibility = (e) => {
        console.log("toggleCharCountVisibility");
        this.setState({activeElement: !this.state.activeElement});
    }



    render() {
        var todoTextClasses = "TodoText";
        if( this.props.status === TODO_STATUS_DONE ) 
            todoTextClasses = todoTextClasses.concat(" Done");

        return (
            <div className="TodoContainer"
                // onMouseOver={this.showDelete}
                // onMouseOut={this.hideDelete}
                >
                <span   className="TodoStatus" 
                        onClick={(e) => this.props.toggleStatusHandler(this.props.id, this.props.status)}>
                    <FontAwesomeIcon icon={(this.props.status === TODO_STATUS_ACTIVE)? faSquare : faCheckSquare}/>
                </span>

                <input  className={todoTextClasses} 
                        type="text" 
                        value={this.state.text}
                        maxLength="50" 
                        onChange={this.handleTextChange} 
                        onKeyDown={this.handleKeyDown}
                        onBlur={this.handleSubmit}
                        onFocus={this.toggleCharCountVisibility}/>
                
                <span   className={this.state.activeElement? "CharCounter" : "CharCounter Invisible"}>
                    {50 - this.state.text.length}
                </span>
                
                <span   id="deleteIcon"
                        // className={this.state.shouldDisplayDelete? "TodoDelete" : "TodoDelete Invisible"}
                        className="TodoDelete"
                        onClick={(e) => this.props.deleteHandler(this.props.id, e)}>
                    <FontAwesomeIcon icon={faTrashAlt}/>
                </span>
            </div>
        );
    }
}

todosListItem.propTypes = {
    id : PropTypes.string.isRequired,
    text : PropTypes.string.isRequired,
    status : PropTypes.string.isRequired
}

export default todosListItem; 