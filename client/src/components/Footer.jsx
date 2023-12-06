import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeData } from '../utils';
import { setUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';



const Footer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <div className="flex items-center flex-none w-full h-10 bg-slate-200 dark:bg-slate-500">
      <button onClick={()=> {
        removeData('currentUser');
        dispatch(setUser(null));
        navigate('/')
        }}>
          Logout
        </button>
    </div>
  )
}

export default Footer