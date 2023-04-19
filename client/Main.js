import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/features/Login';
import Games from './src/features/Games';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './src/app/userSlice';

const initializeUser = () => {
  AsyncStorage.getItem('currentUser', (err, result) => {
    dispatch(setUser(result))
  });
}

const Main = () => {
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  useEffect(()=>{
    console.log('this is user', user)
    if (!user){
      
    }
  }, [])


  return (
    <View style={styles.container}>
      {
      !user
      ? <Login />
      : <Games />
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