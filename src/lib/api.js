//import { zonedTimeToUtc } from 'date-fns-tz';
import { parseDateToUtc } from '../utils/date';
import { deepMergeObject } from '../utils/object';

import { JSEncrypt } from 'jsencrypt';
//import JSEncrypt from 'encryptlong';
import CryptoJS from 'crypto-js';

import Randomstring from 'randomstring';


// const DUMMY_TOKEN =
//   // 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItZmdJcFNuZFBCQnRpUjNJdHhtYWJvNFlCYlhOWnFRWkNsNmwwQjF5SjRZIn0.eyJleHAiOjE2ODgzMTE4NjEsImlhdCI6MTY4ODI3NTg2MSwiYXV0aF90aW1lIjoxNjg4Mjc1ODYxLCJqdGkiOiIxNDEyOTIxOC0wMGM5LTQ2MTktYjhmNy0yNDM0ZWI1YzQ1YTYiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjM4MTgwL3JlYWxtcy9yZWFjdC1iYWNrZW5kLXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjdlNmU5M2MzLTUxNmYtNGY4OS04OTRhLTJiZDM4YThiYmUzNyIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlYWN0LWJhY2tlbmQtY2xpZW50LTAxIiwic2Vzc2lvbl9zdGF0ZSI6IjhiZThiMjE1LWQ5ZTQtNDVjOC1hMWMyLWE5Y2FlNGU3NzJjZiIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1yZWFjdC1iYWNrZW5kLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjhiZThiMjE1LWQ5ZTQtNDVjOC1hMWMyLWE5Y2FlNGU3NzJjZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYXBwLXVzZXItMDEiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIifQ.Tea4QCKVLMvnpnhVa8-va0u2hPc4DcG1YNwBtRRBGlegAer_dlDnziRkGk99ocO_mQ2lYQc4zSi882KzJrOJQZ4w7JtWOJAzNxihHHJqFHw1A0VyCFzMJ2BSvjlQUt51YKuxM2fbv3FgvHdZBNoLevIV2KQP6CDQm8QiWvoNkUMrMWYa5ZzNPgpXUCoC5bl8EcAxdRZwSLceSDsp5-DKKkYNbqlQ6JfakVDWbVDoO9ZBvfHq8qUr1FN7JVllb2hoZsYfaaJMkJdHgICuCu7-CiJw3vrCmngHIe6GGkIHzNsCYZQjda04JfJQsXvvcmGssO9yJj_alQPcPMy132v3ig'
//   'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItZmdJcFNuZFBCQnRpUjNJdHhtYWJvNFlCYlhOWnFRWkNsNmwwQjF5SjRZIn0.eyJleHAiOjE2ODgzODMyNTQsImlhdCI6MTY4ODM0NzI1NSwiYXV0aF90aW1lIjoxNjg4MzQ3MjU1LCJqdGkiOiI1MzRmYzI4Mi03OTE4LTQzZmYtYWRmMC1kNTRiNTBmNjg5YzkiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjM4MTgwL3JlYWxtcy9yZWFjdC1iYWNrZW5kLXJlYWxtIiwiYXVkIjoiYWNjb3VudCIsInN1YiI6IjdlNmU5M2MzLTUxNmYtNGY4OS04OTRhLTJiZDM4YThiYmUzNyIsInR5cCI6IkJlYXJlciIsImF6cCI6InJlYWN0LWJhY2tlbmQtY2xpZW50LTAxIiwic2Vzc2lvbl9zdGF0ZSI6IjlmYTFmNTMzLTU0YTctNGRmNy1iNmM4LWJiZmIzODdiOTg3ZCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1yZWFjdC1iYWNrZW5kLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQiOnsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoicHJvZmlsZSBlbWFpbCIsInNpZCI6IjlmYTFmNTMzLTU0YTctNGRmNy1iNmM4LWJiZmIzODdiOTg3ZCIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoiYXBwLXVzZXItMDEiLCJnaXZlbl9uYW1lIjoiIiwiZmFtaWx5X25hbWUiOiIifQ.ZIIninXy5gwOHegbSvIg3TaRRPw_7g3geiYDYLljndICOqz-j7G_oDH76RmtK11BdhZUBzYHs96-acXlrQzslswXu79WVxFVBVJaUacWMOjZwdBFli3FJOSNZblmKBUAvgEGVGdTxB-HSHm94mbXb6bbsrEBifpR2uVfHgqiZUizrWwhu4F7NySj5Olg4XnW5iNR2YR7AUBzqCPZHy5r8EMmKI-xYp8kWtKGpNYlv7l7322N_VcTNK_8WjSqxwMr7Oo0bWMhgKfx5B_5GRYicfNGl55-HWFcQ8p0rFnm0jiwFPx9Q_-3slGKU9OejlgDDnZPV0mf0937VtZ5IrM77A'
//   ;

///////////////////////////////////////////////////////////////////////////////

const marshellDataObj = (dataObj) => {
  dataObj = marshallDateStr2DateObj(dataObj);
  return dataObj;
};

const marshallDateStr2DateObj = (dataObj) => {
  let keyList = [];
  let valueList = [];
  for (const key in dataObj) {
    if (
      key.toLocaleLowerCase().indexOf('date') >= 0 ||
      key.toLocaleLowerCase().indexOf('datetime') >= 0
    ) {
      keyList.push(key);
      valueList.push(dataObj[key]);
    }
  }
  keyList.forEach((key, i) => {
    try {
      let value = dataObj[key] == null ? null : parseDateToUtc(dataObj[key]);
      dataObj[key + '-org'] = dataObj[key];
      dataObj[key] = value;
    } catch (e) {
      console.log('lib/api - marshallDateStr2DateObj - e: [' + e + ']');
    }
  });
  return dataObj;
};

///////////////////////////////////////////////////////////////////////////////

function postDataArrayProcessor(dataRet, httpOptions) {
  const loadedList = [];
  for (const key in dataRet) {
    const dataObj = {
      id: key,
      ...dataRet[key],
    };
    loadedList.push(marshellDataObj(dataObj));
  }
  return loadedList;
}

function postDataObjProcessor(dataRet, httpOptions) {
  const loadedObj = marshellDataObj({ ...dataRet });
  return loadedObj;
}

function postDataStringProcessor(dataRet, httpOptions) {
  return dataRet;
}

function postDataRetProcessor(dataRet, httpOptions) {
  if (Array.isArray(dataRet)) {
    return postDataArrayProcessor(dataRet, httpOptions);
  } else if (typeof dataRet === 'string') {
    return postDataStringProcessor(dataRet, httpOptions);
  } else {
    return postDataObjProcessor(dataRet, httpOptions);
  }
}

function preHttpDataProcessor(dataObj, httpOptions) {}

function postPublicDataArrayProcessor(dataRet, httpOptions) {
  return httpOptions.postDataArrayProcessor(dataRet, httpOptions);
}

function postPublicDataObjProcessor(dataRet, httpOptions) {
  return httpOptions.postDataObjProcessor(dataRet, httpOptions);
}

function postEncryptedDataRetProcessor(dataRet, httpOptions) {
  console.log('postEncryptedDataRetProcessor - start');
  console.log('postEncryptedDataRetProcessor - dataRet: [' + dataRet + ']');
  const cipherInfo = httpOptions['cipherInfo'];
  if (cipherInfo != null) {
    // const encryptedData = {
    //   ct: dataRet,
    //   iv: cipherInfo.iv,
    //   s: cipherInfo.salt,
    // }
    // const encryptedRsaDataStr = dataRet;
    // const publicKeyBase64 = sessionStorage.getItem('publicKeyBase64');
    // const encoder = new JSEncrypt();
    // //encoder.setPublicKey(publicKeyBase64);
    // encoder.setPrivateKey(publicKeyBase64);
    // const decryptedDataBase64 = encoder.decrypt(encryptedRsaDataStr);
    const decryptedDataBase64 = dataRet;

    // Reference
    // https://github.com/kyungw00k/encrypt-something-in-java-and-decrypt-it-in-javascript-by-example
    const encryptedAesData = CryptoJS.enc.Base64.parse(decryptedDataBase64);
    const decodedKey = CryptoJS.enc.Base64.parse(cipherInfo.key);
    const decodedKeyStr = decodedKey.toString(CryptoJS.format.Utf8);
    const decodedIv = CryptoJS.enc.Base64.parse(cipherInfo.iv);
    const decryptedData = CryptoJS.AES.decrypt(
      { ciphertext: encryptedAesData },
      decodedKey,
      {
        // mode: CryptoJS.mode.ECB,
        mode: CryptoJS.mode.CBC,
        iv: decodedIv,
      }
    );
    const dataStr = decryptedData.toString(CryptoJS.enc.Utf8);
    // console.log(
    //   'requestPublicRecord - dataRet: [' +
    //     dataRet +
    //     '], cipherInfo: [' +
    //     JSON.stringify(cipherInfo) +
    //     '], decryptedData: [' +
    //     decryptedData +
    //     '], dataStr: [' +
    //     dataStr +
    //     ']'
    // );
    dataRet = JSON.parse(dataStr);
  } else {
    //dataRet = dataRet;
  }
  console.log('postEncryptedDataRetProcessor - end');
  return postDataRetProcessor(dataRet, httpOptions);
}

function preEncryptedHttpDataProcessor(dataObj, httpOptions) {
  return preHttpDataProcessor(dataObj, httpOptions);
}

///////////////////////////////////////////////////////////////////////////////

const getHttpOptions = (httpOptions) => {
  // const retOptions = {
  //   ...httpOptions,
  // };
  // httpOptions.headers = httpOptions.headers ? httpOptions.headers : {};
  // httpOptions.headers['Content-Type'] = 'application/json';
  const retOptions = deepMergeObject(
    {
      headers: {
        'Content-Type': 'application/json',
      },
      postDataRetProcessor: postDataRetProcessor,
      preHttpDataProcessor: preHttpDataProcessor,
    },
    httpOptions
  );
  return retOptions;
};

async function requestHttpData(apiUrl, dataObj, httpOptions) {
  //  let outputObj = deepMergeObject(targetObj, sourceObj);
  // let retOptions = {
  //   //    method: httpMethod
  //   // body: JSON.stringify(dataObj),
  //   // headers: {
  //   //   'Content-Type': 'application/json',
  //   // },
  //   ...httpOptions,
  // };
  // retOptions.headers = retOptions.headers ? retOptions.headers : {};
  // retOptions.headers['Content-Type'] = 'application/json';
  if (dataObj != null && httpOptions.body == null) {
    httpOptions.body = JSON.stringify(dataObj);
  }
  let retOptions = getHttpOptions(httpOptions);
  let response = null;
  try {
    response = await fetch(apiUrl, retOptions);
  } catch (e) {
    console.log(
      'api - fetch(apiUrl) - apiUrl: [' + apiUrl + '], e: [' + e + ']'
    );
    // window.location.href = '/redirect';
  }
  //  const dataRet = await response.json();
  let dataRet = null;
  dataRet = await response?.text();
  // dataRet = await response.json();
  if (dataRet != null) {
    try {
      dataRet = JSON.parse(dataRet);
    } catch (e) {
      console.log('api - JSON.parse(dataRet) - e: [' + e.message + ']');
    }
  }
  console.log('api - dataRet: [' + dataRet + '], response: [' + (response?.ok) + ']');
  let loadedObj = null;
  // try {
  //   //dataRet = await response.json();
  //   const cipherInfo = httpOptions['cipherInfo'];
  //   if (cipherInfo != null) {
  //     // const encryptedData = {
  //     //   ct: dataRet,
  //     //   iv: cipherInfo.iv,
  //     //   s: cipherInfo.salt,
  //     // }
  //     // const encryptedRsaDataStr = dataRet;
  //     // const publicKeyBase64 = sessionStorage.getItem('publicKeyBase64');
  //     // const encoder = new JSEncrypt();
  //     // //encoder.setPublicKey(publicKeyBase64);
  //     // encoder.setPrivateKey(publicKeyBase64);
  //     // const decryptedDataBase64 = encoder.decrypt(encryptedRsaDataStr);
  //     const decryptedDataBase64 = dataRet;

  //     // Reference
  //     // https://github.com/kyungw00k/encrypt-something-in-java-and-decrypt-it-in-javascript-by-example
  //     const encryptedAesEcbData =
  //       CryptoJS.enc.Base64.parse(decryptedDataBase64);
  //     const decodedKey = CryptoJS.enc.Base64.parse(cipherInfo.key);
  //     const decodedKeyStr = decodedKey.toString(CryptoJS.format.Utf8);
  //     const decodedIv = CryptoJS.enc.Base64.parse(cipherInfo.iv);
  //     const decryptedData = CryptoJS.AES.decrypt(
  //       { ciphertext: encryptedAesEcbData },
  //       decodedKey,
  //       {
  //         //iv: decodedIv,
  //         mode: CryptoJS.mode.ECB,
  //       }
  //     );
  //     const dataStr = decryptedData.toString(CryptoJS.enc.Utf8);
  //     console.log(
  //       'requestPublicRecord - dataRet: [' +
  //         dataRet +
  //         '], cipherInfo: [' +
  //         JSON.stringify(cipherInfo) +
  //         '], decryptedData: [' +
  //         decryptedData +
  //         '], dataStr: [' +
  //         dataStr +
  //         ']'
  //     );
  //     dataRet = JSON.parse(dataStr);
  //   } else {
  //     //dataRet = dataRet;
  //   }
  //   loadedObj = marshellDataObj({ ...dataRet });
  // } catch (e) {
  //   console.log('api - requestRecord - e: [' + e + ']');
  //   loadedObj = dataRet;
  // }
  if (dataRet != null) {
    loadedObj = retOptions.postDataRetProcessor(dataRet, retOptions);
  }
  if (!response?.ok) {
    const errorObj = {
      ...loadedObj,
      message: dataRet?.message || 'Could not ' + retOptions.method + ' data',
      statusCode: response?.status,
      statusText: response?.statusText,
    };
    console.log('api - error: [' + JSON.stringify(errorObj) + ']');
    throw new Error(
      // dataRet.message || 'Could not ' + retOptions.method + ' data'
      JSON.stringify(errorObj)
    );
  }
  //  return marshellDataObj({ ...dataRet });
  return loadedObj;
}

///////////////////////////////////////////////////////////////////////////////

async function requestPublicRecord(apiUrl, dataObj, httpOptions) {
  return requestHttpData(apiUrl, null, httpOptions);
}

export async function getPublicList(apiUrl) {
  // const retOptions = getHttpOptions(httpOptions);
  // const response = await fetch(apiUrl, retOptions);
  // const dataRet = await response.json();
  // if (!response.ok) {
  //   throw new Error(dataRet.message || 'Could not fetch all data');
  // }
  // const loadedList = [];
  // for (const key in dataRet) {
  //   const dataObj = {
  //     id: key,
  //     ...dataRet[key],
  //   };
  //   loadedList.push(marshellDataObj(dataObj));
  // }
  // return loadedList;
  return requestPublicRecord(apiUrl, null, { method: 'POST' });
}

export async function getPublicRecord(apiUrl) {
  // const response = await fetch(apiUrl, getHttpOptions(httpOptions));
  // const dataRet = await response.json();
  // if (!response.ok) {
  //   throw new Error(dataRet.message || 'Could not fetch single data');
  // }
  // const dataObj = {
  //   //id: toyId,
  //   ...dataRet,
  // };
  // return marshellDataObj(dataObj);
  return requestPublicRecord(apiUrl, null, { method: 'POST' });
}

export async function postPublicRecord(apiUrl, dataObj) {
  return requestPublicRecord(apiUrl, dataObj, { method: 'POST' });
}

export async function putPublicRecord(apiUrl, dataObj) {
  return requestPublicRecord(apiUrl, dataObj, { method: 'PUT' });
}

export async function deletePublicRecord(apiUrl) {
  return requestPublicRecord(apiUrl, null, { method: 'DELETE' });
}

///////////////////////////////////////////////////////////////////////////////

export async function requestProtectedRecord(apiUrl, dataObj, httpOptions) {
  // let retOptions = {
  //   ...httpOptions,
  // };
  // retOptions.headers = retOptions.headers ? retOptions.headers : {};
  // retOptions.headers['Authorization'] = 'Bearer ' + DUMMY_TOKEN;
  const retOptions = deepMergeObject(
    {
      headers: {
        // Authorization: 'Bearer ' + DUMMY_TOKEN,
        Authorization: 'Bearer ' + sessionStorage.getItem('access_token'),
      },
    },
    httpOptions
  );
  return requestHttpData(apiUrl, dataObj, retOptions);
}

export async function getProtectedList(
  apiUrl
  // , httpOptions = { method: 'GET' }
) {
  // let options = {
  //   ...httpOptions,
  // };
  // options.headers = options.headers ? options.headers : {};
  // options.headers['Authorization'] = 'Bearer ' + DUMMY_TOKEN;
  return requestProtectedRecord(
    apiUrl,
    null,
    // , httpOptions
    { method: 'GET' }
  );
}

export async function getProtectedRecord(
  apiUrl
  // , httpOptions = { method: 'GET' }
) {
  return requestProtectedRecord(
    apiUrl,
    null,
    // , httpOptions
    { method: 'GET' }
  );
}

export async function postProtectedRecord(apiUrl, dataObj) {
  return requestProtectedRecord(apiUrl, dataObj, { method: 'POST' });
}

export async function putProtectedRecord(apiUrl, dataObj) {
  return requestProtectedRecord(apiUrl, dataObj, { method: 'PUT' });
}

export async function deleteProtectedRecord(apiUrl) {
  return requestProtectedRecord(apiUrl, null, { method: 'DELETE' });
}

///////////////////////////////////////////////////////////////////////////////

export async function requestEncryptedRecord(apiUrl, dataObj, httpOptions) {
  const dataObjStr = dataObj == null ? '' : JSON.stringify(dataObj);
  const publicKeyBase64 = sessionStorage.getItem('publicKeyBase64');
  const randomstring = Randomstring.generate();
  const aesKeyHash = CryptoJS.SHA3(randomstring, { outputLength: 512 }); // should be something in memory
  const aesKeyBase64 = aesKeyHash.toString(CryptoJS.enc.Base64);
  const encoder = new JSEncrypt();
  encoder.setPublicKey(publicKeyBase64);
  const cipherDataParams = CryptoJS.AES.encrypt(dataObjStr, aesKeyBase64);
  // const decryptedTest1 = CryptoJS.AES.decrypt(cipherDataParams, aesKeyBase64);
  // const decryptedTest1Str = decryptedTest1.toString(CryptoJS.enc.Utf8);
  // const decryptedTest2 = CryptoJS.AES.decrypt(
  //   { cipherText: cipherDataParams.ciphertext },
  //   aesKeyBase64,
  //   { mode: CryptoJS.mode.ECB }
  // );
  // const decryptedTest2Str = decryptedTest2.toString(CryptoJS.enc.Utf8);
  const cipherInfo = {
    key: cipherDataParams.key.toString(CryptoJS.enc.Base64),
    iv: cipherDataParams.iv.toString(CryptoJS.enc.Base64),
    salt: cipherDataParams.salt.toString(CryptoJS.enc.Base64),
  };
  // const cipherInfoStr = JSON.stringify({
  //   cipher: dataObj == null ? null : cipherDataParams.ciphertext.toString(CryptoJS.enc.Base64),
  //   //key: encryptedAesKey,
  //   // key: cipherDataParams.key.toString(CryptoJS.enc.Base64),
  //   // iv: cipherDataParams.iv.toString(CryptoJS.enc.Base64)
  //   info: cipherInfo,
  // });
  const cipherInfoStr = JSON.stringify(cipherInfo);
  // cipherInfo['rawKey'] = cipherDataParams.key;
  // httpOptions['cipherInfo'] = cipherInfo;

  // console.log(
  //   'requestEncryptedRecord - publicKeyBase64: [' +
  //     publicKeyBase64 +
  //     '], aesKeyBase64: [' +
  //     aesKeyBase64 +
  //     '], dataObjStr: [' +
  //     dataObjStr +
  //     '], cipherInfoStr: [' +
  //     cipherInfoStr +
  //     // '], decryptedTest1Str: [' +
  //     // decryptedTest1Str +
  //     // '], decryptedTest2Str: [' +
  //     // decryptedTest2Str +
  //     '], cipherDataParams.mode: [' +
  //     cipherDataParams.mode.toString(CryptoJS.enc.Utf8) +
  //     ']'
  // );
  // 'false' will be returned if content is too long
  //https://juejin.cn/post/7193614810548797495
  // encryptedBody = encoder.encrypt(cipherInfoStr);
  // //encryptedBody = encoder.encryptLong(cipherInfoStr);
  const cipherInfoRsa = encoder.encrypt(cipherInfoStr);
  let cipherSeparator = '';
  // cipherSeparator = '|||';
  const encryptedData =
    dataObj == null
      ? ''
      : cipherDataParams.ciphertext.toString(CryptoJS.enc.Base64);
  const encryptedBodyRaw = cipherInfoRsa + cipherSeparator + encryptedData;
  const encryptedHeaderRaw = cipherInfoRsa + cipherSeparator;
  // Wa = WordArray
  const encryptedBodyWa = CryptoJS.enc.Utf8.parse(encryptedBodyRaw);
  const encryptedHeaderWa = CryptoJS.enc.Utf8.parse(encryptedHeaderRaw);
  const encryptedBody = CryptoJS.enc.Base64.stringify(encryptedBodyWa);
  const encryptedHeader = CryptoJS.enc.Base64.stringify(encryptedHeaderWa);

  console.log(
    'requestEncryptedRecord - cipherInfoRsa.length: [' +
      cipherInfoRsa.length +
      '], cipherInfoRsa: [' +
      cipherInfoRsa +
      '], encryptedData: [' +
      encryptedData +
      ']'
  );

  // let retOptions = {
  //   ...httpOptions,
  //   body: encryptedBody,
  // };
  // retOptions.headers = retOptions.headers ? retOptions.headers : {};
  // retOptions.headers['Authorization'] = 'Bearer ' + DUMMY_TOKEN;
  const retOptions = deepMergeObject(
    {
      body: dataObj == null ? null : encryptedBody,
      headers: {
        'X-DATA-ENC-INFO': encryptedHeader,
      },
      cipherInfo: cipherInfo,
      postDataRetProcessor: postEncryptedDataRetProcessor,
      preHttpDataProcessor: preEncryptedHttpDataProcessor,
    },
    httpOptions
  );
  return requestProtectedRecord(apiUrl, null, retOptions);
}

export async function getEncryptedList(apiUrl) {
  return requestEncryptedRecord(apiUrl, null, { method: 'GET' });
}

export async function getEncryptedRecord(apiUrl) {
  return requestEncryptedRecord(apiUrl, null, { method: 'GET' });
}

export async function postEncryptedRecord(apiUrl, dataObj) {
  return requestEncryptedRecord(apiUrl, dataObj, { method: 'POST' });
}

export async function putEncryptedRecord(apiUrl, dataObj) {
  return requestEncryptedRecord(apiUrl, dataObj, { method: 'PUT' });
}

export async function deleteEncryptedRecord(apiUrl) {
  return requestEncryptedRecord(apiUrl, null, { method: 'DELETE' });
}
