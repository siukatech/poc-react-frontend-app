const restoreJsonStr = (storageKey: string) => {
  const jsonStr = sessionStorage.getItem(storageKey);
  if (jsonStr) {
    let jsonObj = JSON.parse(jsonStr);
    return jsonObj;
  }
  return null;
};

const saveJsonObj = (storageKey: string, jsonObj: {}) => {
  if (jsonObj != null) {
    sessionStorage.setItem(storageKey, JSON.stringify(jsonObj));
  }
};

export { restoreJsonStr, saveJsonObj };
