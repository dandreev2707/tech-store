import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const { username, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users.find((user) => user.username === username);
  const orders = currentUser?.orders || [];
  const favoriteProducts = currentUser?.favoriteProducts || []; // Получаем избранные товары
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextOrder = () => {
    if (currentIndex < orders.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevOrder = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="profile">
      <h1>Ваш Профиль</h1>
      <p className="welcome-message">Добро пожаловать, {username}!</p>
      <button className="logout-button" onClick={handleLogout}>
        Выйти
      </button>

      <h2 className="section-title">История заказов</h2>

      {orders.length > 0 ? (
        <div className="order-history">
          <div className="order-navigation">
            <button
              className="prev-button"
              onClick={handlePrevOrder}
              disabled={currentIndex === 0}
            >
              &#8592; {/* Стрелка "влево" */}
            </button>
            <div className="order-card">
              <div className="order-card-content">
                <h3>Заказ от {orders[currentIndex].date}</h3>
                <p className="order-owner">Имя заказчика: {orders[currentIndex].name}</p>
                <p className="order-total">Сумма: {orders[currentIndex].totalPrice} руб</p>
                <p className="order-method">
                  Доставка:{" "}
                  {orders[currentIndex].deliveryMethod === "pickup"
                    ? "Самовывоз"
                    : "Доставка на адрес"}
                </p>
                <p className="order-address">Адрес: {orders[currentIndex].address}</p>
                <p className="order-payment">
                  Оплата:{" "}
                  {orders[currentIndex].paymentType === "online"
                    ? "онлайн"
                    : orders[currentIndex].paymentType === "cod"
                    ? "при получении"
                    : orders[currentIndex].paymentType === "credit"
                    ? "в кредит"
                    : "неизвестный способ оплаты"}
                </p>
                <h4 className="order-items-title">Товары:</h4>
                <ul className="order-items-list">
                  {orders[currentIndex].items.map((item) => (
                    <li key={item.id} className="order-item">
                      {item.name} - {item.quantity} шт. ({item.price * item.quantity} руб)
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button
              className="next-button"
              onClick={handleNextOrder}
              disabled={currentIndex === orders.length - 1}
            >
              &#8594; {/* Стрелка "вправо" */}
            </button>
          </div>
          <div className="order-indicators">
            {orders.map((_, index) => (
              <span
                key={index}
                className={`indicator ${
                  index === currentIndex ? "active" : ""
                }`}
                onClick={() => handleIndicatorClick(index)}
              ></span>
            ))}
          </div>
        </div>
      ) : (
        <div className="no-orders">
          <p className="no-orders-message">У вас пока нет заказов.</p>
          <Link to="/catalog" className="go-to-catalog-button">
            Перейти в каталог
          </Link>
        </div>
      )}

<h2 className="section-title">Избранные товары</h2>
      {favoriteProducts.length > 0 ? (
        <div className="favorite-products-list">
          {favoriteProducts.map((productId) => {
            const product = JSON.parse(localStorage.getItem("products")).find(
              (prod) => prod.id === productId
            );
            return (
              product && (
                <div key={product.id} className="favorite-product-card">
                  <div className="favorite-product-details">
                    <h3>{product.name}</h3>
                    <p>Цена: {product.price} руб.</p>
                    <Link
                      to={`/product/${product.id}`}
                      className="view-product-details"
                    >
                      Подробнее
                    </Link>
                  </div>
                  <div className="favorite-product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                </div>
              )
            );
          })}
        </div>
      ) : (
        <p className="no-favorites-message">Вы еще не добавили товары в избранное.</p>
      )}
    </div>
  );
}

export default Profile;
