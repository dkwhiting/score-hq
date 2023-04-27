import { StyleSheet, View, Text } from 'react-native';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import Main from './Main'
import Footer from './src/features/Footer';
import { NavigationContainer } from '@react-navigation/native';

const App = () => {

  return (
  <Provider store={store}>
    <NavigationContainer>
      <View style={[styles.container, {marginTop: 25}]}>
        <Main styles={styles}/>
        <Footer />
      </View>
    </NavigationContainer>
  </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  },
  whiteText: {
    color: '#FFF'
  },
  darkText: {
    color: '#333'
  },
});

export default App