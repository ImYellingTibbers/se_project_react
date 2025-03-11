import { checkResponse } from "./constants";

const baseUrl = "http://localhost:3001";

function getItems() {
  return fetch(`${baseUrl}/items`).then(checkResponse);
}

const ClothingData = (data) => {
  return data.map((item) => ({
    _id: item._id,
    name: item.name,
    weather: item.weather,
    image: item.imageUrl,
  }));
};

export { getItems, ClothingData };
