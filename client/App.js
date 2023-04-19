import { StyleSheet, View, Text } from 'react-native';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import Main from './Main'

const App = () => {

  return (
  <Provider store={store}>
    <View style={styles.container}>
      <Main />
    </View>
  </Provider>
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

export default App