import axiosService from '../../../frameworks/axios/services/axios-service';

const API_DOMAIN: string = process.env.REACT_APP_API_PATH_PREFIX as string;
// const API = API_DOMAIN + process.env.REACT_APP_API_PATH_V1_PROTECTED + '/items';
const API: string =
  (API_DOMAIN as string) +
  (process.env.REACT_APP_API_PATH_V1_ENCRYPTED as string) +
  (process.env.REACT_APP_API_PATH_ITEM as string) +
  '';
const API_ENCRYPTED: string =
  (API_DOMAIN as string) +
  (process.env.REACT_APP_API_PATH_V1_ENCRYPTED as string) +
  (process.env.REACT_APP_API_PATH_ITEM as string) +
  '';
// export async function getAllItems(): Promise<any> {
async function getAllItems(): Promise<any> {
  const response = await axiosService.get(`${API}`);
  // .then((response) => {
  //   handleData(response.data);
  // });
  return response.data;
  //  return api.getEncryptedList(`${API}`);
}

async function getPagedItems(pageInfo: {
  startRow: number;
  page: number;
}): Promise<any> {
  const response = await axiosService.get(`${API}`, { params: pageInfo });
  return response.data;
}

async function getSingleItem(itemId: number): Promise<any> {
  const response = await axiosService.get(`${API}/${itemId}`);
  return response.data;
}

async function addSingleItem(itemRec: {
  name: string;
  purchasedDate: Date;
}): Promise<any> {
  const response = await axiosService.post(`${API}`, itemRec);
  return response.data;
}

async function updateSingleItem(itemRec: {
  id: number;
  name: string;
  purchasedDate: Date;
  versionNo: number;
}): Promise<any> {
  const response = await axiosService.put(`${API}/${itemRec.id}`, itemRec);
  return response.data;
}

async function deleteSingleItem(itemId: number): Promise<any> {
  const response = await axiosService.delete(`${API}/${itemId}`);
  return response.data;
}

export {
  getAllItems,
  getPagedItems,
  getSingleItem,
  addSingleItem,
  updateSingleItem,
  deleteSingleItem,
};

