import actionTypes from './actionTypes';
import axios from '../../axios-instance';
import '../../constants';
import { TODO_STATUS_ACTIVE } from '../../constants';

// var ID = () => {
//     // Math.random should be unique because of its seeding algorithm.
//     // Convert it to base 36 (numbers + letters), and grab the first 9 characters
//     // after the decimal.
//     return '_' + Math.random().toString(36).substr(2, 9);
// };

export const addTodo = (text) => {
    const newTodo = {
        text : text, 
        status : TODO_STATUS_ACTIVE
        // id : ID()
    }
    return dispatch => {
        axios.post('/todos.json', newTodo)
        .then (response => {
            newTodo.id = response.data.name; // The ID Firebase generated
            dispatch(addTodoSuccess(newTodo));
        })
        .catch (error => {
            console.log(error);
            dispatch(addTodoFailure(error));
        })
    }
}
const addTodoSuccess = (newTodo) => {
    return {
        type : actionTypes.ADD_TODO_SUCCESS,
        todo : newTodo
    }
}
const addTodoFailure = (error) => {
    return {
        type : actionTypes.ADD_TODO_FAILURE,
        error : error
    }
}

export const getTodos = () => {
    return dispatch => {
        dispatch(getTodosBegin());
        axios.get("/todos.json")
        .then (response => {
            let fetchedTodos = [];
            for(let key in response.data) 
            {
                console.log(response.data[key]);
                fetchedTodos.push({
                        id: key,
                        status: response.data[key].status,
                        text: response.data[key].text
                    })
            }
            dispatch(getTodosSuccess(fetchedTodos));
        })
        .catch(error => {
            console.log(error);
            dispatch(getTodosFailure());
        })
    } 
}
const getTodosBegin = () => {
    return {
        type: actionTypes.GET_TODOS_BEGIN
    }
}
const getTodosSuccess = (fetchedTodos) => {
    return {
        type: actionTypes.GET_TODOS_SUCCESS,
        todos: fetchedTodos
    }
}
const getTodosFailure = (error) => {
    return {
        type: actionTypes.GET_TODOS_FAILURE,
        error: error
    }
}

export const deleteTodo = (todoId) => {
    return dispatch => {
        
        axios.delete('todos/' + todoId + '.json')
        .then (response => {
            dispatch(deleteTodoSuccess(todoId));
        })
        .catch (error => {
            console.log(error);
            dispatch(deleteTodoFailure(error));
        })
    }
}
const deleteTodoSuccess = (todoId) => {
    return {
        type: actionTypes.DELETE_TODO_SUCCESS,
        todoId: todoId
    }
} 
const deleteTodoFailure = (error) => {
    return {
        type: actionTypes.DELETE_TODO_FAILURE,
        error: error
    }
} 

export const updateTodo = (todoId, text) => {
    return dispatch => {
        axios.patch('/todos/' + todoId + '.json', {text : text})
        .then (response => {
            dispatch(updateTodoSuccess(todoId, text));
        })
        .catch (error => {
            console.log(error);
            dispatch(updateTodoFailure(error));
        })
    }
}
const updateTodoSuccess = (todoId, text) => {
    return {
        type: actionTypes.UPDATE_TODO_SUCCESS,
        todoId: todoId,
        text: text
    }
}
const updateTodoFailure = (error) => {
    return {
        type: actionTypes.UPDATE_TODO_FAILURE,
        error: error
    }
}

export const toggleTodoStatus = (todoId, newStatus) => {
    return dispatch => {
        axios.patch('/todos/' + todoId + '.json', {status : newStatus})
        .then (response => {
            dispatch(toggleTodoStatusSuccess(todoId, newStatus));
        })
        .catch (error => {
            dispatch(toggleTodoStatusFailure(error));
        })
    }
}
const toggleTodoStatusSuccess = (todoId, newStatus) => {
    return {
        type: actionTypes.TOGGLE_TODO_STATUS_SUCCESS,
        todoId: todoId,
        newStatus: newStatus
    }
}
const toggleTodoStatusFailure = (error) => {
    return {
        type: actionTypes.TOGGLE_TODO_STATUS_FAILURE,
        error: error
    }
}

