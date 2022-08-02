const baseUrl = "http://localhost:3030";

export const getAll = () => {
  return fetch(`${baseUrl}/data/boats`).then((res) => res.json());
};
