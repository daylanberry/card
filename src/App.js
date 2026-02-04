import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [yesPosition, setYesPosition] = useState({ top: null, left: null });
  const [accepted, setAccepted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [noSize, setNoSize] = useState(1);
  const [yesSize, setYesSize] = useState(1);
  const [attempts, setAttempts] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const floatingHearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: 3 + Math.random() * 4,
    size: 15 + Math.random() * 20,
  }));

  const moveButton = (e) => {
    e.preventDefault();

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    // After 10 attempts, show the modal instead of moving
    if (newAttempts >= 10) {
      setShowModal(true);
      return;
    }

    setIsAnimating(true);
    setNoSize((prev) => Math.max(0.4, prev - 0.1));
    setYesSize((prev) => prev + 0.1);
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    const newX = Math.max(10, Math.random() * maxX);
    const newY = Math.max(10, Math.random() * maxY);
    setYesPosition({ top: newY, left: newX });
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  const handleModalYes = () => {
    setShowModal(false);
    setAccepted(true);
  };

  if (accepted) {
    return (
      <div className="container success-bg">
        <div className="confetti-container">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                backgroundColor: [
                  "#ff6b6b",
                  "#ffd93d",
                  "#6bcb77",
                  "#4d96ff",
                  "#ff6eb4",
                ][Math.floor(Math.random() * 5)],
              }}
            />
          ))}
        </div>
        <div className="success-card">
          <div className="success-heart">💖</div>
          <h1 className="success-title">Yay!</h1>
          <p className="success-message">I knew you'd say yes!</p>
          <p className="success-submessage">
            You've made me the happiest person! 🥰
          </p>
          <div className="hearts-row">
            {["💕", "💗", "💖", "💗", "💕"].map((heart, i) => (
              <span
                key={i}
                className="bouncing-heart"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {heart}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-emoji">😅</div>
            <h2 className="modal-title">Okay, okay, you win!</h2>
            <p className="modal-message">
              After {attempts} attempts, I admire your persistence!
            </p>
            <p className="modal-submessage">
              You clearly REALLY want to be my Valentine... and honestly? That's
              adorable. 🥺
            </p>
            <p className="modal-thanks">Thanks for not giving up on us! 💕</p>
            <button className="btn modal-yes-button" onClick={handleModalYes}>
              YES! I'll be your Valentine! 💖
            </button>
          </div>
        </div>
      )}

      <div className="floating-hearts">
        {floatingHearts.map((heart) => (
          <div
            key={heart.id}
            className="floating-heart"
            style={{
              left: `${heart.left}%`,
              animationDelay: `${heart.delay}s`,
              animationDuration: `${heart.duration}s`,
              fontSize: `${heart.size}px`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-emoji">🌹</div>
        <h1 className="title">Will you be my Valentine?</h1>
        <p className="subtitle">I promise to make you smile every day 💫</p>

        <div className="button-container">
          <button
            className={`btn yes-button ${isAnimating ? "pop-animation" : ""}`}
            style={{
              ...(yesPosition.top !== null
                ? {
                    position: "fixed",
                    top: yesPosition.top,
                    left: yesPosition.left,
                  }
                : {}),
              transform: `scale(${yesSize})`,
            }}
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={handleYesClick}
          >
            Yes! 💕
          </button>
          <button
            className="btn no-button"
            style={{ transform: `scale(${noSize})` }}
            disabled
          >
            No 😢
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
