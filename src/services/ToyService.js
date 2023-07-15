import * as api from '../lib/api';

//const API_URI = 'http://localhost:28080/v1';
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN_PREFIX;
//const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_PROTECTED_URI + '/toys';
const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_ENCRYPTED_URI + '/toys';
const API_ENCRYPTED_URI = API_DOMAIN + process.env.REACT_APP_API_V1_ENCRYPTED_URI + '/toys';

export async function getAllToys() {
// //  return api.getPublicList(`${API_URI}`);
//   return api.getProtectedList(`${API_URI}`);
  return api.getEncryptedList(`${API_URI}`);
}

export async function getSingleToy(toyId) {
//  return api.getProtectedRecord(`${API_URI}/${toyId}`);
  return api.getEncryptedRecord(`${API_URI}/${toyId}`);
}

export async function addNewToy(toyRec) {
//  return api.postProtectedRecord(`${API_URI}`, toyRec);
  return api.postEncryptedRecord(`${API_URI}`, toyRec);
}

export async function updateToy(toyRec) {
//  return api.putProtectedRecord(`${API_URI}/${toyRec.id}`, toyRec);
  return api.putEncryptedRecord(`${API_URI}/${toyRec.id}`, toyRec);
}

export async function deleteToy(toyId) {
//  return api.deleteProtectedRecord(`${API_URI}/${toyId}`, null);
  return api.deleteEncryptedRecord(`${API_URI}/${toyId}`, null);
}

export async function getEncryptedToy(toyId) {
  //  return api.getPublicRecord(`${API_URI}/${toyId}`);
    return api.postEncryptedRecord(`${API_ENCRYPTED_URI}/${toyId}`, {toyId});
  }
  

