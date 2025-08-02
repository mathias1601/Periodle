import React from 'react'
import '../styles/grid.css';
import { PeriodElement } from '../types/periodElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

interface Props {
	guessList: PeriodElement[]
	correctElement: PeriodElement
}

const Grid = ({ guessList, correctElement }: Props) => {

	const displayGuesses = guessList.map((guess, index) => (
		<div key={index} className='grid grid-cols-4'>

			<div className={(correctElement.name === guess.name) ? 'correctGuess' : 'wrongGuess'}>
				{guess.name}
			</div>

			<div className={(correctElement.atomicNumber === guess.atomicNumber) ? 'correctGuess' : 'wrongGuess'}>
				{guess.atomicNumber}
				{correctElement.atomicNumber > guess.atomicNumber ? <FontAwesomeIcon icon={faArrowUp} /> : null}
				{correctElement.atomicNumber < guess.atomicNumber ? <FontAwesomeIcon icon={faArrowDown} /> : null}
			</div>

			<div className={(correctElement.group === guess.group) ? 'correctGuess' : 'wrongGuess'}>
				{guess.group}
				{correctElement.group > guess.group ? <FontAwesomeIcon icon={faArrowUp} /> : null}
				{correctElement.group < guess.group ? <FontAwesomeIcon icon={faArrowDown} /> : null}
			</div>

			<div className={(correctElement.period === guess.period) ? 'correctGuess' : 'wrongGuess'}>
				{guess.period}
				{correctElement.period > guess.period ? <FontAwesomeIcon icon={faArrowUp} /> : null}
				{correctElement.period < guess.period ? <FontAwesomeIcon icon={faArrowDown} /> : null}
			</div>
		</div>
	))

	return (
		<div>
			<div className='grid grid-cols-4'>
				<div className='column'>
					Element Name
				</div>
				<div className='column'>
					Atomic Number
				</div>
				<div className='column'>
					Group
				</div>
				<div className='column'>
					Period
				</div>
			</div>
			{displayGuesses}
		</div>
	)
}

export default Grid