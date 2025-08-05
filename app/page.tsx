'use client'
import Grid from './components/Grid';
import Search from './components/Search';
import { periodicTable } from './global_variables/elements';
import { PeriodElement } from './types/periodElement';
import { useEffect, useState } from "react";
import EndingScreenOverlay from './components/EndingScreenOverlay';
import NumGuessContainer from './components/NumGuessContainer';

export default function Home() {

  const maxGuesses = 5

  const [score, setScore] = useState<number>(0)
  const [highscore, setHighscore] = useState<number>(0)

  const [correctElement, setCorrectElement] = useState<PeriodElement>();
  const [guessedElement, setGuessedElement] = useState<string>("");
  const [guessNumber, setGuessNumber] = useState<number>(0);
  const [win, setWin] = useState<Boolean>(false);
  const [guessList, setGuessList] = useState<PeriodElement[]>([]);

  // UseState for the search bar
  const [search, setSearch] = useState<string>("")
  const [firstSixMatching, setFirstSixMatching] = useState<PeriodElement[]>([]);

  // UseState for the overlay menu
  const [isOverlayOpen, setIsOverlayOpen] = useState<boolean>(false);

  //Loads the local storage to get pre-existing highcsore
  useEffect(() => {
    const savedHighScore = localStorage.getItem('highscore');
    const savedCurrentScore = localStorage.getItem('currentscore');
    if (savedHighScore) {
      setHighscore(JSON.parse(savedHighScore));
    }
    if (savedCurrentScore) {
      setHighscore(JSON.parse(savedCurrentScore));
    }
  }, []);

  //Saves the highscore and current score to local storage on the browser
  useEffect(() => {
    localStorage.setItem('highscore', JSON.stringify(highscore));
    localStorage.setItem('currentscore', JSON.stringify(score));
  }, [highscore]);

  const fetchElementData = async (name: string) => {
    const res = await fetch(`/api/?name=${name}`);
    const data = await res.json();

    setCorrectElement(data.data.data.name)
    console.log(data)
  };

  // Api data fetcher
  /* useEffect(() => {
    const randomElementIndex = Math.floor(Math.random() * periodicTable.length + 1)

    var query = {
      name: periodicTable[randomElementIndex].name
    };

    fetchElementData(query.name)
  }, []) */


  useEffect(() => {
    if (guessedElement === "") {
      return
    }

    if (guessedElement === correctElement?.name) {
      setWin(true)
    }
    else {
      setGuessNumber(guessNumber + 1)
    }

    setGuessList(prev => [...prev, periodicTable.find(element => element.name === guessedElement)])
  }, [guessedElement])

  // Local data fetcher
  useEffect(() => {
    getElementData()
  }, [])

  const getElementData = () => {
    const randomElementIndex = Math.floor(Math.random() * periodicTable.length)
    setCorrectElement(periodicTable[randomElementIndex])
  }

  useEffect(() => {
    if ((guessNumber === maxGuesses && !win) || win) {
      setIsOverlayOpen(true);
    }
    if (win) {
      setScore(prevScore => {
        const newScore = prevScore + 1;
        if (newScore > highscore) {
          setHighscore(newScore);
        }
        return newScore;
      });
    }
    if (guessNumber === maxGuesses && !win) {
      setScore(0)
    }
  }, [guessNumber, win]);

  const tryAgain = () => {
    getElementData()
    setGuessList([])
    setGuessNumber(0)
    setWin(false)
    setIsOverlayOpen(false)
    setSearch("")
    setFirstSixMatching([])
  }


  return (
    <div className='mainHome'>
      <h1>Periodle</h1>
      <p>Current Score: {score}</p>
      <p>Highscore: {highscore}</p>
      <NumGuessContainer maxGuesses={maxGuesses} numberOfGuesses={maxGuesses - guessNumber} />
      <Search setGuessedElement={setGuessedElement} search={search} setSearch={setSearch} firstSixMatching={firstSixMatching} setFirstSixMatching={setFirstSixMatching} />
      {correctElement?.name}
      <Grid guessList={guessList} correctElement={correctElement} />

      <EndingScreenOverlay win={win} isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => tryAgain()}>Continue</button>
      </EndingScreenOverlay>
    </div>
  );
}
