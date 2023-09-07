

import axiosService from '../../base/axios/axios-service';

const API_DOMAIN: string = (process.env.REACT_APP_API_DOMAIN_PREFIX as string);
// const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_PROTECTED_URI + '/items';
const API_URI: string = (API_DOMAIN as string) + (process.env.REACT_APP_API_V1_ENCRYPTED_URI as string) + '/items';
const API_ENCRYPTED_URI: string = (API_DOMAIN as string) + (process.env.REACT_APP_API_V1_ENCRYPTED_URI as string) + '/items';


export async function getAllItems(): Promise<any> {
  const response = await axiosService
  .get(`${API_URI}`)
  // .then((response) => {
  //   dataHandler(response.data);
  // });
  return response.data;
//  return api.getEncryptedList(`${API_URI}`);
}
  

