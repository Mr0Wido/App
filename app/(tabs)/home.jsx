import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import EmptyState from '../../components/EmptyState';

const Home = () => {
  return (
     <SafeAreaView>
      <FlatList
        //data={[{ id: 1 }, { id:2 }, { id:3 }]} // itemler
        data={[]}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <Text className="text-3xl">
            {item.id}
          </Text>
        )}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className=" justify-between items-start flew-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-black-100"> Welcome Back
                </Text>
                <Text className="font-psemibold text-2xl text-black-100">
                  Username
                </Text>
              </View>
            </View>
            <SearchInput/>
            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-black-100 text-lg font-pregular mb-3">Son Siparişler
              </Text>
              <Trending posts={[{id:1}, {id:2}, {id:3}] ?? []}/>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
         <EmptyState 
         title="Ürün Bulunmuyor"
         subtitle="Sipariş Ver"
         />
        )}
      />
     </SafeAreaView>
  );
}

export default Home