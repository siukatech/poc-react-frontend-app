import { deepMergeObject } from '../../utils/object';

import { JSEncrypt } from 'jsencrypt';
//import JSEncrypt from 'encryptlong';
import CryptoJS from 'crypto-js';
import Randomstring from 'randomstring';

import { preProtectedDataObjProcessor, postProtectedDataRetProcessor } from './processor-protected';


const preEncryptedDataObjProcessor = (reqConfig) => {
  //
  reqConfig = preProtectedDataObjProcessor(reqConfig);
  //
  if (reqConfig.url.indexOf(process.env.REACT_APP_API_V1_ENCRYPTED_URI) >= 0) {
    reqConfig.processors = deepMergeObject(
      reqConfig.processors, 
      {
        postDataRetProcessor: postEncryptedDataRetProcessor,
      },
    );

    const dataObj = reqConfig.data;
    const dataObjStr = dataObj == null ? '' : JSON.stringify(dataObj);
    const userStr = sessionStorage.getItem('user');
    const user = JSON.parse(userStr);
    const publicKeyBase64 = user.publicKey;
    const randomstring = Randomstring.generate();
    const aesKeyHash = CryptoJS.SHA3(randomstring, { outputLength: 512 }); // should be something in memory
    const aesKeyBase64 = aesKeyHash.toString(CryptoJS.enc.Base64);
    const encoder = new JSEncrypt();
    encoder.setPublicKey(publicKeyBase64);
    const cipherDataParams = CryptoJS.AES.encrypt(dataObjStr, aesKeyBase64);
    const cipherInfo = {
      key: cipherDataParams.key.toString(CryptoJS.enc.Base64),
      iv: cipherDataParams.iv.toString(CryptoJS.enc.Base64),
      salt: cipherDataParams.salt.toString(CryptoJS.enc.Base64),
    };
    const cipherInfoStr = JSON.stringify(cipherInfo);
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
      'preEncryptedDataObjProcessor - cipherInfoRsa.length: [' +
        cipherInfoRsa.length +
        '], cipherInfoRsa: [' +
        cipherInfoRsa +
        '], encryptedData: [' +
        encryptedData +
        ']'
    );
  
    // const reqConfig = deepMergeObject(
    //   {
    //     data: dataObj == null ? null : encryptedBody,
    //     headers: {
    //       'X-DATA-ENC-INFO': encryptedHeader,
    //     },
    //     cipherInfo: cipherInfo,
    //   },
    //   reqConfig
    // );
    reqConfig.data = dataObj == null ? null : encryptedBody;
    reqConfig.headers['X-DATA-ENC-INFO'] = encryptedHeader;
    reqConfig.cipherInfo = cipherInfo;
  }
  return reqConfig;
};



const postEncryptedDataRetProcessor = (dataRet, reqConfig) => {
  console.log('postEncryptedDataRetProcessor - start');
  console.log('postEncryptedDataRetProcessor - dataRet: [' + dataRet + ']');
  const cipherInfo = reqConfig['cipherInfo'];
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
  return postProtectedDataRetProcessor(dataRet, reqConfig);
}


export { preEncryptedDataObjProcessor, postEncryptedDataRetProcessor };

