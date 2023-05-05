import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeData } from '../utils';
import { setUser } from '../app/userSlice';



const Footer = () => {
  const dispatch = useDispatch()
  return (
    <div className="flex-none w-full h-20 bg-slate-500">
      <button onClick={()=> {
        removeData('currentUser');
        dispatch(setUser(null));
        }}>
          Logout
        </button>
    </div>
  )
}

export default Footer