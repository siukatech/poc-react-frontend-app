import * as api from '../lib/api';

//const API_URI = 'http://localhost:28080/v1';
const API_DOMAIN = process.env.REACT_APP_API_DOMAIN_PREFIX;
const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_PROTECTED_URI + '/my';
// const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_PUBLIC_URI + '/my';


export async function getPublicKey() {
//  return api.getRecord(`${API_URI}/public-key`);
  return api.postProtectedRecord(`${API_URI}/public-key`, {});
}



