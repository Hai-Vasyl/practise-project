export const getParamQuery = (key) => {
  const urlParams = new URLSearchParams(location.search);
  return urlParams.get(key);
};
