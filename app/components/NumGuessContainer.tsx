import React from 'react'
import '../styles/numGuess.css'

interface Props {
	maxGuesses: number
	numberOfGuesses: number
}


const NumGuessContainer = ({ maxGuesses, numberOfGuesses }: Props) => {

	const guessesLeft = () => {
		return Array.from({ length: numberOfGuesses }).map((_, index) => (
			<div key={index} className='activeGuess'>
			</div>
		))
	}
	const guessesUsed = () => {
		return Array.from({ length: maxGuesses - numberOfGuesses }).map((_, index) => (
			<div key={index} className='inactiveGuess'>
			</div>
		))
	}

	const allGuesses = [...guessesLeft(), ...guessesUsed()]

	const displayGuesses = allGuesses.map((guess, index) => (
		<div key={index}>
			{guess}
		</div>
	))

	return (
		<div>
			<p>Guesses left:</p>
			<div className='mainContainer'>
				{displayGuesses}
			</div>
		</div>
	)
}

export default NumGuessContainer