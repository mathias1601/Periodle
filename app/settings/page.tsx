'use client'
import Link from 'next/link'
import React from 'react'
import '../styles/settings.css'
import ToggleButton from '../components/ToggleButton'
import useHardModeStore from '../store/useHardModeStore'


const Page = () => {

    // useStore zustand
    const hardmode = useHardModeStore((state) => state.hardmode)
    const setHardmode = useHardModeStore((state) => state.setHardmode)

    return (
        <div className='settingsPage'>
            <div className='subpageHeader'>
                <Link href='/'>
                    <button className='backButton'>Back</button>
                </Link>
                <h1>Settings</h1>
            </div>
            <div className='settingsPanel'>
                <div>
                    <h2>Hard mode</h2>
                    <p>Hide higher/lower arrows after each guess.</p>
                </div>
                <ToggleButton handleChange={() => setHardmode(!hardmode)} checkedState={hardmode} />
            </div>
        </div>
    )
}

export default Page
