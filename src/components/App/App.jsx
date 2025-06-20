import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import * as api from "../../utils/api";

import "./App.css";
import "../../vendor/fonts.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/currentTemperatureUnitContext";
import { defaultClothingItems } from "../../utils/constants";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import { getItems, addItem, deleteItem, updateUser } from "../../utils/api";
import { login, register, checkToken } from "../../utils/auth";
import CurrentUserContext from "../../contexts/currentUserContext";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

function App() {
  const navigate = useNavigate();

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isEditProfileLoading, setIsEditProfileLoading] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  function handleSubmit(request, onSuccess) {
    setIsLoading(true);
    request()
      .then((result) => {
        if (onSuccess) onSuccess(result);
        closeActiveModal();
      })
      .catch((error) => {
        console.error(error);
        setErrorMessage("Something went wrong. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const makeRequest = () => addItem({ name, imageUrl, weather });
    const onSuccess = (item) => {
      setClothingItems((prevItems) => [item, ...prevItems]);
    };

    handleSubmit(makeRequest, onSuccess);
  };

  const handleDeleteCard = (card) => {
    setActiveModal("confirm-delete");
    setSelectedCard(card);
  };

  const handleConfirmDelete = () => {
    const makeRequest = () => deleteItem(selectedCard._id);
    const onSuccess = () => {
      setClothingItems((prevItems) =>
        prevItems.filter((item) => item._id !== selectedCard._id)
      );
      setSelectedCard({});
    };

    handleSubmit(makeRequest, onSuccess);
  };

  const handleRegister = (formData) => {
    const makeRequest = () => register(formData);
    const onSuccess = (userData) => {
      localStorage.setItem("jwt", userData.token);
      setIsLoggedIn(true);
      setCurrentUser(userData.user);
      navigate("/profile");
    };

    handleSubmit(makeRequest, onSuccess);
  };

  const handleLogin = ({ email, password }) => {
    const makeRequest = () =>
      login({ email, password }).then((userData) => {
        localStorage.setItem("jwt", userData.token);
        return checkToken(userData.token);
      });
    const onSuccess = (loginData) => {
      setIsLoggedIn(true);
      setCurrentUser(loginData);
      navigate("/profile");
    };

    handleSubmit(makeRequest, onSuccess);
  };

  const handleEditProfileClick = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const handleUpdateUser = (userData) => {
    const makeRequest = () => updateUser(userData);
    const onSuccess = (updatedUser) => {
      setCurrentUser(updatedUser);
      closeEditProfileModal();
    };

    handleSubmit(makeRequest, onSuccess);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    const makeRequest = () => {
      if (!isLiked) {
        return api.addCardLike(id, token);
      } else {
        return api.removeCardLike(id, token);
      }
    };

    makeRequest()
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data.reverse());
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((error) => {
          console.error("Invalid token:", error);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={() => setActiveModal("add-garment")}
              weatherData={weatherData}
              handleLoginClick={() => setActiveModal("login")}
              onLogout={() => {
                localStorage.removeItem("jwt");
                setIsLoggedIn(false);
                setCurrentUser(null);
              }}
              handleRegisterClick={() => setActiveModal("register")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={(card) => {
                      setActiveModal("preview");
                      setSelectedCard(card);
                    }}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    setClothingItems={setClothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems.filter(
                        (item) => item.owner === currentUser?._id
                      )}
                      handleAddClick={() => setActiveModal("add-garment")}
                      handleDeleteCard={handleDeleteCard}
                      onCardClick={(card) => {
                        setActiveModal("preview");
                        setSelectedCard(card);
                      }}
                      onEditProfile={handleEditProfileClick}
                      onLogout={() => {
                        localStorage.removeItem("jwt");
                        setIsLoggedIn(false);
                        setCurrentUser(null);
                      }}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
            isLoading={isLoading}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegister={handleRegister}
            isLoading={isLoading}
            onSwitchToLogin={() => setActiveModal("login")}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLogin={handleLogin}
            isLoading={isLoading}
            onSwitchToRegister={() => setActiveModal("register")}
            errorMessage={errorMessage}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDelete={handleDeleteCard}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            onClose={closeActiveModal}
            onConfirm={handleConfirmDelete}
            isLoading={isLoading}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={closeEditProfileModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isEditProfileLoading}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
