import { StyleSheet, View, Text } from 'react-native';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import Main from './Main'
import Footer from './src/features/Footer';

const App = () => {

  return (
  <Provider store={store}>
      <View style={[styles.container, {marginTop: 25}]}>
        <Main styles={styles}/>
        <Footer />
      </View>
  </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  whiteText: {
    color: '#FFF'
  },
  darkText: {
    color: '#333'
  },
});

export default App