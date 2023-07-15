import * as api from '../lib/api';

//const API_URI = 'http://localhost:28080/v1';
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN_PREFIX;
//const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_PROTECTED_URI + '/items';
const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_ENCRYPTED_URI + '/items';
const API_ENCRYPTED_URI = API_DOMAIN + process.env.REACT_APP_API_V1_ENCRYPTED_URI + '/items';

export async function getAllItems() {
// //  return api.getPublicList(`${API_URI}`);
//   return api.getProtectedList(`${API_URI}`);
  return api.getEncryptedList(`${API_URI}`);
}

export async function getSingleItem(itemId) {
//  return api.getProtectedRecord(`${API_URI}/${itemId}`);
  return api.getEncryptedRecord(`${API_URI}/${itemId}`);
}

export async function addNewItem(itemRec) {
//  return api.postProtectedRecord(`${API_URI}`, itemRec);
  return api.postEncryptedRecord(`${API_URI}`, itemRec);
}

export async function updateItem(itemRec) {
//  return api.putProtectedRecord(`${API_URI}/${itemRec.id}`, itemRec);
  return api.putEncryptedRecord(`${API_URI}/${itemRec.id}`, itemRec);
}

export async function deleteItem(itemId) {
//  return api.deleteProtectedRecord(`${API_URI}/${itemId}`, null);
  return api.deleteEncryptedRecord(`${API_URI}/${itemId}`, null);
}

export async function getEncryptedItem(itemId) {
  //  return api.getPublicRecord(`${API_URI}/${itemId}`);
    return api.postEncryptedRecord(`${API_ENCRYPTED_URI}/${itemId}`, {itemId});
  }
  

