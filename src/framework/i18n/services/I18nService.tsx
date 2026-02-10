import axiosService from '../../axios/services/axiosService';
import { II18nResource } from '../models';
import { appConfig } from '../../config/appConfig';

// for typescript, "import './i18n';" will be ok.
// xxxxx - typescript is required to wrap a function to call in index.tsx
// const initI18n = () => {
  const i18nUrl: string =
  (appConfig.API_PATH_WEB_PREFIX as string) +
  (appConfig.API_PATH_V1_PUBLIC as string) +
  // (appConfig.API_PATH_I18N_LANG as string)
  (appConfig.API_PATH_I18N_ALL as string)
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

