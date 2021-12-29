import React from "react";

import classes from "./Info.css";

function Info(props) {
  const { sentence, scrambledSentence, scramble, score } = props;

  return (
    <>
      <div id="scrambled-word">
        {/* <h1 className="scrambledWord">{sentence}</h1> */}
        <h1 className="scrambledWord">{scrambledSentence}</h1>
        <p>Guess the sentence! Start typing</p>
        <p>The yellow blocks are meant for spaces</p>
        <h2>Score: {score}</h2>
      </div>
      {/* <button onClick={() => scramble(sentence)}>SCRAMBLE</button> */}
    </>
  );
}

export default Info;
