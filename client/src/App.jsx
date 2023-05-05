import Login from './components/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect} from 'react';
import { setUser } from './app/userSlice';
import { useGetAllGamesQuery } from './app/shopAPI';
import Dashboard from './components/Dashboard';

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
    
    <div style={{width: '100%', height: '100%'}}>
      {
      !user
      ? <Login/>
      : <Dashboard />

    }   
    </div>
  );
}

export default Main