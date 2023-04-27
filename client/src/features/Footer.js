import React from 'react'
import { Text, View, Button } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { removeData } from '../utils';
import { setUser } from '../app/userSlice';



const Footer = () => {
  const dispatch = useDispatch()
  return (
    <View style={{width: '100%', height: 65, backgroundColor: '#CCC', marginTop: 'auto'}}>
      <Button title="Logout" onPress={()=> {
        removeData('currentUser');
        dispatch(setUser(null));

        }} />
    </View>
  )
}

export default Footer