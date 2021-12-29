import React from "react";

import classes from "./Keyboard.css";

function Keyboard(props) {
  const { sentenceArray, handleInputChange } = props;
  let y = 0;
  let z = 0;

  return (
    <div className="large-flex-container" id='keyboard'>
      {sentenceArray.map((element, index) => {
        let x = 1;
        let xIndex = index
        y++
        if (element.length > 0) {
          return (
            <div className="flex-container" key={index}>
              {element.map((element) => {
                z++
                let yIndex = x;
                x++
                return (
                  <div className="character" key={z}>
                    {element === ' ' && <input type="text" maxLength="1" className='space' autoFocus={xIndex === 0 && yIndex === 1} id={z} onKeyUp={(e) => handleInputChange(e, index, xIndex, yIndex)}/>}
                    {element !== ' ' && <input type="text" maxLength="1" autoFocus={xIndex === 0 && yIndex === 1} id={z} onKeyUp={(e) => handleInputChange(e, index, xIndex, yIndex)}/>}
                  </div>
                );
              })}
            </div>
          );
        }
      })}
    </div>
  );
}

export default Keyboard;
