import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import { coordinates, weatherAPIKey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addCard, deleteCard } from "../../utils/clothingApi";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 999, C: 888 },
    type: "",
    isDay: true,
    condition: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeModal = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const newItem = { name, imageUrl, weather };
    addCard(newItem)
      .then((savedItem) => {
        setClothingItems((prevItems) => [savedItem, ...prevItems]);
        closeModal();
      })
      .catch((err) => console.error("Error adding item: ", err));
  };

  const handleCardDelete = (id) => {
    deleteCard(id)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== id)
        );
        closeModal();
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  useEffect(() => {
    getWeather(coordinates, weatherAPIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        return setClothingItems(
          data.map((item) => ({
            _id: item._id,
            name: item.name,
            weather: item.weather,
            imageUrl: item.imageUrl,
          }))
        );
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header
            onAddClick={handleAddClick}
            weatherData={weatherData}
            ToggleSwitch={ToggleSwitch}
          />

          <Routes>
            <Route
              path="/se_project_react/"
              element={
                <Main
                  weatherData={weatherData}
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="/se_project_react/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  onAddClick={handleAddClick}
                />
              }
            />
          </Routes>

          <Footer />
        </div>
        <AddItemModal
          activeModal={activeModal}
          closeModal={closeModal}
          onAddItemModalSubmit={handleAddItemModalSubmit}
        />
        <ItemModal
          card={selectedCard}
          closeModal={closeModal}
          isOpen={activeModal === "preview"}
          onCardDelete={handleCardDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
