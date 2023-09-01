import { postDataRetProcessor } from './post-processor-general';

import { JSEncrypt } from 'jsencrypt';
//import JSEncrypt from 'encryptlong';
import CryptoJS from 'crypto-js';

import Randomstring from 'randomstring';


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
  return postDataRetProcessor(dataRet, reqConfig);
}

export { postEncryptedDataRetProcessor };

