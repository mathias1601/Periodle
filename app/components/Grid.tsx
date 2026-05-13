import React from 'react'
import '../styles/grid.css';
import { PeriodElement } from '../types/periodElement';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import useHardModeStore from '../store/useHardModeStore';

interface Props {
	guessList: PeriodElement[]
	correctElement: PeriodElement | undefined
}

const keys: (keyof PeriodElement)[] = [
	"name",
	"atomicNumber",
	"period",
	"group",
	"stateAtRoomTemp",
	"category",
	"meltingPoint",
	"yearDiscovered"
];

const Grid = ({ guessList, correctElement }: Props) => {

	// useStore zustand
	const hardmode = useHardModeStore((state) => state.hardmode)

	const displayGuesses = guessList.map((guess, index) => (
		<div key={index} className='guessGrid'>
			{keys.map((key) => {
				const guessValue = guess[key]
				const correctValue = correctElement ? correctElement[key] : undefined

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
		<div className='gridShell'>
			<div className='guessGrid guessGridHeader'>
				<div className='column'>
					Element
				</div>
				<div className='column'>
					Atomic no.
				</div>
				<div className='column'>
					Period
				</div>
				<div className='column'>
					Group
				</div>
				<div className='column'>
					State
				</div>
				<div className='column'>
					Category
				</div>
				<div className='column'>
					Melting pt.
				</div>
				<div className='column'>
					Year
				</div>
			</div>
			{displayGuesses}
		</div>
	)
}

export default Grid
