import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from "./App.css";

import Info from "./components/Info";
import Keyboard from "./components/Keyboard";
import Winner from "./components/Winner";

function App() {
  const [urlNumber, setUrlNumber] = useState(1);
  const url = `https://api.hatchways.io/assessment/sentences/${urlNumber}`;
  const [sentence, setSentence] = useState(null);
  let sentenceArray = [[], [], [], [], []];
  const [scrambledSentence, setScrambledSentence] = useState();
  let comparisonSentenceArray = [[], [], [], [], []];
  let scrambledSentenceArray = [[], [], [], [], []];
  const [dataLoaded, setDataLoaded] = useState(false);
  const [answer, setAnswer] = useState( [[], [], [], [], []] );
  const [winner, setWinner] = useState(false);
  const [score, setScore] = useState(0);
  let endX;
  let endY;

  // Gets data
  useEffect(() => {
    axios.get(url).then((response) => {
      setSentence(response.data.data.sentence);
      setScrambledSentence(response.data.data.sentence);
      setDataLoaded(true)
      scramble()
      setWinner(false)
    });
  }, [url]);

  // Calls scramble function when data loads
  useEffect(() => {
    scramble()
  }, [dataLoaded])

  // Splits sentence in to sentence array
  if (dataLoaded) {
    let array = sentence.split("");
    let z = 0;
    array.map((x) => {
      sentenceArray[z].push(x)
      comparisonSentenceArray[z].push(x.toLowerCase())
      if (x === " ") {
        z++;
      } 
    });
    endX = z;
    endY = sentenceArray[endX].length
  }

  // Scrambles sentence
  const scramble = (scrambledSentenceArray) => {
    scrambledSentenceArray = sentenceArray;
    scrambledSentenceArray.forEach((element) => {
      if (element[element.length - 1] === ' ') {
        element.splice(-1)
      }
      if (element.length > 3) {
        for (let i = element.length - 2; i > 1; i--) {
          let x = Math.floor(Math.random() * (element.length - 2)) + 1;
          let temp = element[i];
          element[i] = element[x];
          element[x] = temp;
        }
      }
    });
    let q = scrambledSentenceArray[0].join("") + " " + scrambledSentenceArray[1].join("") + " " + scrambledSentenceArray[2].join("") + " " + scrambledSentenceArray[3].join("") + " " + scrambledSentenceArray[4].join("");
    return setScrambledSentence(q);
  };

  // Keyboard input handler, sets answer state
  const handleInputChange = (e, index, xIndex, yIndex) => {
    let x = e.key.toLowerCase()
    if (x === 'tab' || x === 'shift' || x === 'capslock' || x === 'control' || x === 'alt' || x === 'enter') {
      if (winner === true && x === 'enter') {
        next(urlNumber)
      }
    } else if(x === 'backspace') {
      if(xIndex === 0 && yIndex === 1) {} else {
        document.getElementById(parseInt(document.activeElement.id) - 1).classList.remove('correct')
        document.getElementById(parseInt(document.activeElement.id) - 1).focus();
        document.getElementById(parseInt(document.activeElement.id)).value = '';
        setAnswer([...answer],  answer[index].splice(-1))
      }
    } else if(x >= 'a' && x <= 'z' || x === ' '){
      setAnswer([...answer],  answer[index].push(x))
      if(xIndex === endX && yIndex === endY) {
        
      } else {  
        document.getElementById(parseInt(document.activeElement.id) + 1).focus();
      }
    } else {
      alert('Input must be a letter')
    }
    checkAnswer(answer, comparisonSentenceArray)
  }

  // Checks answer and changes style
  useEffect(() => {
    answer.forEach((x, index) => {
      let xIndex = index
      x.forEach((y, index) => {
        console.log(y)
        console.log(comparisonSentenceArray[xIndex][index])
        console.log('x:' + xIndex)
        console.log('y:' + index)
        if(y === comparisonSentenceArray[xIndex][index]) {
          console.log('match')
          document.getElementById(parseInt(document.activeElement.id)-1).classList.add('correct')
        }
        
      })
    })
  }, [answer])

  // Checks to see if input matches answer
  const checkAnswer = (answer, comparisonSentenceArray) => {
    let c = JSON.stringify(comparisonSentenceArray)
    let a = JSON.stringify(answer)
    setWinner(c === a)
  }

  // Next function when next button is displayed
  const next = (urlNumber) => {
    if (urlNumber === 10) {
      document.getElementById('winner-container').style.display = 'block';
    } else {
      setDataLoaded(false)
      setAnswer([ [], [], [], [], []] )
      setUrlNumber(urlNumber + 1)
      setWinner(false)
      incrementCount()
    }
  }

  // Increase score count state
  const incrementCount = () => {
    setScore(score + 1)
  }

  useEffect(() => {
    if(dataLoaded){
      if (winner === true) {
        document.getElementById('nextButton').style.display = 'inline-block';
      } else {
        document.getElementById('nextButton').style.display = 'none';
      }
    }
  })

  if (sentence === null) {
    return <p>loading...</p>;
  } else {
    return (
      <div className="App">
        <div className="container">
          <Info
            sentence={sentence}
            scrambledSentence={scrambledSentence}
            scramble={scramble}
            score={score}
          />
          <Keyboard sentenceArray={sentenceArray} handleInputChange={handleInputChange}/>
          <button className='nextButton' id='nextButton' onClick={() => next(urlNumber)}>NEXT</button>
          <Winner />
        </div>
      </div>
    );
  }
}

export default App;
