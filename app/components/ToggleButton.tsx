'use client'
import React from 'react';
import Switch from '@mui/material/Switch';

interface Props {
	checkedState: boolean
	handleChange: () => void
}


const ToggleButton = ({ checkedState, handleChange }: Props) => {

	return (
		<Switch
			checked={checkedState}
			onChange={() => { handleChange() }}
		/>
	);
}


export default ToggleButton;