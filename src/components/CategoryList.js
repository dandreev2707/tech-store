import React from 'react';

const CategoryList = () => {
  const categories = ['Смартфоны', 'Ноутбуки', 'Аксессуары', 'Телевизоры', 'Гаджеты'];

  return (
    <ul className="category-list">
      {categories.map((category, index) => (
        <li key={index}>{category}</li>
      ))}
    </ul>
  );
};

export default CategoryList;
