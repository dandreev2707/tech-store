import React, { useContext, useState } from "react";
import { CartContext } from "../contexts/CartContext";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { username } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [store, setStore] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Поле Имя обязательно для заполнения";
    if (!email) newErrors.email = "Поле Электронная почта обязательно для заполнения";
    if (!deliveryMethod) newErrors.deliveryMethod = "Выберите способ получения";
    if (deliveryMethod === "pickup" && !store) newErrors.store = "Выберите магазин для самовывоза";
    if (deliveryMethod === "delivery" && !address) newErrors.address = "Поле Адрес обязательно для заполнения";
    if (!paymentType) newErrors.paymentType = "Выберите способ оплаты";
    
    return newErrors;
  };

  const handleOrder = () => {
    const newErrors = validateFields();

    if (Object.keys(newErrors).length === 0) {
      const order = {
        id: Date.now(),
        items: cartItems,
        totalPrice,
        name,
        email,
        address: deliveryMethod === "delivery" ? address : `Самовывоз из: ${store}`,
        deliveryMethod,
        paymentType,
        date: new Date().toLocaleString(),
      };

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((user) => {
        if (user.username === username) {
          const updatedOrders = user.orders ? [...user.orders, order] : [order];
          return { ...user, orders: updatedOrders };
        }
        return user;
      });
      localStorage.setItem("users", JSON.stringify(updatedUsers));

      setSuccessMessage("Ваш заказ успешно оформлен!");
      clearCart(); // Очищаем корзину
      setTimeout(() => navigate("/profile"), 2000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout">
        <h1>Оформление заказа</h1>
        {successMessage && <p className="success-text">{successMessage}</p>}

        <select
          value={deliveryMethod}
          onChange={(e) => {
            setDeliveryMethod(e.target.value);
            setErrors((prevErrors) => ({ ...prevErrors, deliveryMethod: "" })); // Clear error on change
          }}
          className={errors.deliveryMethod ? "input-error" : ""}
        >
          <option value="">Выберите способ получения</option>
          <option value="pickup">Самовывоз</option>
          <option value="delivery">Доставка</option>
        </select>
        {errors.deliveryMethod && <p className="error-text">{errors.deliveryMethod}</p>}

        {deliveryMethod === "pickup" && (
          <>
            <input
              type="text"
              placeholder="Введите Имя"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, name: "" })); // Clear error on change
              }}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="text"
              placeholder="Введите Электронную почту"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Clear error on change
              }}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <select
              value={store}
              onChange={(e) => {
                setStore(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, store: "" })); // Clear error on change
              }}
              className={errors.store ? "input-error" : ""}
            >
              <option value="">Выберите магазин для самовывоза</option>
              <option value="store1">Магазин 1</option>
              <option value="store2">Магазин 2</option>
              <option value="store3">Магазин 3</option>
            </select>
            {errors.store && <p className="error-text">{errors.store}</p>}

            <select
              value={paymentType}
              onChange={(e) => {
                setPaymentType(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, paymentType: "" })); // Clear error on change
              }}
              className={errors.paymentType ? "input-error" : ""}
            >
              <option value="">Выберите способ оплаты</option>
              <option value="online">Оплата онлайн</option>
              <option value="cod">Оплата при получении</option>
              <option value="credit">Оплата в кредит</option>
            </select>
            {errors.paymentType && <p className="error-text">{errors.paymentType}</p>}
          </>
        )}

        {deliveryMethod === "delivery" && (
          <>
            <input
              type="text"
              placeholder="Введите Имя"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, name: "" })); // Clear error on change
              }}
              className={errors.name ? "input-error" : ""}
            />
            {errors.name && <p className="error-text">{errors.name}</p>}

            <input
              type="text"
              placeholder="Введите Электронную почту"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, email: "" })); // Clear error on change
              }}
              className={errors.email ? "input-error" : ""}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}

            <input
              type="text"
              placeholder="Введите Адрес"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, address: "" })); // Clear error on change
              }}
              className={errors.address ? "input-error" : ""}
            />
            {errors.address && <p className="error-text">{errors.address}</p>}

            <select
              value={paymentType}
              onChange={(e) => {
                setPaymentType(e.target.value);
                setErrors((prevErrors) => ({ ...prevErrors, paymentType: "" })); // Clear error on change
              }}
              className={errors.paymentType ? "input-error" : ""}
            >
              <option value="">Выберите способ оплаты</option>
              <option value="online">Оплата онлайн</option>
              <option value="cod">Оплата при получении</option>
              <option value="credit">Оплата в кредит</option>
            </select>
            {errors.paymentType && <p className="error-text">{errors.paymentType}</p>}
          </>
        )}

        <button onClick={handleOrder} className="submit-button">
          Оформить заказ
        </button>
      </div>
    </div>
  );
}

export default Checkout;
