const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error ${res.status}`);
};

export const getWeather = ({ latitude, longitude }, weatherAPIKey) => {
  return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${weatherAPIKey}
`).then(checkResponse);
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  result.type = getWeatherType(result.temp.F);

  return result;
};

const getWeatherType = (temperature) => {
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
