import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NavBarItem from './NavBarItem'
import { Icon } from '@iconify/react'

const Header = ({darkMode, setDarkMode}) => {
  const user = useSelector((state)=> state.user.currentUser)
  const [showDropdown, setShowDropdown] = useState(false)
  const [toggleOpen, setToggleOpen] = useState(false)
    const [hover, setHover] = useState(false)



  return (
    <div className={`flex w-full justify-center bg-slate-200 text-black dark:bg-slate-600 dark:text-white transition-all duration-300 ${toggleOpen ? 'h-44' : 'h-11'}`} >
      <div className="flex w-full justify-between px-3" >
        <div
          id="expand-button"
          className="scale(75) w-10 h-9 rotate-0 transition-all duration-500 cursor-pointer relative"
          onClick={() => {console.log('toggle'); setToggleOpen(!toggleOpen)}}>
          <span className={`block absolute h-0.5 w-3/5 rounded opacity-100 left-2 rotate-0 transition-all duration-250 opacity-100 ${toggleOpen ? 'w-0 top-2 bg-transparent' : 'bg-black dark:bg-white top-0'}`}></span>
          <span className={`block absolute h-0.5 w-3/5 bg-black dark:bg-white rounded opacity-100 left-2  transition-all duration-250 top-2 ${toggleOpen ? 'rotate-45' : 'top-2'}`}></span>
          <span className={`block absolute h-0.5 w-3/5 bg-black dark:bg-white rounded opacity-100 left-2  transition-all duration-250 top-2 ${toggleOpen ? '-rotate-45' : 'top-2'}`}></span>
          <span className={`block absolute h-0.5 w-3/5 rounded opacity-100 left-2 rotate-0 transition-all duration-250 opacity-100 ${toggleOpen ? 'w-0 top-2 bg-transparent' : 'bg-black dark:bg-white top-4'}`}></span>
        </div>
        <div className='flex h-8 w-8 hover:cursor-pointer hover:bg-white/25 rounded-full p-1' onClick={() => setDarkMode(!darkMode)}>
          <Icon className='w-full h-full' icon={darkMode ? 'ph:sun-bold' : 'ph:moon-bold'} />
        </div>
      </div>
    </div>

  )
}

export default Header