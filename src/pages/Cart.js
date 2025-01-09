import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import "./Cart.css";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart, updateItemQuantity, totalPrice, getCartCount } = useContext(CartContext);
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAuthMessage, setShowAuthMessage] = useState(false);

  const handleCheckoutClick = () => {
    if (isAuthenticated) {
      console.log('Navigating to /checkout');
      navigate('/checkout');
    } else {
      setShowAuthMessage(true); 
    }
  };

  const handleQuantityChange = (id, change) => {
    updateItemQuantity(id, change);
  };

  return (
    <div className="cart">
      <h1>Корзина</h1>
      <p>Количество товаров: {getCartCount()}</p>
      {cartItems.length > 0 ? (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>Цена: {item.price} руб</p>
              <div className="item-quantity">
                <button
                  onClick={() => handleQuantityChange(item.id, -1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, 1)}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="remove-button"
              >
                Удалить
              </button>
            </div>
          ))}
          <div className="total-price">
            <h3>Общая стоимость: {totalPrice} руб</h3>
          </div>
          <button
            className="purchase-button"
            onClick={handleCheckoutClick}
          >
            Оформить заказ
          </button>
          {showAuthMessage && (
            <p className="auth-message">
              Для оформления заказа вам нужно{" "}
              <span
                className="auth-link"
                onClick={() => navigate('/login')}
              >
                авторизироваться
              </span>.
            </p>
          )}
        </div>
      ) : (
        <p>Корзина пуста</p>
      )}
    </div>
  );
}

export default Cart;
