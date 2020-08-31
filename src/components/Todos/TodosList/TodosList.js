import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TodosListItem from './TodoListItem/TodoListItem';
import Spinner from '../../UI/Spinner/Spinner';
import { connect } from 'react-redux';

import './TodosList.css';

class TodosList extends Component {
    render() {
        if(this.props.getTodosInProgress)
            return <Spinner />;
        if(this.props.error)
            return <p>{this.props.error}</p>;

        let todosList = '';
        if(this.props.todos)
            todosList = this.props.todos.map( currentTodo => (
                <TodosListItem 
                    key={currentTodo.id}
                    id={currentTodo.id}
                    text={currentTodo.text} 
                    status={currentTodo.status}
                    deleteHandler={this.props.deleteHandler}
                    updateHandler={this.props.updateHandler}
                    toggleStatusHandler={this.props.toggleStatusHandler} />
        ));

        return ( 
            <ul className="TodosList">
                {todosList}
            </ul>
        );
    }
}

TodosList.propTypes = {
    removeHandler : PropTypes.func,
    completeHandler : PropTypes.func,
    updateHandler : PropTypes.func
} 

const mapStateToProps = state => {
    return {
        getTodosInProgress : state.todosReducer.getTodosInProgress,
        error: state.todosReducer.error
    };
};

export default connect(mapStateToProps, null) (TodosList);