const baseUrl = "";

export const getAll = () => {
  return fetch(baseUrl).then((res) => res.json());
};
