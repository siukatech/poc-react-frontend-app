import { uuidv4 } from 'uuidv7';
import { AxiosError, AxiosProgressEvent } from 'axios';
import axiosService from '../../../frameworks/axios/services/axios-service';
import { IAttachmentObj } from '../models';
import { at, bind } from 'lodash';

const API_DOMAIN: string = process.env.REACT_APP_API_PATH_PREFIX as string;
const API_UPLOAD: string =
  (API_DOMAIN as string) +
  (process.env.REACT_APP_API_PATH_V1_PROTECTED as string) +
  (process.env.REACT_APP_API_PATH_ATTACHMENT_UPLOAD as string) +
  '';
const API_DETAIL: string =
  (API_DOMAIN as string) +
  (process.env.REACT_APP_API_PATH_V1_PROTECTED as string) +
  (process.env.REACT_APP_API_PATH_ATTACHMENT_DETAIL as string) +
  '';
const API_DOWNLOAD: string =
  (API_DOMAIN as string) +
  // (process.env.REACT_APP_API_PATH_V1_PROTECTED as string) +
  (process.env.REACT_APP_API_PATH_V1_PUBLIC as string) +
  (process.env.REACT_APP_API_PATH_ATTACHMENT_DOWNLOAD as string) +
  '';
const API_DELETE: string =
  (API_DOMAIN as string) +
  (process.env.REACT_APP_API_PATH_V1_PROTECTED as string) +
  (process.env.REACT_APP_API_PATH_ATTACHMENT_DELETE as string) +
  '';

let FILE_UPLOAD_MAP: any = {};

const uploadAttachmentObj = async (
  formData: FormData,
  total: number,
  pending: number
): Promise<any> => {
  const handleUploadProgress = (evt: AxiosProgressEvent) => {
    // const percentageEvt = Math.round(100 / evt.loaded / (evt?.total || 1));
    // console.debug(
    //   `AttachmentService - uploadAttachmentObj - handleUploadProgress - evt.loaded: [${evt.loaded}]` +
    //     `, evt?.total: [${evt?.total}], percentageEvt: [${percentageEvt}]`
    // );
    const completed = total - pending;
    // const percentageExt = Math.round(100 / pending / total || 1);
    const percentageExt = Math.round((completed / total) * 100);
    // console.debug(
    //   `AttachmentService - uploadAttachmentObj - handleUploadProgress - pending: [${pending}]` +
    //     `, completed: [${completed}], total: [${total}], pencentage: [${percentageExt}]`
    // );
  };
  try {
    const response = await axiosService.post(`${API_UPLOAD}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        // mode: 'cors',
      },
      onUploadProgress: handleUploadProgress,
    });
    if (response instanceof AxiosError) {
      const err = response;
      if (err.response?.data) {
        throw new Error(JSON.stringify(err.response?.data));
      } else throw response;
    }
    return response.data;
  } catch (err) {
    throw err;
  }
};

/**
 * Reference:
 * https://www.bezkoder.com/axios-file-upload/
 * https://youtu.be/YOGgaYUW1OA?t=320
 *
 * @param attachmentObjList
 * @returns
 */
const uploadAttachmentObjList = async (attachmentObjList: IAttachmentObj[]) => {
  const readyToUploadList = attachmentObjList.filter(
    (uploadAttachmentObj) =>
      uploadAttachmentObj.targetFile != null && !uploadAttachmentObj.isUploaded
  );
  const total = readyToUploadList.length;
  let pending = total;
  // console.debug(
  //   `AttachmentService - uploadAttachmentObjList - total: [${total}]` +
  //     `, pending: [${pending}], readyToUploadList: `,
  //   readyToUploadList
  // );
  // Here uses attachmentObjList to resolve the full list
  const updatedList: IAttachmentObj[] = [];
  for (let ccc = 0; ccc < attachmentObjList.length; ccc++) {
    const attachmentObj = attachmentObjList[ccc];
    // console.debug(
    //   `AttachmentService - uploadAttachmentObjList - ccc: [${ccc}]` +
    //     `, attachmentObj: `,
    //   attachmentObj
    // );
    if (attachmentObj.targetFile && !attachmentObj.isUploaded) {
      let formData: FormData = new FormData();
      formData.append('file', attachmentObj.targetFile);
      formData.append('versionNo', '1');
      try {
        const retData = await uploadAttachmentObj(formData, total, pending);
        if (!retData) {
          throw new Error(`Upload attachment failed`);
        }
        pending--;
        attachmentObj.id = retData.id;
        if (attachmentObj.id) {
          FILE_UPLOAD_MAP[attachmentObj.id.toString()] = attachmentObj;
          // const arrBuf = new Blob([await attachmentObj.targetFile.arrayBuffer()]);
          // FILE_UPLOAD_MAP[attachmentObj.id.toString()] = arrBuf;
        }
        attachmentObj.isUploaded = true;
        attachmentObj.targetFile = undefined;
        updatedList.push(attachmentObj);
      } catch (err) {
        console.error(
          `AttachmentService - uploadAttachmentObjList - err: `,
          err
        );
        pending--;
        attachmentObj.uploadErr = err;
        attachmentObj.isUploaded = true;
        attachmentObj.targetFile = undefined;
        updatedList.push(attachmentObj);
      }
    } else if (attachmentObj.isUploaded) {
      updatedList.push(attachmentObj);
    }
  }
  return updatedList;
};

const getAttachmentObj = async (id: string): Promise<IAttachmentObj> => {
  const apiUrl = API_DETAIL.replaceAll('{0}', id);
  const { data } = await axiosService.get(`${apiUrl}`);
  return data as IAttachmentObj;
};

/**
 * Reference:
 * https://stackoverflow.com/a/31218143
 * https://stackoverflow.com/a/63965930
 * https://gist.github.com/jbutko/d7b992086634a94e84b6a3e526336da3
 *
 * @param attachmentObj
 * @returns
 */
const downloadAttachmentObj = async (
  attachmentObj: IAttachmentObj
): Promise<any> => {
  if (attachmentObj.id) {
    const doDownload = (
      byteArr: ArrayBuffer | Blob,
      attachmentObj: IAttachmentObj
    ) => {
      const blob: Blob = new Blob([byteArr], {
        type: attachmentObj.contentType,
      });
      const a = document.createElement('a');

      const url = URL.createObjectURL(blob);
      // console.debug(
      //   `AttachmentService - downloadAttachmentObj - doDownload - url: [${url}]`
      // );
      function handleClick() {
        setTimeout(() => {
          URL.revokeObjectURL(url);
          /* eslint-disable-next-line no-restricted-globals */
          removeEventListener('click', handleClick);
        }, 150);
      }
      a.href = url;
      a.download = attachmentObj.fileName || 'download-file';
      a.addEventListener('click', handleClick);
      a.click();

      // let reader = new FileReader();
      // reader.readAsDataURL(blob); // converts the blob to base64 and calls onload
      // reader.onload = function () {
      //   if (typeof reader.result === 'string') {
      //     a.href = reader.result; // data url
      //     a.click();
      //   }
      // };
    };
    const apiUrl = API_DOWNLOAD.replaceAll('{0}', attachmentObj.id.toString());
    const response = await axiosService.get(`${apiUrl}`, {
      // headers: {
      //   'Content-Type': 'application/json',
      //   Accept: attachmentObj.contentType,
      // },
      responseType: 'arraybuffer',
      // responseType: 'blob',
    });
    if (response?.data) {
      // console.debug(
      //   `AttachmentService - downloadAttachmentObj - response.data.length: [${response.data.length}], response.data: `,
      //   response.data
      // );
      doDownload(response.data, attachmentObj);
    } else {
      throw new Error(
        `Attachment not found [${attachmentObj?.id?.toString()}]`
      );
    }
    return void 0;
  } else {
    return Promise.reject(attachmentObj);
  }
};

const binaryStrToArrayBuffer = (binaryStr: string) => {
  let byteArr = null;
  // let binaryLen = binaryStr.length;
  // byteArr = new Uint8Array(binaryLen);
  // for (let ccc = 0; ccc < binaryLen; ccc++) {
  //   let ascii = binaryStr.charCodeAt(ccc);
  //   byteArr[ccc] = ascii;
  // }
  byteArr = Uint8Array.from(binaryStr, (c) => c.charCodeAt(0));
  return byteArr;
};

const base64ToArrayBuffer = (base64Str: string) => {
  let byteArr = null;
  let binaryStr = atob(base64Str);
  byteArr = binaryStrToArrayBuffer(binaryStr);
  return byteArr;
};

const entityEncode = (arr: Uint8Array) => {
  return Array.from(arr).map((val) => 'U+' + toHex(val));
};
const toHex = (num: number) => {
  return num.toString(16).padStart(4, '0').toUpperCase();
};

const deleteAttachmentObj = async (
  attachmentObj: IAttachmentObj
): Promise<any> => {
  if (attachmentObj.id) {
    const apiUrl = API_DELETE.replaceAll('{0}', attachmentObj.id?.toString());
    const response = await axiosService.delete(`${apiUrl}`);
    return response;
  } else {
    Promise.reject(attachmentObj);
  }
};

export {
  uploadAttachmentObj,
  uploadAttachmentObjList,
  getAttachmentObj,
  downloadAttachmentObj,
  deleteAttachmentObj,
};
