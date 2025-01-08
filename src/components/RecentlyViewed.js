import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./RecentlyViewed.css";

const RecentlyViewed = () => {
  const [recentProducts, setRecentProducts] = useState([]);

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentProducts(storedProducts.slice(0, 6));
  }, []);

  return (
    <div className="recently-viewed modern-container">
      <h2 className="modern-title">Последние просмотренные товары</h2>
      {recentProducts.length > 0 ? (
        <div className="recently-viewed-list modern-list full-width">
          {recentProducts.map((product) => (
            <div key={product.id} className="recently-viewed-item modern-item full-width-item">
              <Link to={`/product/${product.id}`} className="modern-link">
                <div className="clickable-area">
                  <h3 className="modern-product-name">{product.name}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="modern-empty-message">Вы еще не просматривали товары.</p>
      )}
    </div>
  );
};

export default RecentlyViewed;
