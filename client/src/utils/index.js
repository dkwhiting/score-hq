import {AsyncStorage} from 'react-native'

export const setData = async (keyName, value) => {
  try {
    await AsyncStorage.setItem(keyName, value)
  } catch (e) {
    // saving error
  }
}

export const retrieveData = async (keyName) => {
  try {
    const value = await AsyncStorage.getItem(keyName)
    if(value !== null) {
      console.log('THIS IS RETRIEVE DATA', value)
      return value
    }
  } catch(e) {
    // error reading value
  }
}