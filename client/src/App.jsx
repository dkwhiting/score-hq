import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useLayoutEffect, useState} from 'react';
import { setUser } from './app/userSlice';
import { useGetAllGamesQuery } from './app/shopAPI';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer'
import Header from './components/Header';

const Main = () => {
  const {data, isLoading, isError} = useGetAllGamesQuery()
  const user = useSelector(state => state.user.currentUser)
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
      if (user) {
        initializeGames(user.id)
      }
    } else {
      initializeGames(user.id)
    }
  }, [])

  return (
    
    <div className="flex flex-col h-full w-full items-center bg-gray-800">
      {
        !user
        ? <Login/>
        : <>
            <Header />
            <Dashboard />
            <Footer />
          </>
    }   
    </div>
  );
}

export default Main