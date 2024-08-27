import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import CustomButton from '../../components/CustomButton';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const Home = () => {
  
  const [refreshing, setrefreshing] = useState(false)
  const onRefresh = async () => {
    setrefreshing(true);
    // yeni item, stok güncelleme
    setrefreshing(false);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <FlatList
          data={[{ id: 1 }, { id:2 }, { id:3 }]} // itemler
          
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Text className="text-3xl">
              {item.id}
            </Text>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className=" justify-between items-start flex-row mb-6">
                <View className="flex-1 justify-center items-center w-full">
                <Image
                    className="bg-white h-[80]" 
                    source={images.logo}
                  />
                </View>
              </View>
              <SearchInput/>
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-black-100 text-lg font-pregular mb-3">Son Siparişler
                </Text>
                <Trending posts={[{id:1}, {id:2}, {id:3}]}/>
              </View>
            </View>
          )}
          
          refreshControl={<RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />}
        />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

export default Home