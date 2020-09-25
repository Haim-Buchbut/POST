import actionTypes from './actionTypes';
import axios from '../../axios-instance';
import { FIREBASE_API_KEY } from '../../constants';
import errorMessages from '../errors/';

export const authUser = (email, password, signIn) => {
    console.log("authUser(): is signed in? " + signIn);
    return dispatch => {
        dispatch(authBegin());
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='.concat(FIREBASE_API_KEY);
        if(!signIn)
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='.concat(FIREBASE_API_KEY);
        axios.post( url,
                    {email: email, password: password, returnSecureToken: true} )
        .then( response => {
            console.log(response);
            dispatch(authSucces(response.data));
        })
        .catch( error => {
            let errorMessage = '';
            if (error.response) {
                console.log(error.response);
                // The request was made and the server responded with a status code that falls out of the range of 2xx
                switch(error.response.data.error.message) {
                    case 'EMAIL_NOT_FOUND': errorMessage = errorMessages.AUTH_SIGN_IN_EMAIL_NOT_FOUND; break;
                    case 'INVALID_PASSWORD': errorMessage = errorMessages.AUTH_SIGN_IN_INVALID_PASSWORD; break;
                    case 'USER_DISABLED': errorMessage = errorMessages.AUTH_SIGN_IN_USER_DISABLED; break;
                    case 'EMAIL_EXISTS': errorMessage = errorMessages.AUTH_SIGN_UP_EMAIL_EXISTS; break;
                    default: 
                        if(String(error.response.data.error.message).includes('WEAK_PASSWORD')) 
                            errorMessage = errorMessages.AUTH_SIGN_UP_WEAK_PASSWORD;
                        else
                            errorMessage = (signIn? errorMessages.AUTH_SIGN_IN_DEFAULT : errorMessages.AUTH_SIGN_UP_DEFAULT); break;
                }
            } else 
                errorMessage = error.message;
            console.log(errorMessage);
            dispatch(authFailure(errorMessage));
        })
    }
} 
export const authBegin = () => {
    return {
        type: actionTypes.AUTH_BEGIN
    }
}
export const authSucces = (response) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        response: response
    }    
}
export const authFailure = (error) => {
    return {
        type: actionTypes.AUTH_FAILURE,
        error: error
    }
}
export const signOut = () => {
    return {
        type: actionTypes.AUTH_SIGNOUT
    }
}