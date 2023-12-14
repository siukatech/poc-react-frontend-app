import axiosService from '../../../frameworks/axios/services/axios-service';

const API_DOMAIN: string = process.env.REACT_APP_API_PATH_PREFIX as string;
const API: string =
  (API_DOMAIN as string) +
  (process.env.REACT_APP_API_PATH_V1_PROTECTED as string) +
  (process.env.REACT_APP_API_PATH_MERCHANT as string) +
  '';
const API_ENCRYPTED: string =
  (API_DOMAIN as string) +
  (process.env.REACT_APP_API_PATH_V1_ENCRYPTED as string) +
  (process.env.REACT_APP_API_PATH_MERCHANT as string) +
  '';
async function getAllMerchants(): Promise<any> {
  const response = await axiosService.get(`${API}`);
  return response.data;
}

async function getPagedMerchants(pageInfo: {
  startRow: number;
  page: number;
}): Promise<any> {
  const response = await axiosService.get(`${API}`, { params: pageInfo });
  return response.data;
}

async function getSingleMerchant(merchantId: number): Promise<any> {
  const response = await axiosService.get(`${API}/${merchantId}`);
  return response.data;
}

async function addSingleMerchant(merchantRec: {
  name: string;
  purchasedDate: Date;
}): Promise<any> {
  const response = await axiosService.post(`${API}`, merchantRec);
  return response.data;
}

async function updateSingleMerchant(merchantRec: {
  id: number;
  name: string;
  purchasedDate: Date;
  versionNo: number;
}): Promise<any> {
  const response = await axiosService.put(`${API}/${merchantRec.id}`, merchantRec);
  return response.data;
}

async function deleteSingleMerchant(merchantId: number): Promise<any> {
  const response = await axiosService.delete(`${API}/${merchantId}`);
  return response.data;
}


export {
  getAllMerchants,
  getPagedMerchants,
  getSingleMerchant,
  addSingleMerchant,
  updateSingleMerchant,
  deleteSingleMerchant,
}