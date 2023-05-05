import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {
  const user = useSelector((state)=> state.user.currentUser)

  return (
    <div className="flex-none flex items-center relative w-full h-14 bg-slate-700">
      <div className="absolute right-4 flex items-center justify-center rounded-full bg-white w-14 h-14">
        <h3 className="text-4xl">{user.name.substring(0,1)}</h3>
      </div>
    </div>
  )
}

export default Header