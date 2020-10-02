import actionTypes from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    // userTokenId: null,
    authInProgress: false,
    error: '',
}

const AuthReducer = (state = initialState, action) => {
    // console.log("AuthReducer: action is " + action.type);
    switch(action.type) {
        case actionTypes.AUTH_BEGIN:
            console.log("Auth Reducer: AUTH_BEGIN handler");
            return {...state, authInProgress: true, error: ''};
        case actionTypes.AUTH_SUCCESS:
            console.log("Auth Reducer: AUTH_SUCCESS handler");
            return {...state, authenticated: true, authInProgress:false};  // userTokenId: action.response.idToken, 
        case actionTypes.AUTH_FAILURE:
            console.log("Auth Reducer: AUTH_FAILURE handler");
            return {...state, authenticated: false, authInProgress: false, error : action.error};
        case actionTypes.AUTH_SIGNOUT:
            console.log("Auth Reducer: AUTH_SIGNOUT handler");
            return {...state, authenticated: false};
        default:
            return {...state};
    }
}

export default AuthReducer;