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
      console.log(currentUser.id)
      console.log(data)
      dispatch(setGames())
    }    
  }, [currentUser])

  return (
    <View>
      <Text>This is games!</Text>
      {games
        ? games.map(game =>{
        return(
          <>
          {/* <Text key={game?.id}>{game?.name}</Text> */}
          </>
        )
      })
      : null
    }
    </View>
  )
}

export default Games