'use client'
import Grid from './components/Grid';
import Search from './components/Search';
import { periodicTable } from './global_variables/elements';
import { PeriodElement } from './types/periodElement';
import { useEffect, useState } from "react";
import EndingScreenOverlay from './components/EndingScreenOverlay';
import NumGuessContainer from './components/NumGuessContainer';
import './styles/infoButton.css';
import Link from 'next/link';
import './styles/home.css';
import useScoreStore from './store/useScoreStore';
import useHighScoreStore from './store/useHighScoreStore';

export default function Home() {

  const maxGuesses = 5

  // useStore zustand
  const score = useScoreStore((state) => state.score)
  const highscore = useHighScoreStore((state) => state.highscore)

  const setScore = useScoreStore((state) => state.setScore)
  const setHighscore = useHighScoreStore((state) => state.setHighscore)

  const [correctElement, setCorrectElement] = useState<PeriodElement>();
  const [guessedElement, setGuessedElement] = useState<string>("");
  const [guessNumber, setGuessNumber] = useState<number>(0);
  const [win, setWin] = useState<boolean>(false);
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
      setScore(JSON.parse(savedCurrentScore));
    }
  }, []);

  //Saves the highscore and current score to local storage on the browser
  useEffect(() => {
    localStorage.setItem('highscore', JSON.stringify(highscore));
    localStorage.setItem('currentscore', JSON.stringify(score));
  }, [highscore, score]);


  useEffect(() => {
    if (guessedElement === "") {
      return
    }

    if (guessedElement === correctElement?.name) {
      setWin(true)
    }
    else {
      setGuessNumber(g => g + 1)
    }

    const foundElement = periodicTable.find(element => element.name === guessedElement);
    if (foundElement) {
      setGuessList(prev => [...prev, foundElement]);
    }

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
      const newScore = score + 1;
      setScore(newScore);
      if (newScore > highscore) {
        setHighscore(newScore);
      }
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
      <div className='titleSection'>
        <h1>Periodle</h1>
        <Link href='/howToPlay'>
          <button className='infoButton'></button>
        </Link>
      </div>
      <Link href='/settings'>
        <button>Settings</button>
      </Link>
      <p>Current Score: {score}</p>
      <p>Highscore: {highscore}</p>
      <NumGuessContainer maxGuesses={maxGuesses} numberOfGuesses={maxGuesses - guessNumber} />
      <Search setGuessedElement={setGuessedElement} search={search} setSearch={setSearch} firstSixMatching={firstSixMatching} setFirstSixMatching={setFirstSixMatching} />
      <Grid guessList={guessList} correctElement={correctElement} />

      <EndingScreenOverlay win={win} isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => tryAgain()}>Continue</button>
      </EndingScreenOverlay>
    </div>
  );
}
