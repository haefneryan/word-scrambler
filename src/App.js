import React, { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

import Info from './components/Info';
import Keyboard from "./components/Keyboard";

function App() {
  const url = 'https://api.hatchways.io/assessment/sentences/1'
  const [sentence, setSentence] = useState(null);
  let sentenceArray = ({
    word1: [],
    word2: [],
    word3: [],
    word4: [],
    word5: []
  });
  const [scrambledSentence, setScrambledSentence] = useState();
  const [dataLoaded, setDataLoaded] = useState(false);
  let scrambledSentenceArray = ({
    word1: [],
    word2: [],
    word3: [],
    word4: [],
    word5: []
  });

  const getData = async () => {
    await axios.get(url).then(response => {
      console.log(response)
      setSentence(response.data.data.sentence)
      setScrambledSentence(response.data.data.sentence)
      setDataLoaded(true)
    })
  }

  useEffect(() => {
    getData();
  }, [url]);

  // useEffect(() => {
  //   console.log('scramble')
  //   if (dataLoaded) {
  //     scramble(sentence);
  //     console.log('scramble')
  //   }
  // }, [sentence]);

  if(dataLoaded) {
    let array = sentence.split('')
    console.log(array)
    let z = 1;
    array.map(x => {
      if (x === ' ') {
        z++
      } else {
        if (z === 1) {
          sentenceArray.word1.push(x)
          scrambledSentenceArray.word1.push(x)
        } else if (z === 2 ) {
          sentenceArray.word2.push(x)
          scrambledSentenceArray.word2.push(x)
        } else if (z === 3 ) {
          sentenceArray.word3.push(x)
          scrambledSentenceArray.word3.push(x)
        } else if (z === 4 ) {
          sentenceArray.word4.push(x)
          scrambledSentenceArray.word4.push(x)
        } else if (z === 5 ) {
          sentenceArray.word5.push(x)
          scrambledSentenceArray.word5.push(x)
        }
      }
    })
    console.log(sentenceArray)
  }

  const scramble = (sentence) => {
    let array = sentence.split('')
    console.log(array)
    let z = 1;
    array.map(x => {
      if (x === ' ') {
        z++
      } else {
        if (z === 1) {
          sentenceArray.word1.push(x)
          scrambledSentenceArray.word1.push(x)
        } else if (z === 2 ) {
          sentenceArray.word2.push(x)
          scrambledSentenceArray.word2.push(x)
        } else if (z === 3 ) {
          sentenceArray.word3.push(x)
          scrambledSentenceArray.word3.push(x)
        } else if (z === 4 ) {
          sentenceArray.word4.push(x)
          scrambledSentenceArray.word4.push(x)
        } else if (z === 5 ) {
          sentenceArray.word5.push(x)
          scrambledSentenceArray.word5.push(x)
        }
      }
    })
    console.log(sentenceArray)
    Object.values(scrambledSentenceArray).forEach(element => {
      if (element.length >= 3) {
        for (let i = element.length - 2; i > 1; i--) {
          let x = Math.floor(Math.random() * (element.length - 2)) + 1;
          let temp = element[i]
          element[i] = element[x]
          element[x] = temp
        }
      }
    });
    let q = scrambledSentenceArray.word1.join('') + ' ' + scrambledSentenceArray.word2.join('') + ' ' + scrambledSentenceArray.word3.join('') + ' ' + scrambledSentenceArray.word4.join('') + ' ' + scrambledSentenceArray.word5.join('')
    setScrambledSentence(q)
  }

  if (sentence === null) {
    return (
      <p>loading...</p>
    )
  } else {
    return (
      <div className="App">
        <div className="container">
          <Info sentence={sentence} scrambledSentence={scrambledSentence} scramble={scramble}/>
          <Keyboard sentenceArray={sentenceArray}/>
        </div>
      </div>
    );
  }
}

export default App;
