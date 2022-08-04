const baseUrl = "http://localhost:3030/data/boats";

export const getAll = () => {
  return fetch(baseUrl).then((res) => res.json());
};

export const getOne = (boatId) => {
  return fetch(`${baseUrl}/${boatId}`).then((res) => res.json());
};

export const create = (boatData, accessToken) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify({ ...boatData }),
  }).then((res) => res.json());
};

export const edit = (boatData, boatId, accessToken) => {
  return fetch(`${baseUrl}/${boatId}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      "X-Authorization": accessToken,
    },
    body: JSON.stringify({ ...boatData }),
  }).then((res) => res.json());
};

export const del = (boatId, accessToken) => {
  return fetch(`${baseUrl}/${boatId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      "X-Authorization": accessToken,
    },
  }).then((res) => res.json());
};
