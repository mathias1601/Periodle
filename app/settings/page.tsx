'use client'
import Link from 'next/link'
import React from 'react'
import '../styles/settings.css'
import ToggleButton from '../components/ToggleButton'
import useHardModeStore from '../store/useHardModeStore'


const page = () => {

    // useStore zustand
    const hardmode = useHardModeStore((state) => state.hardmode)
    const setHardmode = useHardModeStore((state) => state.setHardmode)

    return (
        <div>
            <div>
                <Link href='/'>
                    <button className='backButton'>Back</button>
                </Link>
                <h1>Settings</h1>
            </div>
            <p>Hard-mode</p>
            <ToggleButton handleChange={() => setHardmode(!hardmode)} checkedState={hardmode} />
        </div>
    )
}

export default page