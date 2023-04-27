import { StyleSheet, View, Text } from 'react-native';
import { store } from './src/app/store';
import { Provider } from 'react-redux';
import Main from './Main'
import Footer from './src/features/Footer';

const App = () => {

  return (
  <Provider store={store}>
      <View className="flex flex-col mt-6 w-full h-full items-center align-center">
        <Main />
        <Footer />
      </View>
  </Provider>
  );
}

export default App