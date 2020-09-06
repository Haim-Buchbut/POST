import React, { Component } from 'react';
import { connect } from 'react-redux';

import TodosActionsBar from '../TodosActionsBar/TodosActionsBar';
import TodosList from '../TodosList/TodosList';
import { TODO_STATUS_ACTIVE, TODO_STATUS_DONE } from '../../../constants';
import { addTodo, getTodos, deleteTodo, toggleTodoStatus, updateTodo } from '../../../store/actions/TodosActions';
// import './TodosModule.css';
import '../../../main.css';


class TodosModule extends Component {
    // without redux:
    // state = {
    //     todos : [
    //         ["1st todo", "Active", 10],
    //         ["2nd todo", "Active", 17],
    //         ["3rd todo", "Done", 23],
    //         ["4th todo", "Done", 35]
    //     ]
    // }

    componentDidMount = () => {
        this.props.getTodos();
    }

    onAddTodo = (text) => {
        this.props.addTodo(text);
        // without redux:
        // this.setState( {
        //     todos : [ ...this.state.todos, 
        //                 [todo, TODO_STATUS_ACTIVE, Date().toString() + todo.length]]
        // });
    }

    onClickDeleteTodo = (todoId) => {
        this.props.deleteTodo(todoId);
        // without redux
        // const todos = this.props.todos.filter(t => t.id !== todoId);
        // this.setState({ todos : todos });
    }

    onUpdateTodo = (todoId, text) => {
        this.props.updateTodo(todoId, text);
    }

    onToggleTodoStatus = (todoId, currStatus) => {
        this.props.toggleTodoStatus(todoId, (currStatus === TODO_STATUS_ACTIVE)? TODO_STATUS_DONE : TODO_STATUS_ACTIVE);
        // Without Redux
        // console.log("onCompleteTodo: " + todoId);
        // let todoIdx = this.props.todos.findIndex(e => e.id === todoId);
        // if(todoIdx !== undefined) 
        // {
        //     let todos = this.props.todos.slice();
        //     todos[todoIdx].status = (todos[todoIdx].status === TODO_STATUS_ACTIVE)? TODO_STATUS_DONE : TODO_STATUS_ACTIVE;
        //     this.setState({
        //         todos : todos
        //     });
        // }
    }

    render() {
        return ( 
            <div className="TodosView">
                <div className="TodosModule">
                    <TodosActionsBar 
                        addHandler={this.onAddTodo}/>
                    <TodosList 
                        todos={this.props.todos}
                        deleteHandler={this.onClickDeleteTodo}
                        updateHandler={this.onUpdateTodo}
                        toggleStatusHandler={this.onToggleTodoStatus} />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        todos: state.todosReducer.todos,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        addTodo: (text) => dispatch(addTodo(text)),
        getTodos: () => dispatch(getTodos()),
        deleteTodo: (todoId) => dispatch(deleteTodo(todoId)),
        toggleTodoStatus: (todoId, newStatus) => dispatch(toggleTodoStatus(todoId, newStatus)),
        updateTodo: (todoId, text) => dispatch(updateTodo(todoId, text))
    }
}
export default connect(mapStateToProps, mapDispatchToProps) (TodosModule);