import { checkResponse } from "./constants";

const baseUrl = "http://localhost:3001";
const request = (baseUrl, options) => {
  return fetch(baseUrl, options).then(checkResponse);
};

function getItems() {
  return request(`${baseUrl}/items`);
}

const ClothingData = (data) => {
  return data.map((item) => ({
    _id: item._id,
    name: item.name,
    weather: item.weather,
    imageUrl: item.imageUrl,
  }));
};

const addCard = ({ name, weather, imageUrl }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, weather, imageUrl }),
  });
};

const deleteCard = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).catch(console.error);
};

export { getItems, ClothingData, addCard, deleteCard };
