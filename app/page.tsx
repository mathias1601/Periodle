'use client'
import Grid from './components/Grid';
import Search from './components/Search';
import { periodicTable } from './global_variables/elements';
import { PeriodElement } from './types/periodElement';
import { useEffect, useState } from "react";


export default function Home() {

  const maxGuesses = 5

  const [correctElement, setCorrectElement] = useState<PeriodElement>();
  const [guessedElement, setGuessedElement] = useState<string>("");
  const [guessNumber, setGuessNumber] = useState<number>(0);
  const [win, setWin] = useState<Boolean>(false);
  const [guessList, setGuessList] = useState<PeriodElement[]>([]);

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
    console.log("test")
    setGuessList(prev => [...prev, periodicTable.find(element => element.name === guessedElement)])
    setGuessNumber(guessNumber + 1)
  }, [guessedElement])

  // Local data fetcher
  useEffect(() => {
    const randomElementIndex = Math.floor(Math.random() * periodicTable.length)

    setCorrectElement(periodicTable[randomElementIndex])
  }, [])


  if (guessNumber == maxGuesses && !win) {
    return (
      <div>Game over</div>
    )
  }


  return (
    <div>
      <Search setGuessedElement={setGuessedElement} />
      {correctElement?.name}
      <Grid guessList={guessList} correctElement={correctElement} />
      {win ? <p>Yippie!</p> : null}
    </div>
  );
}
