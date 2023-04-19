import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/features/Login';
import Games from './src/features/Games';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUser } from './src/app/userSlice';
import { removeData } from './src/utils';
import { useGetAllGamesQuery } from './src/app/shopAPI';


const Main = () => {
  const {data, isLoading, isError} = useGetAllGamesQuery()
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()
  
  const initializeUser = () => {
    AsyncStorage.getItem('currentUser', (err, result) => {
      const jsonValue = JSON.parse(result)
      dispatch(setUser(JSON.parse(result)))
    });
    AsyncStorage.getItem('token', (err, result) => {
    });
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
    <View style={styles.container}>
      <Button title="Logout" onPress={()=> {
        removeData('currentUser');
        dispatch(setUser(null));

        }} />
      {
      !user
      ? <Login/>
      : <Games/>

    }   
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Main