
export default requestsReducer = (state = [], action) => {
    // console.log('action: ', action.payload);
    // console.log('type of action payload: ', typeof (action.payload));
    switch (action.type) {
        case 'storeRequests':
            return action.payload;
        case 'deleteRequest':
            return state.filter(item => {
                return item._id !== action.payload
            });
        case 'addNewRequest':
            state.unshift(action.payload);
            return state
        default: return state
    }
}