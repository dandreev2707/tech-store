import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Catalog.css";

const categories = [
  { name: "Телевизоры", slug: "tvs", image: "/images/tvs.jpg", productCount: 4 },
  { name: "Смартфоны", slug: "smartphones", image: "/images/smartphones.jpg", productCount: 4 },
  { name: "Компьютеры и ноутбуки", slug: "comps", image: "/images/comps.jpg", productCount: 4 },
  { name: "Игровые консоли", slug: "consoles", image: "/images/consoles.jpg", productCount: 4 },
  { name: "Фото и видео техника", slug: "cameras", image: "/images/cameras.jpg", productCount: 4 },
  { name: "Планшеты", slug: "tablets", image: "/images/tablets.jpg", productCount: 4 },
  { name: "Гаджеты для дома", slug: "smart_home", image: "/images/smart_home.jpg", productCount: 4 },
  { name: "Домашние развлечения", slug: "home_entertainment", image: "/images/home_entertainment.jpg", productCount: 4 },
  { name: "Электронные аксессуары", slug: "accessories", image: "/images/accessories.jpg", productCount: 4 },
  { name: "Игровые аксессуары", slug: "gaming_accessories", image: "/images/gaming_accessories.jpg", productCount: 4 },
  { name: "Смарт-часы и фитнес-трекеры", slug: "smart_watches", image: "/images/smart_watches.jpg", productCount: 4 },
  { name: "Наушники и акустика", slug: "headphones", image: "/images/headphones.jpg", productCount: 4 },
];

function Catalog() {
  const location = useLocation();
  const [filteredCategories, setFilteredCategories] = useState(categories);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchQuery = params.get("search");

    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = categories.filter((category) =>
        category.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [location.search]);

  return (
    <div className="catalog">
      <h1>Каталог товаров</h1>
      <div className="categories">
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category, index) => (
            <Link to={`/catalog/${category.slug}`} key={index} className="category-card">
              <img src={category.image} alt={category.name} className="category-image" />
              <div className="category-info">
                <h3>{category.name}</h3>
                <p>{category.productCount} товара</p>
              </div>
            </Link>
          ))
        ) : (
          <p>Категории не найдены.</p>
        )}
      </div>
    </div>
  );
}

export default Catalog;
