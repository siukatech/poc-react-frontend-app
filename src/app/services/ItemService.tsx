import axiosService from '../../base/axios/axios-service';

const API_DOMAIN: string = process.env.REACT_APP_API_DOMAIN_PREFIX as string;
// const API_URI = API_DOMAIN + process.env.REACT_APP_API_V1_PROTECTED_URI + '/items';
const API_URI: string =
  (API_DOMAIN as string) +
  (process.env.REACT_APP_API_V1_ENCRYPTED_URI as string) +
  '/items';
const API_ENCRYPTED_URI: string =
  (API_DOMAIN as string) +
  (process.env.REACT_APP_API_V1_ENCRYPTED_URI as string) +
  '/items';

export async function getAllItems(): Promise<any> {
  const response = await axiosService.get(`${API_URI}`);
  // .then((response) => {
  //   dataHandler(response.data);
  // });
  return response.data;
  //  return api.getEncryptedList(`${API_URI}`);
}

export async function getPagedItems(pageInfo: {
  startRow: number;
  page: number;
}): Promise<any> {
  const response = await axiosService.get(`${API_URI}`, { params: pageInfo });
  return response.data;
}

export async function getSingleItem(itemId: number): Promise<any> {
  const response = await axiosService.get(`${API_URI}/${itemId}`);
  return response.data;
}

export async function addSingleItem(itemRec: {
  name: string;
  purchasedDate: Date;
}): Promise<any> {
  const response = await axiosService.post(`${API_URI}`, itemRec);
  return response.data;
}

export async function updateSingleItem(itemRec: {
  id: number;
  name: string;
  purchasedDate: Date;
  versionNo: number;
}): Promise<any> {
  const response = await axiosService.put(`${API_URI}/${itemRec.id}`, itemRec);
  return response.data;
}

export async function deleteSingleItem(itemId: number): Promise<any> {
  const response = await axiosService.delete(`${API_URI}/${itemId}`);
  return response.data;
}
