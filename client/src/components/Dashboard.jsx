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
    <div className="flex flex-col flex-1 w-3/5 items-center">
      {
        isLoading
        ? 
        <Skeleton />
        
        : data?.length > 0
          ? data.map(game =>{
            console.log(game)
            return(
              <div role="status" key={game.id} className="w-full p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow dark:divide-gray-700 md:p-6 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                        <p>{game.name}</p>
                  </div>
                </div>
              </div>
            )
          }) 
          : null
      }
    </div>
  )
}

export default Dashboard