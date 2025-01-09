import React, { useState } from "react";
import "./FeedbackModal.css";

function FeedbackModal({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!name) newErrors.name = "Поле Имя обязательно для заполнения";
    if (!email) {
      newErrors.email = "Поле Почта обязательно для заполнения";
    }
    if (email && !isValidEmail(email)) newErrors.email = "Неверный формат электронной почты";
    
    if (!subject) newErrors.subject = "Поле Тема обязательно для заполнения";
    if (!feedback) newErrors.feedback = "Поле Отзыв обязательно для заполнения";

    if (Object.keys(newErrors).length === 0) {
      console.log("Feedback submitted:", { name, email, subject, feedback });

      setIsSubmitted(true); 
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (field, value) => {
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }

    switch (field) {
      case "name":
        setName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "subject":
        setSubject(value);
        break;
      case "feedback":
        setFeedback(value);
        break;
      default:
        break;
    }
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
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ваше имя"
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <p className="error-text">{errors.name}</p>}

              <input
                type="email"
                value={email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="Ваша почта"
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <p className="error-text">{errors.email}</p>}

              <input
                type="text"
                value={subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                placeholder="Тема"
                className={errors.subject ? "input-error" : ""}
              />
              {errors.subject && <p className="error-text">{errors.subject}</p>}

              <textarea
                value={feedback}
                onChange={(e) => handleInputChange("feedback", e.target.value)}
                placeholder="Напишите ваш отзыв..."
                className={errors.feedback ? "input-error" : ""}
              />
              {errors.feedback && <p className="error-text">{errors.feedback}</p>}

              <button type="submit">Отправить</button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default FeedbackModal;
