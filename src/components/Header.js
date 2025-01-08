import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CartContext } from "../contexts/CartContext";
import "./Header.css";

function Header() {
  const { getCartCount } = useContext(CartContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");

  const isActive = (path) => location.pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">Магазин Техники</Link>
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Поиск товаров..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">Найти</button>
        </form>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/catalog" className={isActive("/catalog") ? "active" : ""}>
                Каталог
              </Link>
            </li>
            <li>
              <Link to="/cart" className={isActive("/cart") ? "active" : ""}>
                Корзина ({getCartCount()})
              </Link>
            </li>
            <li>
              {isAuthenticated ? (
                <Link to="/profile" className={isActive("/profile") ? "active" : ""}>
                  Личный кабинет
                </Link>
              ) : (
                <Link to="/login" className={isActive("/login") ? "active" : ""}>
                  Войти
                </Link>
              )}
            </li>
            <li>
              <Link to="/about-us-page" className={isActive("/about-us-page") ? "active" : ""}>
                О компании
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
