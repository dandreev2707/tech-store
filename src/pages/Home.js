import React from "react";
import NewsCarousel from "../components/NewsCarousel"; 
import RecentlyViewed from "../components/RecentlyViewed";
import FeedbackButton from "../components/FeedbackButton";
function Home() {
  return (
    <div>
      <h1>Добро пожаловать в наш магазин!</h1>
      <section className="news-updates">
        <h2>Новости и обновления</h2>
        <NewsCarousel />
      </section>
      <RecentlyViewed /> {/* Отображение последних просмотренных товаров */}
      <FeedbackButton />
    </div>
  );
}

export default Home;
