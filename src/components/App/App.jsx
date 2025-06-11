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
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import { getItems, addCard, deleteCard } from "../../utils/clothingApi";
import { register, authorize, checkToken } from "../../utils/auth";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: "", C: "" },
    type: "",
    isDay: true,
    condition: "",
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

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

  const switchModal = (target) => {
    setActiveModal(target);
  };

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("jwt");
    const newItem = { name, imageUrl, weather };
    addCard(newItem, token)
      .then((savedItem) => {
        setClothingItems((prevItems) => [savedItem, ...prevItems]);
        closeModal();
      })
      .catch((err) => console.error("Error adding item: ", err));
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    register({ name, avatar, email, password })
      .then((res) => {
        console.log("Registration successful:", res);
        closeModal();
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setIsLoggedIn(true);

          return checkToken(res.token).then((userData) => {
            setCurrentUser(userData);
            closeModal();
          });
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleCardDelete = (id) => {
    const token = localStorage.getItem("jwt");
    deleteCard(id, token)
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

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setCurrentUser(userData);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          setIsLoggedIn(false);
          localStorage.removeItem("jwt");
        })
        .finally(() => setIsAuthChecked(true));
    } else {
      setIsAuthChecked(true);
    }
  }, []);

  if (!isAuthChecked) {
    return <div className="loader">Loading...</div>;
  }

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
                <ProtectedRoute
                  element={Profile}
                  isLoggedIn={isLoggedIn}
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
        <RegisterModal
          activeModal={activeModal}
          closeModal={closeModal}
          onRegister={handleRegister}
          switchModal={switchModal}
        />
        <LoginModal
          activeModal={activeModal}
          closeModal={closeModal}
          onLogin={handleLogin}
          switchModal={switchModal}
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
