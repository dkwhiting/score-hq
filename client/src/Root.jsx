import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState} from 'react';
import { setUser } from './app/userSlice';
import { useGetAllGamesQuery } from './app/shopAPI';
import { setGames } from './app/gamesSlice';
import {
  Link,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer'
import Header from './components/Header';
import NotFound from './components/NotFound';
import AuthRoute from './components/AuthRoute';

const Root = () => {
  const [darkMode, setDarkMode] = useState(false)
  const user = useSelector(state => state.user.currentUser)
  const games = useSelector(state => state.user.games)
  const {data, isLoading, isError} = useGetAllGamesQuery(user?.id)
  const dispatch = useDispatch()
  
  
  const initializeUser = () => {
    const currentUser = localStorage.getItem('currentUser')
    dispatch(setUser(JSON.parse(currentUser)))
    const token = localStorage.getItem('token')
  }
  
  const initializeGames = () => {
    
    

  }
  
  useEffect(()=>{
    if (!user){
      initializeUser()
    } else {
      dispatch(setGames(data))
      console.log(data)
    }
  }, [])

  useEffect(()=>{
    //initialize games upon user change
    if (user){
      dispatch(setGames(data))
    }
  },[user])

  
  return (
    <div className={`h-full ${darkMode ? 'dark' : ''} transition-all duration-300`}>
      
      <div className="flex flex-col h-full bg-white dark:bg-gray-800 text-black dark:text-white transition-all duration-300">
        <Header darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Routes>
          
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" replace={true} /> : <Navigate to="/login" replace={true} />} 
          />
          <Route 
            path="/dashboard" 
            element={<AuthRoute><Dashboard /></AuthRoute>} />
          <Route 
            path="/login" 
            element={<Login />} />
          <Route 
            path="*" 
            element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default Root