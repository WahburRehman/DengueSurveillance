import * as actionTypes from './actionTypes';

export const storeUserInfo = obj => ({
    type: actionTypes.storeUserInfo,
    payload: obj
});

export const updateUserInfo = obj => ({
    type: actionTypes.updateUserInfo,
    payload: obj
});

export const changeLoginStatus = (logIn) => ({
    type: actionTypes.changeLoginStatus,
    payload: logIn
});

export const storeComplaints = (complaints) => ({
    type: actionTypes.storeComplaints,
    payload: complaints
});

export const deleteComplaint = (complaintID) => ({
    type: actionTypes.deleteComplaint,
    payload: complaintID
});

export const addNewComplaint = (complaint) => ({
    type: actionTypes.addNewComplaint,
    payload: complaint
});



export const storeRequests = (requests) => ({
    type: actionTypes.storeRequests,
    payload: requests
});

export const deleteRequest = (requestID) => ({
    type: actionTypes.deleteRequest,
    payload: requestID
});

export const addNewRequest = (request) => ({
    type: actionTypes.addNewRequest,
    payload: request
});


export const storePatients = (patients) => ({
    type: actionTypes.storePatients,
    payload: patients
});

export const deletePatient = (patientID) => ({
    type: actionTypes.deletePatient,
    payload: patientID
});

export const addNewPatient = (patient) => ({
    type: actionTypes.addNewPatient,
    payload: patient
});

