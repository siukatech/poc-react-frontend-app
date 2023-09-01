import { parseDateToUtc } from '../../utils/date';
import { deepMergeObject } from '../../utils/object';



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
    } catch (err) {
      console.log('lib/api - marshallDateStr2DateObj - err: [' + err + ']');
    }
  });
  return dataObj;
};


///////////////////////////////////////////////////////////////////////////////


const preDataObjProcessor = (reqConfig) => {
  return reqConfig;
}


///////////////////////////////////////////////////////////////////////////////

const postDataRetProcessor = (dataRet, reqConfig) => {
  if (Array.isArray(dataRet)) {
    return postDataArrayProcessor(dataRet, reqConfig);
  } else if (typeof dataRet === 'string') {
    return postDataStringProcessor(dataRet, reqConfig);
  } else {
    return postDataObjProcessor(dataRet, reqConfig);
  }
};

const postDataArrayProcessor = (dataRet, reqConfig) => {
  const loadedList = [];
  for (const key in dataRet) {
    const dataObj = {
      id: key,
      ...dataRet[key],
    };
    loadedList.push(marshellDataObj(dataObj));
  }
  return loadedList;
};

const postDataStringProcessor = (dataRet, reqConfig) => {
  return dataRet;
};

const postDataObjProcessor = (dataRet, reqConfig) => {
  const loadedObj = marshellDataObj({ ...dataRet });
  return loadedObj;
};


export { preDataObjProcessor, postDataRetProcessor };

