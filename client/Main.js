import { Button, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/features/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setUser } from './src/app/userSlice';
import { removeData } from './src/utils';
import { useGetAllGamesQuery } from './src/app/shopAPI';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './src/features/Dashboard';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const Main = ({styles}) => {
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
    
    <View style={{width: '100%', height: '100%'}}>
      <Button title="Logout" onPress={()=> {
        removeData('currentUser');
        dispatch(setUser(null));

        }} />
      {
      !user
      ? <Login/>
      : <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Dashboard" component={Dashboard} />
          </Stack.Navigator>
        </NavigationContainer>
    }   
    </View>
  );
}

export default Main