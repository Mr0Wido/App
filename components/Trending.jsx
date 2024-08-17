import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'

const Trending = ({ posts }) => {
  return (
   <FlatList
    data={posts}
    key={(item) => item.$id}
    renderItem={({item}) => (
        <Text className="text-3xl text-black-100">
            {item.id}
        </Text>
    )}
    horizontal
   />
  )
}

export default Trending