import { checkResponse, baseUrl } from "./constants";

const request = (url, options) => {
  return fetch(url, options).then(checkResponse);
};

const handleServerResponse = (res) => {
  if (!res.ok) {
    return res.json().then((err) => Promise.reject(err));
  }
  return res.json();
};

function getItems() {
  return request(`${baseUrl}/items`);
}

const addCard = ({ name, weather, imageUrl }, token) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  });
};

const deleteCard = (id, token) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const addCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

const removeCardLike = (id, token) => {
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(handleServerResponse);
};

export { getItems, addCard, deleteCard, addCardLike, removeCardLike };
