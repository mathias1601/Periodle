import React from 'react'
import '../styles/overlay.css'

interface Props {
	win: Boolean
	isOpen: boolean
	onClose: () => void
	children: any
}

const EndingScreenOverlay = ({ win, isOpen, onClose, children }: Props) => {

	return (
		<>
			{isOpen ?
				<div className='overlay'>
					<div className='overlay_background' onClick={onClose} />
					<div className='overlay_container'>
						<div className='overlay_controls'>
							<button className='overlay_close' type='button' onClick={onClose} />
						</div>
						{win ?
							<div>Yippie!</div>
							:
							<div>WOOOMPP WOOOOMPP</div>
						}
						{children}
					</div>
				</div>
				: null
			}
		</>
	)
}

export default EndingScreenOverlay