// FeedbackButton.js
import React, { useState } from "react";
import FeedbackModal from "./FeedbackModal";
import "./FeedbackButton.css";

function FeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <button className="feedback-button" onClick={toggleModal}>
        🗪
      </button>
      {isModalOpen && <FeedbackModal onClose={toggleModal} />}
    </>
  );
}

export default FeedbackButton;
