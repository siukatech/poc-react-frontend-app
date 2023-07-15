import { render, screen } from '@testing-library/react';
import App from './App';

import CryptoJS from 'crypto-js';


test('renders learn react link', () => {
  // render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test('test_CryptoJs_AES_decrypt_1', () => {

  const keyStr = 'ryS9N3/1H4mrff/73aR+aIIMeazbN5QhZlpVpXDaIvs=';
  const dataStr = 'tNd7OtEmM1DLz5EZvRFqAicwkaJiGNd3B9uZKRWz5a+UtJWjfUzN4nckTTRLBSkSXr292tpP0IEV4MmHxdkAeffd40Bz41A7cGYHFjKl8K97Vlzbv/ob646Z3AqS257fOlohBQDf4A6F35AgwDoy0Z8QpfLyZ4CpEqaGopxkoMtLK/vW8Iazzn82aPf6rnJJaH1gwvMYx3m8Qjurbk4WtA==';
  const key = CryptoJS.enc.Base64.parse(keyStr);
  const data = CryptoJS.enc.Base64.parse(dataStr);
  const decryptedData = CryptoJS.AES.decrypt({ ciphertext: data }, key, { mode: CryptoJS.mode.ECB });
  const decryptedStr = (decryptedData.words===null?'NULL':decryptedData.toString());
  console.log('test_CryptoJs_AES_decrypt_1 - data: [' + data + '], dataStr: [' + dataStr 
  + '], decryptedData: [' + decryptedData 
  + '], decryptedStr: [' + decryptedStr
  + ']');

});

test('test_CryptoJs_AES_decrypt_2', () => {

  const keyStr = 'QUJDREVGR0hJSktMTU5PUA';
  const dataStr = '+KLDqBupgl+Cus1QMBtBpQ==';
  const key = CryptoJS.enc.Base64.parse(keyStr);
  const data = CryptoJS.enc.Base64.parse(dataStr);
  const decryptedData = CryptoJS.AES.decrypt({ ciphertext: data }, key, { mode: CryptoJS.mode.ECB });
  const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  console.log('test_CryptoJs_AES_decrypt_2 - data: [' + data + '], dataStr: [' + dataStr 
  + '], decryptedData: [' + decryptedData 
  + '], decryptedStr: [' + decryptedStr
  + ']');

});

test('test_CryptoJs_AES_decrypt_2_cbc', () => {

  const keyStr = 'QUJDREVGR0hJSktMTU5PUA==';
  const dataStr = 'kSpwo4HBpPbxxEspB1eenw==';
  const ivStr = 'ZO2vTWmBh1/JD76ZO5e53g==';
  const key = CryptoJS.enc.Base64.parse(keyStr);
  const data = CryptoJS.enc.Base64.parse(dataStr);
  const iv = CryptoJS.enc.Base64.parse(ivStr);
  // const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: data, iv: iv });
  // const decryptedData = CryptoJS.AES.decrypt(cipherParams, key, { mode: CryptoJS.mode.CBC });
  // const decryptedData = CryptoJS.AES.decrypt({ ciphertext: data }, key, { mode: CryptoJS.mode.CBC, iv: iv });
  const decryptedData = CryptoJS.AES.decrypt({ ciphertext: data }, key, { iv: iv });
  const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  // const decryptedData = null;
  // const decryptedStr = null;
  console.log('test_CryptoJs_AES_decrypt_2_cbc - data: [' + data + '], dataStr: [' + dataStr 
  + '], iv: [' + iv
  + '], decryptedData: [' + decryptedData 
  + '], decryptedStr: [' + decryptedStr
  + ']');

});

/**
 * Reference
 * https://github.com/diafygi/webcrypto-examples/#aes-gcm---decrypt
 * 
 */
test('test_CryptoJs_AES_decrypt_2_gcm', async () => {

  const keyStr = 'QUJDREVGR0hJSktMTU5PUA==';
  const dataStr = 'hNIvk5gOXt5HiDQatUyzlSNelSsmjYGXF1dCeKxMVA==';
  const ivStr = 'ZO2vTWmBh1/JD76ZO5e53g==';
  const key = CryptoJS.enc.Base64.parse(keyStr);
  const data = CryptoJS.enc.Base64.parse(dataStr);
  const iv = CryptoJS.enc.Base64.parse(ivStr);
  const keyAbf = await fetch("data:application/octet;base64," + keyStr);
  const keyAb = await keyAbf.arrayBuffer();
  // const ivAbf = await fetch("data:application/octet;base64," + keyStr);
  // const ivAb = await keyAbf.arrayBuffer();
  const ivAb = await (await fetch("data:application/octet;base64," + ivStr)).arrayBuffer();

  // const aesGcmKey = await window.crypto.subtle.importKey(
  //   "raw", //can be "jwk" or "raw"
  //   keyAb,
  //   {   //this is the algorithm options
  //       name: "AES-GCM",
  //   },
  //   false, //whether the key is extractable (i.e. can be used in exportKey)
  //   ["decrypt"] //can "encrypt", "decrypt", "wrapKey", or "unwrapKey"
  // );

  // // const cipherParams = CryptoJS.lib.CipherParams.create({ ciphertext: data, iv: iv });
  // // const decryptedData = CryptoJS.AES.decrypt(cipherParams, key, { mode: CryptoJS.mode.CBC });
  // // const decryptedData = CryptoJS.AES.decrypt({ ciphertext: data }, key, { mode: CryptoJS.mode.CBC, iv: iv });
  // const decryptedData = CryptoJS.AES.decrypt({ ciphertext: data }, key, { iv: iv });
  // const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  const decryptedData = null;
  const decryptedStr = null;
  console.log('test_CryptoJs_AES_decrypt_2_gcm - data: [' + data + '], dataStr: [' + dataStr 
  + '], iv: [' + iv
  + '], keyAb.byteLength: [' + keyAb.byteLength
  + '], ivAb.byteLength: [' + ivAb.byteLength
  + '], decryptedData: [' + decryptedData 
  + '], decryptedStr: [' + decryptedStr
  + ']');

});



test('test_CryptoJs_AES_decrypt_3', () => {

  const keyStr = 'axAaqoXFeyDi7x1qotchNcEeOlGZ7cqKt4nZpl4JWCI=';
  const dataStr = 'zXKdWtJsaHUSg7IWk/GaYTbN9/LHILeVc29TmhIkJlNl5C7aYjhTPgsVdNGVAdfnmPIqPYI3UqWT1NxiZKtmNbqEf5D8bpbpkaXWZZwsN/fN0b+eW0x5iIeOxpo108nkAeeUMbm5/qt78Q92g/Mj7zYLLdIC6X58DsXe7xR0bhYgwJzeVuykAjARNhxCvuWHAMwCKOfTgE6Ubgu6jfzX/g==';
  const key = CryptoJS.enc.Base64.parse(keyStr);
  const data = CryptoJS.enc.Base64.parse(dataStr);
  const decryptedData = CryptoJS.AES.decrypt({ ciphertext: data }, key, { mode: CryptoJS.mode.ECB });
  const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  console.log('test_CryptoJs_AES_decrypt_3 - data: [' + data + '], dataStr: [' + dataStr 
  + '], decryptedData: [' + decryptedData 
  + '], decryptedStr: [' + decryptedStr
  + ']');

});

test('test_CryptoJs_AES_decrypt_4', () => {

  const keyStr = 'axAaqoXFeyDi7x1qotchNcEeOlGZ7cqKt4nZpl4JWCI=';
  const dataStr = 'zXKdWtJsaHUSg7IWk/GaYTbN9/LHILeVc29TmhIkJlNl5C7aYjhTPgsVdNGVAdfnmPIqPYI3UqWT1NxiZKtmNbqEf5D8bpbpkaXWZZwsN/fN0b+eW0x5iIeOxpo108nkAeeUMbm5/qt78Q92g/Mj7zYLLdIC6X58DsXe7xR0bhYgwJzeVuykAjARNhxCvuWHAMwCKOfTgE6Ubgu6jfzX/g==';
  const key = CryptoJS.enc.Base64.parse(keyStr);
  const data = CryptoJS.enc.Base64.parse(dataStr);
  const decryptedData = CryptoJS.AES.decrypt({ ciphertext: data }, key, { mode: CryptoJS.mode.ECB });
  const decryptedStr = decryptedData.toString(CryptoJS.enc.Utf8);
  console.log('test_CryptoJs_AES_decrypt_4 - data: [' + data + '], dataStr: [' + dataStr 
  + '], decryptedData: [' + decryptedData 
  + '], decryptedStr: [' + decryptedStr
  + ']');

});

