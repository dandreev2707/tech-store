import React, { useState } from "react";
import "./FeedbackModal.css";

function FeedbackModal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isEmailValid(email)) {
      alert("Пожалуйста, введите корректный адрес электронной почты.");
      return;
    }

    console.log("Feedback submitted:", { name, email, subject, feedback });

    setIsSubmitted(true); // Показать сообщение об отправке
  };

  const handleOk = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div className="feedback-modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        {isSubmitted ? (
          <div className="success-message">
            <h3>Спасибо за ваш отзыв!</h3>
            <button onClick={handleOk}>OK</button>
          </div>
        ) : (
          <>
            <h2>Обратная связь</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ваше имя"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Ваша почта"
                required
              />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Тема"
                required
              />
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Напишите ваш отзыв..."
                required
              />
              <button type="submit">Отправить</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default FeedbackModal;
