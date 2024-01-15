import axiosService from '../../../frameworks/axios/services/axios-service';
import { II18nResource } from '../models';

// for typescript, "import './i18n';" will be ok.
// xxxxx - typescript is required to wrap a function to call in index.tsx
// const initI18n = () => {
  const i18nUrl: string =
  (process.env.REACT_APP_API_PATH_PREFIX as string) +
  (process.env.REACT_APP_API_PATH_V1_PUBLIC as string) +
  // (process.env.REACT_APP_API_PATH_I18N_LANG as string)
  (process.env.REACT_APP_API_PATH_I18N_ALL as string)
;


const getI18nResources = async (lng: string): Promise<II18nResource[]> => {
// const getI18nResources = async (lng: string): Promise<any> => {
    // {{lng}}
  // console.debug(`getI18nResources - i18nUrl: [${i18nUrl}]`)
  const { data } = await axiosService.get(`${i18nUrl}`);
  const i18nResources: II18nResource[] = [];
  for (const lng in data) {
    const resource = data[lng];
    i18nResources.push({
      lng,
      resource,
    } as II18nResource);
  }
  return i18nResources;
  // let i18nResources: any = {};
  // for (const lng in data) {
  //   const resource = data[lng];
  //   i18nResources[lng] = {
  //     'translation': resource,
  //   };
  // }
  // return i18nResources;
}

export {
  getI18nResources
}

