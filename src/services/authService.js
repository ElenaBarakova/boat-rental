const baseUrl = "http://localhost:3030";

export const login = (email, password) => {
  return fetch(`${baseUrl}/users/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
};

export const logout = async (accessToken) => {
  try {
    const response = await fetch(`${baseUrl}/users/logout`, {
      headers: {
        "X-Authorization": accessToken,
      },
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
