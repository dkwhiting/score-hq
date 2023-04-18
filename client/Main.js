import { StyleSheet, Text, View, } from 'react-native';
import { Login } from './src/features/Login';
import { Games } from './src/features/Games';
import { useSelector } from 'react-redux';

export default function Main() {
  const user = useSelector(state => state.user.currentUser) || JSON.parse(localStorage.getItem('currentUser'))

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
