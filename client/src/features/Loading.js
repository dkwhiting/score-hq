import React from 'react'
import { View, Text } from 'react-native'

const Loading = ({message}) => {
  return (
    <View className="flex items-center justify-center absolute top-0 left-0 w-screen h-screen bg-white/75">
      <Text className="text-3xl">
        {message}
      </Text>
    </View>
  )
}

export default Loading