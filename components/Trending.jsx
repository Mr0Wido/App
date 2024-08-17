import { View, Text } from 'react-native'
import React from 'react'
import { FlatList } from 'react-native-gesture-handler'
import EmptyState from '../components/EmptyState';

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
    ListEmptyComponent={() => (
      <EmptyState 
      title="Ürün Bulunmuyor"
      subtitle="Sipariş Ver"
      />
     )}
   />
  )
}

export default Trending