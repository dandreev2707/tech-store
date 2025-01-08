
import React from 'react';
import './AboutUs.css';

function AboutUs() {
  return (
    <div className="about-us-page">
      <header className="about-us-header">
        <h1>О компании</h1>
        <p>Добро пожаловать в наш магазин техники. Мы стремимся предоставлять лучшие товары с высоким уровнем сервиса.</p>
      </header>
      <main className="about-us-content">
        <section>
          <h2>Наши ценности</h2>
          <p>Качество, инновации, надежность и забота о клиентах – это основы нашей работы.</p>
        </section>
        <section>
          <h2>Почему выбирают нас?</h2>
          <ul>
            <li>Широкий ассортимент техники</li>
            <li>Конкурентные цены</li>
            <li>Отличное обслуживание клиентов</li>
            <li>Гарантия качества и надежности</li>
          </ul>
        </section>
        <section>
          <h2>Контакты</h2>
          <p>Мы всегда готовы ответить на ваши вопросы по следующим каналам:</p>
          <ul>
            <li>Email: info@techstore.com</li>
            <li>Телефон: +7 (123) 456-78-90</li>
            <li>Адрес: г. Таганрог, ул. Чехова, д. 6</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default AboutUs;
