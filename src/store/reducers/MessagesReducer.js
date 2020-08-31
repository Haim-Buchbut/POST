
import actionTypes from '../actions/actionTypes';
import { FOLDER_NAME_STARRED } from '../../constants';

const initialState = {
    messages : [],
    nextMessageId : 1,
    messagesUptodate : false,

    deleteInProgress : false,
    addInProgress : false,
    getMessagesInProgress : false,
    getMessageInProgress : false,
    
    errorMsg : null,
    currentMessage : {
        to : '',
        subject : '',
        message : ''                            
    },
    showSideDrawer : false,
    selectedFolder : null // FOLDER_NAME_INBOX
} 


const MessagesReducer = (state = initialState, action) => {
    console.log("MessagesReducer: action is " + action.type);
    // console.log(action);
    // console.log(state);
    switch (action.type) {

        case actionTypes.ADD_MESSAGE_BEGIN:
            console.log("Reducer: ADD_MESSAGE_BEGIN handler");
            return {
                ...state,
                addInProgress : true
            }
        case actionTypes.ADD_MESSAGE_SUCCESS:
            console.log("Reducer: ADD_MESSAGE_SUCCESS handler");
            return {
                ...state,
                messages : [...state.messages, {                    
                    id : state.nextMessageId + 1,
                    to : action.to,
                    subject : action.subject,
                    message : action.message}],
                nextMessageId : state.nextMessageId + 1,
                messagesUptodate : false,
                addInProgress : false,
                errorMsg: null
            };
        case actionTypes.ADD_MESSAGE_FAILURE:
            console.log("Reducer: ADD_MESSAGE_FAILURE");
            return {
                ...state,
                errorMsg : action.errorMsg,
                addInProgress : false
            }

 
        case actionTypes.DELETE_MESSAGE_BEGIN:
            console.log("Reducer: DELETE_MESSAGE_BEGIN handler");
            return {
                ...state,
                deleteInProgress : true
            }
        case actionTypes.DELETE_MESSAGE_SUCCESS:
            console.log("Reducer: DELETE_MESSAGE_SUCCESS handler");
            console.log("Number of Messages Before Deletion: " + state.messages.length);
            var itemIdx = null;
            for(var i=0; i < state.messages.length; i++)
            {
                if(state.messages[i].id === action.messageId) {
                    itemIdx = i;
                    break;
                }
            }
            if(itemIdx != null) 
                return {
                    ...state,
                    messages : [...state.messages.slice(0, itemIdx), 
                                ...state.messages.slice(itemIdx + 1) ],
                    deleteInProgress : false,
                    errorMsg : null 
                }
            // Otherwise - 
            return {
                ...state,
                errorMsg: "We could not remove the message you were looking for.",
                deleteInProgress : false
            }
        case actionTypes.DELETE_MESSAGE_FAILURE:
            console.log("Reducer: DELETE_MESSAGE_FAILURE handler");  
            return {
                ...state,
                errorMsg : action.errorMsg,
                deleteInProgress : false
            }


        case actionTypes.GET_MESSAGE_BEGIN:
                console.log("Reducer: GET_MESSAGE_BEGIN handler");
                return {
                    ...state,
                    getMessageInProgress : true
                }    
        case actionTypes.GET_MESSAGE_SUCCESS:
            console.log("Reducer | GET_MESSAGE_SUCCESS handler");
            // console.log(state);
            // console.log(action);
            return {
                ...state,
                currentMessage : {
                    id : action.id,
                    to : action.to,
                    subject : action.subject,
                    message : action.message,
                    sentTime : action.sentTime,
                    messageType : action.messageType,
                    starred : action.starred
                },
                getMessageInProgress : false,
                errorMsg : null         
            }    
        case actionTypes.GET_MESSAGE_FAILURE:
            console.log("Reducer | GET_MESSAGE_FAILURE handler");
            console.log(state);
            console.log(action);
            return {
                ...state,
                errorMsg: action.errorMsg,
                getMessageInProgress : false
            }    
        

        case actionTypes.GET_MESSAGES_BEGIN:
            console.log("Reducer: GET_MESSAGES_BEGIN handler");
            return {
                ...state,
                getMessagesInProgress : true
            }
        case actionTypes.GET_MESSAGES_SUCCESS:
            console.log("Reducer | GET_MESSAGES_SUCCESS handler");
            return {
                ...state,
                messages : [...action.messages],
                selectedFolder : action.selectedFolder,
                nextMessageId : action.messages.length + 1,
                messagesUptodate : true,
                getMessagesInProgress : false,
                errorMsg : null
            }
        case actionTypes.GET_MESSAGES_FAILURE:
            console.log("Reducer | GET_MESSAGES_FAILURE handler");
            return {
                ...state,
                messages : [],
                nextMessageId : 1,
                getMessagesInProgress : false,
                errorMsg : action.errorMsg 
            }
        case actionTypes.REFRESH_MESSAGES:
            console.log("Reducer | REFRESH_MESSAGES handler");
            return {
                ...state,
                // selectedFolder : action.selectedFolder,
                messagesUptodate : false
            }
    

        case actionTypes.TOGGLE_STAR_SUCCESS:
            console.log("Reducer | TOGGLE_STAR_SUCCESS handler");
            let messages = state.messages.slice();
            let messageIdx = messages.findIndex(e => e.id === action.messageId);
            if( messageIdx !== undefined ) 
                messages[messageIdx].starred = action.starred;
            
            if( state.currentMessage.id === action.messageId) {   
                return {
                    ...state,
                    messages: [...messages],
                    currentMessage : {
                        id : state.currentMessage.id,
                        to : state.currentMessage.to,
                        subject : state.currentMessage.subject,
                        message : state.currentMessage.message,
                        sentTime : state.currentMessage.sentTime,
                        messageType : state.currentMessage.messageType,
                        starred : action.starred
                    },
                    messagesUptodate: state.selectedFolder === FOLDER_NAME_STARRED? false : true,
                    error: '' }
            } else {
                return {
                        ...state,
                        messages: [...messages],
                        messagesUptodate: state.selectedFolder === FOLDER_NAME_STARRED? false : true,
                        error: '' } 
            }
            case actionTypes.TOGGLE_STAR_FAILURE:
            console.log("Reducer | TOGGLE_STAR_FAILURE handler");
            console.log(action.error);
            return {
                ...state,
                error: action.error
            }


        case actionTypes.FILL_MY_INBOX_SUCCESS:
            console.log("Reducer: FILL_MY_INBOX_SUCCESS handler");
            console.log(action.messagesAdded);
            return {
                ...state,
                messages : [...state.messages, action.messagesAdded],
                nextMessageId : state.nextMessageId + action.messagesAdded.length,
                messagesUptodate : false,
                errorMsg: null
            }


        case actionTypes.TOGGLE_SIDE_DRAWER:
            console.log("Reducer | TOGGLE_SIDE_DRAWER handler");
            console.log(state);
            console.log(action);
            return {
                ...state,
                showSideDrawer : !state.showSideDrawer 
            }
    

        default:
            console.log("Reducer: Default handler");
            return state;
            // if( state != null ) {
            //     console.log("state has values");
            //     return state;
            // }
            // else {
            //     console.log("state is null");
            //     return {
            //         messages : [],
            //         nextMessageId : 1,
            //         messagesUptodate : false,

            //         deleteInProgress : false,
            //         addInProgress : false,
            //         getMessagesInProgress : false,
            //         getMessageInProgress : false,
                    
            //         errorMsg : null,
            //         currentMessage : {
            //             to : '',
            //             subject : '',
            //             message : ''                            
            //         },
            //         // showSideDrawer : false,
            //         selectedFolder : 'Inbox'
            //     };
            // }
    }
};

export default MessagesReducer;
