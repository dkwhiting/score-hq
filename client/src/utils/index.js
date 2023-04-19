import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (keyName, value) => {
  try {
    await AsyncStorage.setItem(keyName, value)
  } catch (e) {
    console.error('ERROR WITH SET DATA', e)
  }
}

export const retrieveData = async (keyName) => {
  try {
      const value = await AsyncStorage.getItem(keyName)
      const jsonValue = JSON.parse(value)
      if (jsonValue){
        console.log('THIS IS JSONVALUE',jsonValue)
        return jsonValue
      }
  } catch(e) {
    console.error('ERROR WITH RETRIEVE DATA', e)
    // error reading value
  }
}