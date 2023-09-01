

import axiosService from '../axios/axios-service';

const API_DOMAIN = process.env.REACT_APP_API_DOMAIN_PREFIX;
// const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_PROTECTED_URI + '/items';
const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_ENCRYPTED_URI + '/items';
const API_ENCRYPTED_URI = API_DOMAIN + process.env.REACT_APP_API_V1_ENCRYPTED_URI + '/items';


export async function getAllItems() {
  const response = await axiosService
  .get(`${API_URI}`)
  // .then((response) => {
  //   dataHandler(response.data);
  // });
  return response.data;
//  return api.getEncryptedList(`${API_URI}`);
}
  

