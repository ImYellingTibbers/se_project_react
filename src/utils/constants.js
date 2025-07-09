export const currentDay = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});

export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.wtwr.cylone.net"
    : "http://localhost:3001";

export const weatherAPIKey = "9c66aef131d83cd0b2d59b9b148200e7";

export const coordinates = { latitude: 40.233844, longitude: -111.658534 };

export const checkResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error ${res.status}`);
};
