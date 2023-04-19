import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './src/features/Login';
import Games from './src/features/Games';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './src/app/userSlice';

const Main = () => {
  const user = useSelector(state => state.user.currentUser)
  const dispatch = useDispatch()

  useEffect(()=>{
    if (!user){
      const initialUser = AsyncStorage.getItem('UID123', (err, result) => {
        console.log('this is result',result);
        return result
      });
      if (initialUser){
        console.log(initialUser)
      }
    }
  }, [user])


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