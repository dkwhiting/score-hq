import React, { useLayoutEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeData } from '../utils';
import { setUser } from '../app/userSlice';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';



const Footer = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [URL, setURL] = useState('')

  useLayoutEffect(()=>{
    setURL(window.location.href)
  })

  return (
    <div className="flex flex-col">

    <div className="flex relative">
      {/* <div className={`${window.location.href.indexOf("dashboard") != -1 ? 'left-0' : 'opacity-0'} absolute h-2 w-[calc(100%/5)] bg-white rounded-full`}></div>
      <div className={`${window.location.href.indexOf("games") != -1 && window.location.href.indexOf("new") == -1 ? 'left-[calc(100%/5)]' : 'opacity-0'} absolute h-2 w-[calc(100%/5)] bg-white rounded-full`}></div>
      <div className={`${window.location.href.indexOf("new") != -1 ? 'left-[calc(100%/5*2)]' : 'opacity-0'} absolute h-2 w-[calc(100%/5)] bg-white rounded-full`}></div>
      <div className={`${window.location.href.indexOf("friends") != -1 ? 'left-[calc(100%/5*3)]' : 'opacity-0'} absolute h-2 w-[calc(100%/5)] bg-white rounded-full`}></div>
      <div className={`${window.location.href.indexOf("settings") != -1 ? 'left-[calc(100%/5*4)]' : 'opacity-0'} absolute h-2 w-[calc(100%/5)] bg-white rounded-full`}></div> */}
    
      <div className={`${
        window.location.href.indexOf("dashboard") != -1 
          ? 'left-0'
          : window.location.href.indexOf("games") != -1 && window.location.href.indexOf("new") == -1
          ? 'left-[calc(100%/5)]'
          : window.location.href.indexOf("new") != -1
          ? 'left-[calc(100%/5*2)]'
          : window.location.href.indexOf("friends") != -1
          ? 'left-[calc(100%/5*3)]'
          : window.location.href.indexOf("settings") != -1
          ? 'left-[calc(100%/5*4)]'
          : null
      } bg-gray-500 dark:bg-white absolute h-1 w-[calc(100%/5)] rounded-full transition-all duration-300`} />
    </div>
    <div className="pt-1 pb-8 sm:hidden flex items-center flex-none w-full h-24 bg-slate-200 dark:bg-slate-500 justify-around">
    <div 
      className="flex flex-1 flex-col justify-center items-center max-h-"
      onClick={()=>{
        navigate('/dashboard')
      }}
      >
      <Icon icon="majesticons:home" className="text-gray-500 dark:text-white w-[calc(35px)] h-full" />
    </div>
    <div 
      className="flex flex-1 flex-col justify-center items-center"
      onClick={()=>{
        navigate('/games')
      }}
      >
      <Icon icon="fa6-solid:dice" className="text-gray-500 dark:text-white w-[calc(35px)] h-full" />
    </div>
    <div 
      className="flex flex-1 flex-col justify-center items-center"
      onClick={()=>{
        navigate('/games/new')
      }}
      >
      <Icon icon="fluent:add-square-32-filled" className="text-gray-500 dark:text-white w-[calc(35px)] h-full"  />
    </div>
    <div 
      className="flex flex-1 flex-col justify-center items-center"
      onClick={()=>{
        navigate('/friends')
      }}
      >
      <Icon icon="fluent:people-32-filled" className="text-gray-500 dark:text-white w-[calc(35px)] h-full"  />
    </div>
    <div 
      className="flex flex-1 flex-col justify-center items-center"
      onClick={()=>{
        navigate('/settings')
      }}
      >
      <Icon icon="mdi:gear" className="text-gray-500 dark:text-white w-[calc(35px)] h-full"  />
    </div>




      {/* <button onClick={()=> {
        removeData('currentUser');
        dispatch(setUser(null));
        navigate('/')
      }}>
      Logout
    </button> */}
    </div>
    </div>
      
  )
}

export default Footer