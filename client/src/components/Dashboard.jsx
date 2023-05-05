import React from 'react'
import {useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGetAllGamesQuery } from '../app/shopAPI';
import { setGames } from '../app/gamesSlice';
import Skeleton from './Skeleton';

const Dashboard = ({navigation}) => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state=> state.user?.currentUser)
  const { data, error, isLoading } = useGetAllGamesQuery(currentUser?.id)
  const games = useSelector(state => state.games?.games)
  
  useEffect(()=>{
    if (currentUser){
      dispatch(setGames(data))
    }    
  }, [currentUser])


  return (
    <div className="flex flex-col flex-1">
      {
        !isLoading
        ? 
        <Skeleton />
        
        : data?.length > 0
          ? data.map(game =>{
            return(
              <p key={game.id}>{game.name}</p>
            )
          })
          : null
      }
    </div>
  )
}

export default Dashboard