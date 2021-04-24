import { combineReducers } from 'redux';

//REDUCERS
import authReducer from './authReducer';
import requestsReducer from './requestsReducer';
import patientsReducer from './patientsReducer';
import userInfoReducer from './userInfoReducer';
import complaintsReducer from './complaintsReducer';

export default rootReducer = combineReducers({
    requests: requestsReducer,
    patients: patientsReducer,
    userInfo: userInfoReducer,
    authentication: authReducer,
    complaints: complaintsReducer,
});
