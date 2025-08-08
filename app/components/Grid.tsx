import React from 'react'
import '../styles/grid.css';
import { PeriodElement } from '../types/periodElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import useHardModeStore from '../store/useHardModeStore';

interface Props {
	guessList: PeriodElement[]
	correctElement: PeriodElement
}

const keys: (keyof PeriodElement)[] = [
	"name",
	"period",
	"group",
	"atomicNumber",
	"stateAtRoomTemp",
	"category",
	"meltingPoint",
	"yearDiscovered"
];

const Grid = ({ guessList, correctElement }: Props) => {

	// useStore zustand
	const hardmode = useHardModeStore((state) => state.hardmode)

	const displayGuesses = guessList.map((guess, index) => (
		<div key={index} className='grid grid-cols-8'>
			{keys.map((key) => {
				const guessValue = guess[key]
				const correctValue = correctElement[key]

				const isCorrect = guessValue === correctValue
				const showArrow = !hardmode && typeof guessValue === "number" && typeof correctValue === "number"

				return (
					<div key={key} className={isCorrect ? "correctGuess" : "wrongGuess"}>
						{guessValue}
						{showArrow && (
							<div>
								{correctValue > guessValue && <FontAwesomeIcon icon={faArrowUp} />}
								{correctValue < guessValue && <FontAwesomeIcon icon={faArrowDown} />}
							</div>
						)}
					</div>
				)
			})}

		</div>
	))

	return (
		<div>
			<div className='grid grid-cols-8'>
				<div className='column'>
					Element Name
				</div>
				<div className='column'>
					Atomic Number
				</div>
				<div className='column'>
					Period
				</div>
				<div className='column'>
					Group
				</div>
				<div className='column'>
					State at room temp
				</div>
				<div className='column'>
					Category
				</div>
				<div className='column'>
					Melting point
				</div>
				<div className='column'>
					Year discovered
				</div>
			</div>
			{displayGuesses}
		</div>
	)
}

export default Grid