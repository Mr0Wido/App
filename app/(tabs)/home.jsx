import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React, { useState } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '../../components/SearchInput';
import Trending from '../../components/Trending';
import ProductCard from '../../components/ProductCard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// burasu deneme amaclı API ve Sunucu kullanmadan ürünleri sipariş kısmına gönderme
const products = [
  { id: 1, name: 'Product 1', price: '20', amaount: '1', image: images.fuseTea },
  { id: 2, name: 'Product 2', price: '30', amaount: '1', image: images.fuseTea },
  { id: 3, name: 'Product 3', price: '40', amaount: '1', image: images.fuseTea },
  { id: 4, name: 'Product 4', price: '50', amaount: '1', image: images.fuseTea },
]
//

const Home = () => {
  
 
  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = async () => {
    setrefreshing(true);
    // yeni item, stok güncelleme
    setrefreshing(false);
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <FlatList
          data={products} // itemler
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
          <ProductCard product={item}/>
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