import React from 'react'

const PopoutButton = ({toggleOpen, setToggleOpen}) => {
  return (
    <div
          id="expand-button"
          className="scale(75) w-10 h-9 rotate-0 transition-all duration-500 cursor-pointer relative"
          onClick={() => {console.log('toggle'); setToggleOpen(!toggleOpen)}}>
          <span className={`block absolute h-1 w-3/5 rounded opacity-100 left-2 rotate-0 transition-all duration-250 opacity-100 ${toggleOpen ? 'w-0 top-4 bg-transparent' : 'bg-black dark:bg-white top-2'}`}></span>
          <span className={`block absolute h-1 w-3/5 bg-black dark:bg-white rounded opacity-100 left-2  transition-all duration-250 top-4 ${toggleOpen ? 'rotate-45' : 'top-4'}`}></span>
          <span className={`block absolute h-1 w-3/5 bg-black dark:bg-white rounded opacity-100 left-2  transition-all duration-250 top-4 ${toggleOpen ? '-rotate-45' : 'top-4'}`}></span>
          <span className={`block absolute h-1 w-3/5 rounded opacity-100 left-2 rotate-0 transition-all duration-250 opacity-100 ${toggleOpen ? 'w-0 top-4 bg-transparent' : 'bg-black dark:bg-white top-6'}`}></span>
        </div>
  )
}

export default PopoutButton