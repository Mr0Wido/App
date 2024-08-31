import { View, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList, GestureHandlerRootView } from 'react-native-gesture-handler'
import useOrderStore from '../../components/OrderStore'
import { icons, images } from '../../constants'
import CustomButton from '../../components/CustomButton'

const Order = () => {

  const orders = useOrderStore((state) => state.orders)
  const cleanOrders = useOrderStore((state) => state.cleanOrders)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <View className="flex-col">
        <CustomButton 
            title="Siparişi Tamamla"
            containerStyles="bg-primary w-48 h-12 mt-4 items-center"
            handlePress={cleanOrders}
            icon={icons.shopping}
          />
          <FlatList 
            data={orders}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({item}) => (
              <View className="flex-row p-4 border-b border-gray-300">
                <Image 
                  source={images.fuseTea}
                  className="w-16 h-16 mr-4"
                />
                <View>
                  <Text className="text-base font-psemibold">{item.name}</Text>
                  <Text className="text-red-600">{item.price} TL</Text>
                </View>
              </View>
            )}
          />
        </View>
          
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

export default Order