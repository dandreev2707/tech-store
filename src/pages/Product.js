import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate,Link } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import "./Product.css";

const products = [
  { id: 1, name: "Samsung QLED 55", category: "Телевизоры", price: "79920", description: "Телевизор с QLED дисплеем и 4K разрешением.", rating: 4.5, image: "/images/samsung-qled-55.jpg" },

  { id: 2, name: "LG OLED48C1", category: "Телевизоры", price: "103920", description: "OLED-телевизор с 48-дюймовым экраном и технологией HDR.", rating: 4.8, image: "/images/LG OLED48C1.jpg" },
  { id: 3, name: "Sony BRAVIA X90J 65", category: "Телевизоры", price: "119920", description: "Телевизор с процессором X1 и 4K разрешением.", rating: 4.7 , image: "/images/Sony BRAVIA X90J 65.jpg"},
  { id: 4, name: "TCL 65 6-Series", category: "Телевизоры", price: "63920", description: "Телевизор с 4K HDR и поддержкой Dolby Vision.", rating: 4.6 , image: "/images/TCL 65 6-Series.jpg"},
  { id: 5, name: "Apple MacBook Pro 16", category: "Компьютеры и ноутбуки", price: "191920", description: "Профессиональный ноутбук с M1 Pro чипом.", rating: 4.9 , image: "/images/TCL 65 6-Series.jpg"},
  { id: 6, name: "Dell XPS 15", category: "Компьютеры и ноутбуки", price: "143920", description: "Легкий ноутбук с 15-дюймовым экраном и процессором Intel.", rating: 4.7 , image: "/images/samsung-qled-55.jpg"},
  { id: 7, name: "Asus ROG Zephyrus G14", category: "Компьютеры и ноутбуки", price: "127920", description: "Игровой ноутбук с мощной видеокартой и 14-дюймовым экраном.", rating: 4.8 , image: "/images/samsung-qled-55.jpg"},
  { id: 8, name: "HP Spectre x360 14", category: "Компьютеры и ноутбуки", price: "95920", description: "Универсальный ноутбук с гибким экраном и процессором Intel.", rating: 4.6 , image: "/images/samsung-qled-55.jpg"},
  { id: 9, name: "iPhone 14 Pro Max", category: "Смартфоны", price: "87920", description: "Флагманский смартфон с 6.7-дюймовым дисплеем и камерой Pro.", rating: 4.8, image: "/images/samsung-qled-55.jpg" },
  { id: 10, name: "Samsung Galaxy S23 Ultra", category: "Смартфоны", price: "103920", description: "Смартфон с 200-мегапиксельной камерой и мощным процессором.", rating: 4.9, image: "/images/samsung-qled-55.jpg" },
  { id: 11, name: "OnePlus 11 5G", category: "Смартфоны", price: "63920", description: "Смартфон с 120 Гц AMOLED-дисплеем и быстрым зарядом.", rating: 4.7, image: "/images/samsung-qled-55.jpg" },
  { id: 12, name: "Google Pixel 7 Pro", category: "Смартфоны", price: "71920", description: "Смартфон с мощной камерой и чистым Android.", rating: 4.6 },
  { id: 13, name: "Sony WH-1000XM5", category: "Наушники и акустика", price: "27920", description: "Беспроводные наушники с шумоподавлением.", rating: 4.9 },
  { id: 14, name: "Apple AirPods Pro 2", category: "Наушники и акустика", price: "19920", description: "Беспроводные наушники с активным шумоподавлением.", rating: 4.8 },
  { id: 15, name: "Bose QuietComfort 45", category: "Наушники и акустика", price: "26320", description: "Наушники с высоким качеством звука и шумоподавлением.", rating: 4.7 },
  { id: 16, name: "JBL Flip 6", category: "Наушники и акустика", price: "10320", description: "Портативная акустика с водозащитой и мощным звуком.", rating: 4.5 },
  { id: 17, name: "PlayStation 5", category: "Игровые консоли", price: "39920", description: "Игровая консоль нового поколения от Sony.", rating: 4.8 },
  { id: 18, name: "Xbox Series X", category: "Игровые консоли", price: "39920", description: "Потужная игровая консоль от Microsoft.", rating: 4.9 },
  { id: 19, name: "Nintendo Switch OLED", category: "Игровые консоли", price: "27920", description: "Гибридная консоль с 7-дюймовым OLED-дисплеем.", rating: 4.6 },
  { id: 20, name: "Steam Deck 512GB", category: "Игровые консоли", price: "51920", description: "Мощная портативная игровая консоль с поддержкой Steam.", rating: 4.7 },
  { id: 21, name: "Canon EOS R5", category: "Фото и видео техника", price: "311920", description: "Профессиональная зеркальная камера с 45 МП матрицей.", rating: 4.9 },
  { id: 22, name: "Nikon Z9", category: "Фото и видео техника", price: "439920", description: "Полноформатная беззеркальная камера с 45.7 МП.", rating: 4.8 },
  { id: 23, name: "GoPro HERO11 Black", category: "Фото и видео техника", price: "31920", description: "Малогабаритная камера для съемки на ходу.", rating: 4.7 },
  { id: 24, name: "DJI Mavic Air 2S", category: "Фото и видео техника", price: "79920", description: "Дрон с 1-дюймовой матрицей и 4K видео.", rating: 4.6 },
  { id: 25, name: "Apple iPad Pro 12.9", category: "Планшеты", price: "87920", description: "Профессиональный планшет с чипом M1.", rating: 4.9 },
  { id: 26, name: "Samsung Galaxy Tab S8 Ultra", category: "Планшеты", price: "87920", description: "Планшет с 14.6-дюймовым AMOLED дисплеем.", rating: 4.8 },
  { id: 27, name: "Microsoft Surface Pro 8", category: "Планшеты", price: "79920", description: "Трансформируемый планшет с Windows.", rating: 4.7 },
  { id: 28, name: "Amazon Fire HD 10", category: "Планшеты", price: "11920", description: "Бюджетный планшет с 10-дюймовым экраном.", rating: 4.5 },
  { id: 29, name: "Amazon Echo Dot (4th Gen)", category: "Гаджеты для дома", price: "3920", description: "Умная колонка с голосовым помощником Alexa.", rating: 4.6 },
  { id: 30, name: "Google Nest Thermostat", category: "Гаджеты для дома", price: "10320", description: "Умный термостат для управления температурой дома.", rating: 4.7 },
  { id: 31, name: "Philips Hue White and Color Ambiance", category: "Гаджеты для дома", price: "6320", description: "Умные лампочки с поддержкой RGB.", rating: 4.9 },
  { id: 32, name: "Ring Video Doorbell Pro 2", category: "Гаджеты для дома", price: "19920", description: "Умное видеозвонковое устройство.", rating: 4.8 },
  { id: 33, name: "Apple TV 4K", category: "Домашние развлечения", price: "14320", description: "Устройство для потокового вещания в 4K HDR.", rating: 4.7 },
  { id: 34, name: "Roku Ultra", category: "Домашние развлечения", price: "7920", description: "Потоковый медиаплеер с поддержкой 4K.", rating: 4.6 },
  { id: 35, name: "Chromecast with Google TV", category: "Домашние развлечения", price: "3920", description: "Потоковый медиаплеер с поддержкой 4K.", rating: 4.8 },
  { id: 36, name: "NVIDIA Shield TV Pro", category: "Домашние развлечения", price: "15920", description: "Потоковый медиаплеер для игр и приложений.", rating: 4.9 },
  { id: 37, name: "Anker PowerCore 10000", category: "Электронные аксессуары", price: "2320", description: "Компактная портативная зарядка.", rating: 4.6 },
  { id: 38, name: "Belkin MagSafe Charger", category: "Электронные аксессуары", price: "3120", description: "Беспроводная зарядка для iPhone с MagSafe.", rating: 4.7 },
  { id: 39, name: "SanDisk 1TB Extreme Portable SSD", category: "Электронные аксессуары", price: "19920", description: "Прочный портативный SSD для быстрой передачи данных.", rating: 4.9 },
  { id: 40, name: "UGreen USB-C Hub", category: "Электронные аксессуары", price: "3120", description: "Адаптер для расширения портов на ноутбуке.", rating: 4.6 },
  { id: 41, name: "DualSense Wireless Controller", category: "Игровые аксессуары", price: "5520", description: "Беспроводной геймпад для PlayStation 5.", rating: 4.8 },
  { id: 42, name: "Xbox Elite Series 2 Controller", category: "Игровые аксессуары", price: "14320", description: "Профессиональный геймпад с дополнительными функциями.", rating: 4.9 },
  { id: 43, name: "HyperX Cloud II Gaming Headset", category: "Игровые аксессуары", price: "7920", description: "Геймерские наушники с виртуальным 7.1 звуком.", rating: 4.7 },
  { id: 44, name: "Logitech G Pro Wireless Mouse", category: "Игровые аксессуары", price: "10320", description: "Игровая мышь с низкой задержкой.", rating: 4.6 },
  { id: 45, name: "Apple Watch Series 8", category: "Смарт-часы и фитнес-трекеры", price: "31920", description: "Умные часы с мониторингом здоровья и активности.", rating: 4.9 },
  { id: 46, name: "Samsung Galaxy Watch 5 Pro", category: "Смарт-часы и фитнес-трекеры", price: "23920", description: "Фитнес-часы с длительным временем автономной работы.", rating: 4.8 },
  { id: 47, name: "Fitbit Charge 5", category: "Смарт-часы и фитнес-трекеры", price: "14320", description: "Фитнес-браслет с дисплеем и мониторингом сна.", rating: 4.7 },
  { id: 48, name: "Garmin Forerunner 945", category: "Смарт-часы и фитнес-трекеры", price: "39920", description: "Спортивные часы с GPS и функцией мониторинга тренировок.", rating: 4.9 },
];

function Product() {
  const { id } = useParams();
  const { addToCart, cartItems } = useContext(CartContext);
  const [isInCart, setIsInCart] = useState(false);
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (product) {
      setIsInCart(cartItems.some((item) => item.id === product.id));
    }
  }, [cartItems, product]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  useEffect(() => {
    if (product) {
      const storedProducts = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
      const updatedProducts = [product, ...storedProducts.filter((p) => p.id !== product.id)].slice(0, 6);
      localStorage.setItem("recentlyViewed", JSON.stringify(updatedProducts));
    }
  }, [product]);

  const handleViewCart = () => {
    navigate("/cart");
  };

  return (
    <div className="product">
      <Link to="/catalog" className="back-button">
        Назад
      </Link>
      <h1>{product?.name || "Товар не найден"}</h1>
      {product ? (
        <>
          <img src={product.image} alt={product.name} className="product-image" />
          <p>Категория: {product.category}</p>
          <p>Цена: {product.price} ₽</p>
          <p>{product.description}</p>
          <p>Рейтинг: {product.rating.toFixed(1)} / 5</p>
          {isInCart ? (
            <button onClick={handleViewCart} className="view-cart-button">
              Товар уже добавлен в корзину
            </button>
          ) : (
            <button onClick={handleAddToCart} className="add-to-cart-button">
              Добавить в корзину
            </button>
          )}
          <h3>Похожие товары:</h3>
          <ul className="similar-products">
            {products
              .filter((p) => p.category === product.category && p.id !== product.id)
              .map((relatedProduct) => (
                <li key={relatedProduct.id}>
                  <Link to={`/product/${relatedProduct.id}`} className="view-details">
                    {relatedProduct.name}
                  </Link>
                </li>
              ))}
          </ul>
        </>
      ) : (
        <p>Такого товара не существует.</p>
      )}
    </div>
  );
}

export default Product;