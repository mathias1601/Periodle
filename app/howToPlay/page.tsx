import Link from 'next/link'
import React from 'react'
import '../styles/howToPlay.css'

const page = () => {
	return (
		<div>
			<div>
				<Link href='/'>
					<button className='backButton'>Back</button>
				</Link>
				<h1>How to play</h1>
			</div>

			<div className='howToPlayContainer'>
				<div className='section'>
					<p>The goal is to guess an element in the periodic table without running out of guesses.
						Each guess will give you hint to how close your guess were. Red indicates an incorrect value, with an arrow pointing either up or down.</p>
					<p>For example, a down-pointing arrow indicates that the value is too high. Green indicates a correct value, meaning that the correct element must have this value.</p>
				</div>

				<div className='section'>
					<p className='guessNumberExample'>Amount of guesses remaining are shown here: <img src="/guessNumberImg.png" alt="" /></p>
					<p>You will lose when all guesses are depleted.</p>
				</div>

				<div className='section'>
					Have fun!
				</div>
			</div>

		</div>
	)
}

export default page