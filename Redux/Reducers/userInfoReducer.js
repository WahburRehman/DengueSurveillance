
const userInfoReducer = (state = {}, action) => {
    // console.log('action: ', action.payload);
    // console.log('type of action payload: ', typeof (action.payload));
    switch (action.type) {
        case 'storeUserInfo':
            return action.payload;
        case 'updateUserInfo':
            action.payload.authToken = state.authToken;
            return action.payload
        default: return state
    }
}

export default userInfoReducer;