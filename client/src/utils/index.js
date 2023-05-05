
export const setData = async (keyName, value) => {
  try {
    localStorage.setItem(keyName, value)
  } catch (e) {
    console.error('ERROR WITH SET DATA', e)
  }
}

export const retrieveData = async (keyName) => {
  try {
    const value = await localStorage.getItem(keyName)
    if(value !== null) {
      return value
    }
  } catch(e) {
    console.error('ERROR WITH RETRIEVE DATA', e)
  }
}

export const removeData = async (keyName) => {
  try {
    await localStorage.clear()
  } catch(e) {
    console.error('ERROR WITH REMOVE DATA', e)
  }
}