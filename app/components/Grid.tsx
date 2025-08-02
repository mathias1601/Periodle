import React from 'react'
import '../styles/grid.css';
import { PeriodElement } from '../types/periodElement';

interface Props {
	guessList: PeriodElement[]
	correctElement: PeriodElement
}

const Grid = ({ guessList, correctElement }: Props) => {

	const displayGuesses = guessList.map((guess, index) => (
		<div key={index} className='grid grid-cols-4'>

			{(correctElement.name === guess.name)
				?
				<div className='correctGuess'>
					{guess.name}
				</div>
				:
				<div className='wrongGuess'>
					{guess.name}
				</div>
			}

			{(correctElement.atomicNumber === guess.atomicNumber)
				?
				<div className='correctGuess'>
					{guess.atomicNumber}
				</div>
				:
				<div className='wrongGuess'>
					{guess.atomicNumber}
				</div>
			}

			{(correctElement.group === guess.group)
				?
				<div className='correctGuess'>
					{guess.group}
				</div>
				:
				<div className='wrongGuess'>
					{guess.group}
				</div>
			}

			{(correctElement.period === guess.period)
				?
				<div className='correctGuess'>
					{guess.period}
				</div>
				:
				<div className='wrongGuess'>
					{guess.period}
				</div>
			}
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