import '../actions/actionTypes';
import actionTypes from '../actions/actionTypes';

const initialState = {
    todos : [],
    error : '',
    getTodosInProgress : false  // to show a sponner if it takes long
}


const TodosReducer = (state = initialState, action) => {
    console.log("TodosReducer: action is " + action.type);

    switch (action.type) {
        case actionTypes.ADD_TODO_SUCCESS:
            return {
                ...state,
                todos : [...state.todos, {
                    id : action.todo.id,
                    text : action.todo.text,
                    status : action.todo.status
                    }],
                error: ''                
            }
        case actionTypes.ADD_TODO_FAILURE:
           return {
               ...state,
               error: action.error
           }


        case actionTypes.GET_TODOS_BEGIN:
            console.log("Reducer: GET_TODOS_BEGIN handler");
            return {
                ...state,
                getTodosInProgress : true
            }
        case actionTypes.GET_TODOS_SUCCESS:
            console.log("GET_TODOS_SUCCESS handler");
            return {
                ...state,
                todos: [...action.todos],
                error: '',
                getTodosInProgress : false
            }
        case actionTypes.GET_TODOS_FAILURE:
            console.log("GET_TODOS_FAILURE handler");
            return {
                ...state,
                error: action.error,
                getTodosInProgress : false
            }

        case actionTypes.DELETE_TODO_SUCCESS:
            const updatedTodosList = [...state.todos].filter(curr => curr.id !== action.todoId)
            return {
                ...state,
                todos: updatedTodosList,
                error: ''
            }
        case actionTypes.DELETE_TODO_FAILURE:
            return {
                ...state,
                error: action.error
            }

        case actionTypes.UPDATE_TODO_SUCCESS:
            let todos = state.todos.slice();
            let todoIdx = todos.findIndex(e => e.id === action.todoId);
            if( todoIdx !== undefined ) 
                todos[todoIdx].text = action.text;            
            return {
                ...state,
                todos: todos,
                error: ''
            }
        case actionTypes.UPDATE_TODO_FAILURE:
            return {
                ...state,
                error: action.error
            }

        case actionTypes.TOGGLE_TODO_STATUS_SUCCESS:
            let todos2 = state.todos.slice();
            let todo2Idx = todos2.findIndex(e => e.id === action.todoId);
            if( todo2Idx !== undefined ) 
                todos2[todo2Idx].status = action.newStatus;            
            return {
                ...state,
                todos: todos2,
                error: ''
            }
        case actionTypes.TOGGLE_TODO_STATUS_FAILURE:
            return {
                ...state,
                error: action.error
            }


        default:
            console.log("Default handler");
            return state;
    }
}

export default TodosReducer;