
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
        default: return state
    }
}