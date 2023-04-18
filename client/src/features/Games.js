import React from 'react'
import { View, Text } from 'react-native'
import {useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGetAllGamesQuery } from '../app/shopAPI';
import { setGames } from '../app/gamesSlice';

export const Games = () => {
  const dispatch = useDispatch()
  const currentUser = useSelector(state=> state.user.currentUser) || JSON.parse(localStorage.getItem('currentUser'))
  const { data, error, isLoading } = useGetAllGamesQuery(currentUser.id)
  const games = useSelector(state => state.games.games)
  
  useEffect(()=>{
    if (currentUser){
      dispatch(setGames(data))
    }    
  }, [data])

  return (
    <div>
      {isLoading
      ? <Text>Loading...</Text>
      : games
        ? games.map(game =>{
        return(
          <Text key={game.id}>{game.name}</Text>
        )
      })
      : null
    }
    </div>
  )
}
