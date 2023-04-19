import React from 'react'
import { View, Text } from 'react-native'
import {useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGetAllGamesQuery } from '../app/shopAPI';
import { setGames } from '../app/gamesSlice';

const Games = () => {
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
    <View>
      {
        isLoading
        ? <Text>Loading...</Text>
        : data
          ? data.map(game =>{
            return(
              <Text>{game.name}</Text>
            )
          })
          : null
      }
    </View>
  )
}

export default Games