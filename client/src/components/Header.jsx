import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import NavBarItem from './NavBarItem'
import { Icon } from '@iconify/react'
import PopoutButton from './PopoutButton'

const Header = ({darkMode, setDarkMode}) => {
  const user = useSelector((state)=> state.user.currentUser)
  const [showDropdown, setShowDropdown] = useState(false)
  const [toggleOpen, setToggleOpen] = useState(false)
  const [hover, setHover] = useState(false)



  return (
    <div className={`flex w-full justify-center bg-slate-200 text-black dark:bg-slate-600 dark:text-white transition-all duration-300 py-2 ${toggleOpen ? 'h-44' : 'h-14'}`} >
      <div className="flex w-full justify-between px-3" >
        <PopoutButton toggleOpen={toggleOpen} setToggleOpen={setToggleOpen}/>
        <div className='flex h-8 w-8 hover:cursor-pointer hover:bg-white/25 rounded-full p-1' onClick={() => setDarkMode(!darkMode)}>
          <Icon className='w-full h-full' icon={!darkMode ? 'ph:sun-bold' : 'ph:moon-bold'} />
        </div>
      </div>
    </div>

  )
}

export default Header