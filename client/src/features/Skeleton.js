import React from 'react'
import { Text, View } from 'react-native'

const Skeleton = () => {
  return (

<View className='w-full flex flex-col'>
  <Text className="text-xl p-1">
    In Progress
  </Text>
  <View role="status" className="w-full p-4 space-y-4 border border-gray-200 rounded shadow dark:Viewide-gray-700 md:p-6 dark:border-gray-700">
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      </View>
      <Text className="text-xl p-1">Completed</Text>
      <View role="status" className="w-full p-4 space-y-4 border border-gray-200 rounded shadow dark:Viewide-gray-700 md:p-6 dark:border-gray-700">
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
      <View className="flex flex-row items-start justify-between">
          <View>
              <View className="animate-spin h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></View>
              <View className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></View>
          </View>
          <View className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></View>
      </View>
  
  </View>
</View>

  )
}

export default Skeleton