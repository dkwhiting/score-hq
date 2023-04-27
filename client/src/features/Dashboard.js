import React from 'react'
import { View, Text } from 'react-native'
import {useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useGetAllGamesQuery } from '../app/shopAPI';
import { setGames } from '../app/gamesSlice';

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
    <View style={{backgroundColor: 'orange'}}>
      {
        isLoading
        ? <Text>Loading...</Text>
        : data?.length > 0
          ? data.map(game =>{
            return(
              <Text key={game.id}>{game.name}</Text>
            )
          })
          : null
      }
    </View>
  )
}

export default Dashboard