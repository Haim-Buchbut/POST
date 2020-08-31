import actionTypes from './actionTypes';
import axios from '../../axios-instance';
// import { stringify as uuidStringify } from 'uuid';
import { FOLDER_NAME_STARRED, FOLDER_NAME_INBOX, MESSAGE_TYPE_INCOMING, MESSAGE_TYPE_OUTGOING, FOLDER_NAME_SENT, MAILSLURP_INBOX_ID } from '../../constants';
// import mailSlurp from "mailslurp-client";


export const deleteMessageFromDB = (messageId) => {
    console.log("Action Creator - deleteMessageFromDB()");
    return dispatch => {
        dispatch(deleteMessageBegin());
        console.log("Path: " + 'messages/'.concat(messageId));
        axios.delete('messages/'.concat(messageId) + ".json")
            .then( response => {
                dispatch(deleteMessageSuccess(messageId));
            })
            .catch( response => {
                dispatch(deleteMessageFailure(response.error));
            })
    }
}
export const deleteMessageBegin = () => {
    return {
        type : actionTypes.DELETE_MESSAGE_BEGIN
    }
}
export const deleteMessageSuccess = (messageId) => {
    return {
        type : actionTypes.DELETE_MESSAGE_SUCCESS,
        messageId : messageId
    }
}
export const deleteMessageFailure = (error) => {
    return {
        type : actionTypes.DELETE_MESSAGE_FAILURE,
        errorMsg : error
    }
}


export const addMessgaeToDB = (mailSlurp, to, subject, message) => {
    console.log("Action Creator - addMessgaeToDB()");
    var sentTime = new Date();
    const newMessage = {
        to : to, 
        subject : subject, 
        message : message,
        messageType : MESSAGE_TYPE_OUTGOING,
        sentTime : sentTime,
        viewed : true, // for sent items, viewed status is always true
        starred : false
    }

    // mailSlurp.createInbox()
    // .then(inbox => {
    //     console.log("Created Inbox. ID is: " + inbox.id); 
        // mailSlurp.sendEmail(inbox.id, {

    return dispatch => {
        dispatch(addMessageBegin());
        // let messageAsHTML = "<!DOCTYPE html lang='en-US'><html><head></head><body>" + message + "</body></html>";
        console.log("messageAsHTML: " + message);
        mailSlurp.sendEmail(MAILSLURP_INBOX_ID, {
            to: [to],
            subject: subject,
            body: message,
            isHTML: true
        })
        .then (response => {
            console.log("Sending email via MailSlurp succeeded!");
            
            axios.post('/messages.json', newMessage)
            .then (response => {
                console.log("Adding email to database succeeded!");
                console.log(response);
                dispatch(addMessageSuccess(response.to, response.subject, response.message));
            })
            .catch (error => {
                console.log("post message failed: " + error);
                dispatch(addMessageFailure(error));
            })
        })
        .catch (error => {
            console.log("Sending email via MailSlurp failed. Error: " + error);
            dispatch(addMessageFailure(error));
        })    
    }
    // })
    // .catch (error => {
    //     console.log("Create Inbox fialed. Error: " + error);
    // })
}
export const addMessageBegin = () => {
    return {
        type : actionTypes.ADD_MESSAGE_BEGIN
    }
}
export const addMessageSuccess = (to, subject, message) => {
    return {
        type: actionTypes.ADD_MESSAGE_SUCCESS,
        to : to, 
        subject : subject, 
        message : message 
    }
}
export const addMessageFailure = (message) => {
    return {
        type: actionTypes.ADD_MESSAGE_FAILURE,
        errorMsg: message 
    }
}


export const getMessagesFromDB = (selectedFolder) => {
    console.log("Action Creator - getMessagesFromDB(): " + selectedFolder);
    return dispatch => {
        dispatch(getMessagesBegin());
        // Example for sorting by subject: axios.get(  '/messages.json?orderBy="subject"&equalTo="WAREHOUSE SPECIALS"' 
        let queryURL;
        switch (selectedFolder) { 
            case FOLDER_NAME_INBOX: 
                queryURL = '/messages.json?orderBy="messageType"&equalTo="incoming"'; 
                break;
            case FOLDER_NAME_SENT: 
                queryURL = '/messages.json?orderBy="messageType"&equalTo="outgoing"'; 
                break;
            case FOLDER_NAME_STARRED: 
                queryURL = '/messages.json?orderBy="starred"&equalTo=true'; 
                break;
            default: 
                queryURL = '/messages.json'; 
            break;
        }
        axios.get( queryURL )        
        .then(response => {
            console.log("Fetched data succesfully:");
            console.log(response);
            // convert returned JSON object to array
            var fetchedMessages = [];
            for(let key in response.data)
                fetchedMessages.push({
                    id: key,
                    to: response.data[key].to,
                    subject: response.data[key].subject,
                    sentTime: response.data[key].sentTime,
                    viewed: response.data[key].viewed,
                    starred: response.data[key].starred
                });
            // In order to sort by date on the SERVER SIDE, we could have additoinal field which conactenate message type & date, with endDate of today (e.g. "incoming20200814")
            var messagesSorted = fetchedMessages.sort((a, b) => a.sentTime < b.sentTime ? 1 : -1
            );
            dispatch(getMessagesSuccess(messagesSorted,selectedFolder));
        })
        .catch(function (error) {
            console.log(error);
            return getMessagesFailure(error);
        })
    }
}
export const searchMessagesInDB = (searchTerm) => {
    console.log("Action Creator - searchMessagesInDB(): " + searchTerm);
    return dispatch => {
        dispatch(getMessagesBegin());
        // Firebase does NOT support search by partial value, so we fetch all messages and filter on client side
        // Alternatives: If partial search is required - 
        // 1) Use 3rd party tool, or 2) use other DB (e.g. MongoDB)
        axios.get( '/messages.json' )        
        .then(response => {
            console.log("Fetched data succesfully:");
            console.log(response);
            // convert returned JSON object to array
            var fetchedMessages = [];
            for(let key in response.data)
                if( ((response.data[key].subject !== undefined) && String(response.data[key].subject).toLowerCase().includes(searchTerm.toLowerCase())) ||
                    ((response.data[key].to !== undefined) && String(response.data[key].to).toLowerCase().includes(searchTerm.toLowerCase())) ||
                    ((response.data[key].message !== undefined) && String(response.data[key].message).toLowerCase().includes(searchTerm.toLowerCase())) )
                    fetchedMessages.push({
                        id: key,
                        to: response.data[key].to,
                        subject: response.data[key].subject,
                        sentTime: response.data[key].sentTime,
                        viewed: response.data[key].viewed,
                        starred: response.data[key].starred
                    });
            // In order to sort by date on the SERVER SIDE, we could have additoinal field which conactenate message type & date, with endDate of today (e.g. "incoming20200814")
            var messagesSorted = fetchedMessages.sort((a, b) => a.sentTime < b.sentTime ? 1 : -1
            );
            console.log(messagesSorted);
            dispatch(getMessagesSuccess(messagesSorted,null));
        })
        .catch(function (error) {
            console.log(error);
            return getMessagesFailure(error);
        })
    }
}
export const getMessagesBegin = () => {
    return {
        type : actionTypes.GET_MESSAGES_BEGIN
    }
}
export const getMessagesSuccess = (fetchedMessages,selectedFolder) => {
    return {
        type: actionTypes.GET_MESSAGES_SUCCESS,
        messages : fetchedMessages,
        selectedFolder : selectedFolder
    }
}
export const getMessagesFailure = (errorMsg) => {
    return {
        type: actionTypes.GET_MESSAGES_FAILURE,
        errorMsg : errorMsg
    }
}
export const refreshMessages = () => {
    console.log("Action Creator - refreshMessages()");
    return dispatch => dispatch({
        type : actionTypes.REFRESH_MESSAGES
    });
}


export const getMessageFromDB = (messageId) => {
    console.log("Action Creator - getMessageFromDB(): message ID is " + messageId);

    return dispatch => {
        dispatch(getMessageBegin());

        const path = '/messages/'.concat(messageId) + ".json";
        axios.get(path)
        .then( response => {
            console.log(response);
            dispatch(getMessageSuccess(
                messageId,
                response.data.to,
                response.data.subject,
                response.data.message,
                response.data.sentTime,
                response.data.messageType,
                response.data.starred));
        })
        .catch( function(error) {
            console.log(error);
            return getMessageFailed(error);
        })
    }
}
export const getMessageBegin = () => {
    return {
        type : actionTypes.GET_MESSAGE_BEGIN
    }
}
export const getMessageSuccess = (id,to,subject,message,sentTime,messageType,starred) => {
    return {
        type : actionTypes.GET_MESSAGE_SUCCESS,
        id :  id,
        to : to,
        subject : subject,
        message : message,
        sentTime : sentTime,
        messageType : messageType,
        starred : starred
    }
}
export const getMessageFailed = (errorMsg) => {
    return {
        type : actionTypes.GET_MESSAGE_FAILURE,
        errorMsg :  errorMsg
    }
}
export const markMessageAsViewed = (messageId) => {
    console.log("Action Creator - markMessageAsViewed(): message ID is " + messageId);
    const path = '/messages/'.concat(messageId) + ".json";
    // We're not updating the state here, as the list of messages get fetched again
    axios.patch(path, {viewed : true})
        .then( response => {
            console.log(response);
        })
        .catch( function(error) {
            console.log(error);
        })
}


export const toggleStar = (messageId, isStarred) => {
    console.log("toggleStar: " + messageId + " | " + isStarred);
    return dispatch => {
        axios.patch('/messages/' + messageId + '.json', {starred : isStarred})
        .then (response => {
            dispatch(toggleStarSuccess(messageId, isStarred));
        })
        .catch (error => {
            console.log(error);
            dispatch(toggleStarFailure(error));
        })
    }
}
const toggleStarSuccess = (messageId, isStarred) => {
    return {
        type: actionTypes.TOGGLE_STAR_SUCCESS,
        messageId: messageId,
        starred: isStarred
    }
}
const toggleStarFailure = (error) => {
    return {
        type: actionTypes.TOGGLE_STAR_FAILURE,
        error: error
    }
}



export const fillMyInbox = () => {
    console.log("Action Creator - fillMyInbox()");
    
    var messagesToAdd = [
        ["Keith Harrison", "Perfect pitch deck to get Startup Funding by Nancy Duarte", "Dear Startup Founder, If Funding is high on your list of priorities, hopefully I can help. Nancy Duarte is one of the worlds leading communication and Pitch Deck experts and I found this online?"],
        ["support@gocheetah.com", "WAREHOUSE SPECIALS - WHILE SUPPLIES LASTS!", "We've recently added hundreds of new products for sale. Here's a quick list of great deals and new items now available on Cheetah. Note: This is just a small sample of what's in store for you in the Cheetah catalog. Products can only be viewed and ordered through the app. Be sure to have your phone handy so you can quickly add items to your cart."],
        ["nitsan_p@postfunnel.com", "Marketing Lessons from Disney and D.C", "Hi Haim, A couple of days ago, we learned that our use of the term, to name a series of interviews, might be offensive to some. As we are now educating ourselves on this topic, I wanted to ask you what you think about it? Of course, this is exceptionally relevant. We encourage marketers to look into their offering and messaging and see if they use any language that might originate in or include some stereotypical accents. And then walk the walk. "],
        ["lauren@pulverdestinations.com", "Invitation To #140Conf Live w/Peter Katz", "You are invited to join me tomorrow, July 15th when I host #140Conf Peter Katz: Words, Wonder & Song starting at 12:00 PM (Eastern).  Click HERE to request your Zoom link. Picking up from last week's Faith, Wonder and Love Peter will take us on a soulful journey as he shares his inspiration, back stories about his music and about life as a singer / songwriter; storyteller and speaker. "],    
        ["hiten@producthabits.com", "Document nightmares", "I just wrapped up a round of customer development calls. One word kept coming up: Permissions. I was asking folks about how they collaborate on documents with people outside of their organizations."]
    ]
    var messagesAdded = [];

    for(var i=0; i < messagesToAdd.length; i++)
    {
        console.log(i);
        var sentTime = new Date();
        const newMessage = {
            to : messagesToAdd[i][0], 
            subject : messagesToAdd[i][1], 
            message : messagesToAdd[i][2],
            messageType : MESSAGE_TYPE_INCOMING,
            sentTime : sentTime,
            viewed : false,
            starred : false
        }
        console.log("New Message Is:");
        console.log(newMessage);
        axios.post('/messages.json', newMessage)
            .then (response => {
                console.log(response);
                messagesAdded.push(newMessage);
            })
            .catch (response => {
                console.log(response.error);
            })
    }

    console.log("Added " + messagesAdded.length + " out of " + messagesToAdd.length)
    return {
        type : actionTypes.FILL_MY_INBOX_SUCCESS,
        messagesAdded :  messagesAdded
    }
}

