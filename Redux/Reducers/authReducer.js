
const authReducer = (state = null, action) => {
    switch (action.type) {
        case 'changeLoginStatus':
            return action.payload;
        default: return state
    }
}

export default authReducer;