
export default patientsReducer = (state = [], action) => {
    switch (action.type) {
        case 'storePatients':
            return action.payload;
        case 'deletePatient':
            return state.filter(item => {
                return item._id !== action.payload
            });
        default: return state
    }
}