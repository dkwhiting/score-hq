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
    if(value !== null) {
      return value
    }
  } catch(e) {
    console.error('ERROR WITH RETRIEVE DATA', e)
  }
}

export const removeData = async (keyName) => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
    console.error('ERROR WITH REMOVE DATA', e)
  }
}