
const complaintsReducer = (state = [], action) => {
    // console.log('action: ', action.payload);
    // console.log('type of action payload: ', typeof (action.payload));
    switch (action.type) {
        case 'storeComplaints':
            return action.payload;
        case 'deleteComplaint':
            return state.filter(item => {
                return item._id !== action.payload
            });
        default: return state
    }
}

export default complaintsReducer;