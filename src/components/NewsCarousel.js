import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './NewsCarousel.css';

const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const newsItems = useMemo(() => [
    { id: 1, title: 'Новинка: Смартфон iPhone 14 Pro Max доступен в нашем магазине!', description: 'Ознакомьтесь с новыми функциями и характеристиками.' },
    { id: 2, title: 'Специальное предложение на ноутбуки!', description: 'Скидки до 30% на определенные модели ноутбуков.' },
    { id: 3, title: 'Новые аксессуары для вашей электроники.', description: 'Найди идеальные аксессуары для своих устройств.' }
  ], []);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? newsItems.length - 1 : prevIndex - 1));
  }, [newsItems]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === newsItems.length - 1 ? 0 : prevIndex + 1));
  }, [newsItems]);

  useEffect(() => {
    const interval = setInterval(handleNext, 5000); 
    return () => clearInterval(interval);
  }, [handleNext]); 

  return (
    <div className="carousel-container">
      {newsItems.map((item, index) => (
        <div
          key={item.id}
          className={`carousel-item ${index === currentIndex ? 'active' : ''}`}
        >
          <h3>{item.title}</h3>
          <p>{item.description}</p>
        </div>
      ))}
      <button className="prev" onClick={handlePrev}>←</button>
      <button className="next" onClick={handleNext}>→</button>
    </div>
  );
};

export default NewsCarousel;
