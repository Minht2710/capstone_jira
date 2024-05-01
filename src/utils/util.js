export const getLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const saveLocalStorage = (key, data) => {
  const stringData = JSON.stringify(data);
  return localStorage.setItem(key, stringData);
};
