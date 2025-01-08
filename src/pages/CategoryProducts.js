import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./CategoryProducts.css";

const products = [
  //tvs
  { id: 1, name: "Samsung QLED 55", category: "tvs", price: "79920", description: "Телевизор с QLED дисплеем и 4K разрешением.", image: "/images/samsung-qled-55.jpg" },
  { id: 2, name: "LG OLED48C1", category: "tvs", price: "103920", description: "OLED-телевизор с 48-дюймовым экраном и технологией HDR.", image: "/images/LG OLED48C1.jpg" },
  { id: 3, name: "Sony BRAVIA X90J 65", category: "tvs", price: "119920", description: "Телевизор с процессором X1 и 4K разрешением." , image: "/images/Sony BRAVIA X90J 65.jpg"},
  { id: 4, name: "TCL 65 6-Series", category: "tvs", price: "63920", description: "Телевизор с 4K HDR и поддержкой Dolby Vision.",image:"/images/TCL 65 6-Series.jpg" },
  //comps
  { id: 5, name: "Apple MacBook Pro 16", category: "comps", price: "191920", description: "Профессиональный ноутбук с M1 Pro чипом." },
  { id: 6, name: "Dell XPS 15", category: "comps", price: "143920", description: "Легкий ноутбук с 15-дюймовым экраном и процессором Intel." },
  { id: 7, name: "Asus ROG Zephyrus G14", category: "comps", price: "127920", description: "Игровой ноутбук с мощной видеокартой и 14-дюймовым экраном." },
  { id: 8, name: "HP Spectre x360 14", category: "comps", price: "95920", description: "Универсальный ноутбук с гибким экраном и процессором Intel." },
  //smartphones
  { id: 9, name: "iPhone 14 Pro Max", category: "smartphones", price: "87920", description: "Флагманский смартфон с 6.7-дюймовым дисплеем и камерой Pro." },
  { id: 10, name: "Samsung Galaxy S23 Ultra", category: "smartphones", price: "103920", description: "Смартфон с 200-мегапиксельной камерой и мощным процессором." },
  { id: 11, name: "OnePlus 11 5G", category: "smartphones", price: "63920", description: "Смартфон с 120 Гц AMOLED-дисплеем и быстрым зарядом." },
  { id: 12, name: "Google Pixel 7 Pro", category: "smartphones", price: "71920", description: "Смартфон с мощной камерой и чистым Android." },
  //headphones
  { id: 13, name: "Sony WH-1000XM5", category: "headphones", price: "27920", description: "Беспроводные наушники с шумоподавлением." },
  { id: 14, name: "Apple AirPods Pro 2", category: "headphones", price: "19920", description: "Беспроводные наушники с активным шумоподавлением." },
  { id: 15, name: "Bose QuietComfort 45", category: "headphones", price: "26320", description: "Наушники с высоким качеством звука и шумоподавлением." },
  { id: 16, name: "JBL Flip 6", category: "headphones", price: "10320", description: "Портативная акустика с водозащитой и мощным звуком." },
  //consoles
  { id: 17, name: "PlayStation 5", category: "consoles", price: "39920", description: "Игровая консоль нового поколения от Sony." },
  { id: 18, name: "Xbox Series X", category: "consoles", price: "39920", description: "Потужная игровая консоль от Microsoft." },
  { id: 19, name: "Nintendo Switch OLED", category: "consoles", price: "27920", description: "Гибридная консоль с 7-дюймовым OLED-дисплеем." },
  { id: 20, name: "Steam Deck 512GB", category: "consoles", price: "51920", description: "Мощная портативная игровая консоль с поддержкой Steam." },
  //cameras
  { id: 21, name: "Canon EOS R5", category: "cameras", price: "311920", description: "Профессиональная зеркальная камера с 45 МП матрицей." },
  { id: 22, name: "Nikon Z9", category: "cameras", price: "439920", description: "Полноформатная беззеркальная камера с 45.7 МП." },
  { id: 23, name: "GoPro HERO11 Black", category: "cameras", price: "31920", description: "Малогабаритная камера для съемки на ходу." },
  { id: 24, name: "DJI Mavic Air 2S", category: "cameras", price: "79920", description: "Дрон с 1-дюймовой матрицей и 4K видео." },
  //tablets
  { id: 25, name: "Apple iPad Pro 12.9", category: "tablets", price: "87920", description: "Профессиональный планшет с чипом M1." },
  { id: 26, name: "Samsung Galaxy Tab S8 Ultra", category: "tablets", price: "87920", description: "Планшет с 14.6-дюймовым AMOLED дисплеем." },
  { id: 27, name: "Microsoft Surface Pro 8", category: "tablets", price: "79920", description: "Трансформируемый планшет с Windows." },
  { id: 28, name: "Amazon Fire HD 10", category: "tablets", price: "11920", description: "Бюджетный планшет с 10-дюймовым экраном." },
  //smart_home
  { id: 29, name: "Amazon Echo Dot (4th Gen)", category: "smart_home", price: "3920", description: "Умная колонка с голосовым помощником Alexa." },
  { id: 30, name: "Google Nest Thermostat", category: "smart_home", price: "10320", description: "Умный термостат для управления температурой дома." },
  { id: 31, name: "Philips Hue White and Color Ambiance", category: "smart_home", price: "6320", description: "Умные лампочки с поддержкой RGB." },
  { id: 32, name: "Ring Video Doorbell Pro 2", category: "smart_home", price: "19920", description: "Умное видеозвонковое устройство." },
  //home_entertainment
  { id: 33, name: "Apple TV 4K", category: "home_entertainment", price: "14320", description: "Устройство для потокового вещания в 4K HDR." },
  { id: 34, name: "Roku Ultra", category: "home_entertainment", price: "7920", description: "Потоковый медиаплеер с поддержкой 4K." },
  { id: 35, name: "Chromecast with Google TV", category: "home_entertainment", price: "3920", description: "Потоковый медиаплеер с поддержкой 4K." },
  { id: 36, name: "NVIDIA Shield TV Pro", category: "home_entertainment", price: "15920", description: "Потоковый медиаплеер для игр и приложений." },
  //accessories
  { id: 37, name: "Anker PowerCore 10000", category: "accessories", price: "2320", description: "Компактная портативная зарядка." },
  { id: 38, name: "Belkin MagSafe Charger", category: "accessories", price: "3120", description: "Беспроводная зарядка для iPhone с MagSafe." },
  { id: 39, name: "SanDisk 1TB Extreme Portable SSD", category: "accessories", price: "19920", description: "Прочный портативный SSD для быстрой передачи данных." },
  { id: 40, name: "UGreen USB-C Hub", category: "accessories", price: "3120", description: "Адаптер для расширения портов на ноутбуке." },
  //gaming_accessories
  { id: 41, name: "DualSense Wireless Controller", category: "gaming_accessories", price: "5520", description: "Беспроводной геймпад для PlayStation 5." },
  { id: 42, name: "Xbox Elite Series 2 Controller", category: "gaming_accessories", price: "14320", description: "Профессиональный геймпад с дополнительными функциями." },
  { id: 43, name: "HyperX Cloud II Gaming Headset", category: "gaming_accessories", price: "7920", description: "Геймерские наушники с виртуальным 7.1 звуком." },
  { id: 44, name: "Logitech G Pro Wireless Mouse", category: "gaming_accessories", price: "10320", description: "Игровая мышь с низкой задержкой." },
  //smart_watches
  { id: 45, name: "Apple Watch Series 8", category: "smart_watches", price: "31920", description: "Умные часы с мониторингом здоровья и активности." },
  { id: 46, name: "Samsung Galaxy Watch 5 Pro", category: "smart_watches", price: "23920", description: "Фитнес-часы с длительным временем автономной работы." },
  { id: 47, name: "Fitbit Charge 5", category: "smart_watches", price: "14320", description: "Фитнес-браслет с дисплеем и мониторингом сна." },
  { id: 48, name: "Garmin Forerunner 945", category: "smart_watches", price: "39920", description: "Спортивные часы с GPS и функцией мониторинга тренировок." },
];

function CategoryProducts() {
  const { category } = useParams(); // Получаем slug категории из URL
  const [sortOption, setSortOption] = useState("price"); // Состояние для выбора сортировки
  const [priceRange, setPriceRange] = useState([0, 500000]); // Состояние для диапазона цен
  const [favoriteProducts, setFavoriteProducts] = useState([]); // Состояние для избранных товаров

  // Загрузка избранных товаров из localStorage при загрузке страницы
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favoriteProducts")) || [];
    setFavoriteProducts(savedFavorites);
  }, []);

  // Функция для сохранения избранных товаров в localStorage
  const saveFavoritesToLocalStorage = (favorites) => {
    localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
  };

  // Функция для добавления/удаления продукта из избранного
  const toggleFavorite = (productId) => {
    if (favoriteProducts.includes(productId)) {
      const updatedFavorites = favoriteProducts.filter((id) => id !== productId);
      setFavoriteProducts(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);
    } else {
      const updatedFavorites = [...favoriteProducts, productId];
      setFavoriteProducts(updatedFavorites);
      saveFavoritesToLocalStorage(updatedFavorites);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.category === category &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
  );

  // Функция для сортировки продуктов
  const sortProducts = (option) => {
    if (option === "price") {
      return filteredProducts.sort((a, b) => a.price - b.price); // Сортировка по цене (возрастание)
    } else if (option === "price-desc") {
      return filteredProducts.sort((a, b) => b.price - a.price); // Сортировка по цене (убывание)
    } else if (option === "name") {
      return filteredProducts.sort((a, b) => a.name.localeCompare(b.name)); // Сортировка по названию (алфавит)
    } else if (option === "name-desc") {
      return filteredProducts.sort((a, b) => b.name.localeCompare(a.name)); // Сортировка по названию (обратный алфавит)
    }
    return filteredProducts;
  };

  const sortedProducts = sortProducts(sortOption); // Применяем выбранную сортировку

  return (
    <div className="category-products">
      {/* Кнопка назад */}
      <Link to="/catalog" className="back-button">
        Назад
      </Link>

      <h1>
        {category === "tvs" && "Телевизоры"}
        {category === "comps" && "Компьютеры и ноутбуки"}
        {category === "smartphones" && "Смартфоны"}
        {category === "headphones" && "Наушники и акустика"}
        {category === "consoles" && "Игровые консоли"}
        {category === "cameras" && "Фото и видео техника"}
        {category === "tablets" && "Планшеты"}
        {category === "smart_home" && "Гаджеты для дома"}
        {category === "home_entertainment" && "Домашние развлечения"}
        {category === "accessories" && "Электронные аксессуары"}
        {category === "gaming_accessories" && "Игровые аксессуары"}
        {category === "smart_watches" && "Смарт-часы и фитнес-трекеры"}
      </h1>

      {/* Форма фильтрации цен */}
      <div className="price-filter-container">
        <label className="price-filter-label" htmlFor="price-range">
          Фильтр по цене:
        </label>
        <div className="price-range-input">
          <input
            type="range"
            id="price-range"
            min="0"
            max="500000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], parseInt(e.target.value)])
            }
          />
        </div>
        <div className="price-range-values">
          <span>{priceRange[0]} ₽</span>
          <span>{priceRange[1]} ₽</span>
        </div>
      </div>

      {/* Dropdown для выбора сортировки */}
      <div className="sort-options">
        <label htmlFor="sort">Сортировать по:</label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="price">Цене (возрастание)</option>
          <option value="price-desc">Цене (убывание)</option>
          <option value="name">Названию (алфавит)</option>
          <option value="name-desc">Названию (обратный алфавит)</option>
        </select>
      </div>

      <div className="product-list">
        {sortedProducts.length > 0 ? (
          sortedProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-details">
                <h3>{product.name}</h3>
                <p>Цена: {product.price} ₽</p>
                <Link to={`/product/${product.id}`} className="view-details">
                  Подробнее
                </Link>
                <button
                  className={`favorite-button ${
                    favoriteProducts.includes(product.id) ? "favorited" : ""
                  }`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  ❤
                </button>

              </div>
              <div className="product-image">
                <img src={product.image} alt={product.name} />
              </div>
            </div>
          ))
        ) : (
          <p>В этой категории пока нет товаров.</p>
        )}
      </div>
    </div>
  );
}

export default CategoryProducts;