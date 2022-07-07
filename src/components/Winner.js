import React from "react";

import "./Winner.css";

function Winner() {
  const playAgain = () => {
    window.location.reload();
  };

  return (
    <div className="winner-container" id="winner-container">
      <div className="winner" id="winner">
        <p className="text">You Win!</p>
        <button className="nextButton" id="playAgain" onClick={playAgain}>
          Play Again
        </button>
      </div>
    </div>
  );
}

export default Winner;
