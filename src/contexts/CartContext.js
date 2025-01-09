import React, { createContext, useReducer, useContext, useEffect } from "react";

export const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = state.cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return { ...state, cartItems: updatedItems };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload.id),
      };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.change }
            : item
        ),
      };
    case "CLEAR_CART":
      return { ...state, cartItems: [] };
    case "LOAD_CART":
      return { ...state, cartItems: action.payload };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const storedCart = localStorage.getItem("cartItems");
  const initialState = {
    cartItems: storedCart ? JSON.parse(storedCart) : [],
  };

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
  }, [state.cartItems]);

  const addToCart = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeFromCart = (productId) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id: productId } });
  const updateItemQuantity = (id, change) =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, change } });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const getCartCount = () =>
    state.cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        totalPrice,
        getCartCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
