'use client'
import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import useHardModeStore from '../store/useHardModeStore';

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