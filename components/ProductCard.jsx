import { View, Text } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton';
import { icons } from '../constants';

const ProductCard = ( { product: {title, price, image} } ) => {
    const handleIconPress = () => {
        setclickedButton(prevState => !prevState)
      }
    const [clickedButton, setclickedButton] = useState(false)
  return (
    <View className="flex items-center px-4 mb-14">
      <Text className=" text-black font-psemibold text-base" numberOfLines={1}> 12 </Text>
      <View className="flex-row gap-3 items-start">
            <View className="justify-center items-center  flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border-secondary justify-center
                items-center p-0.5">
                    <CustomButton 
                        title="Sipariş Et"
                        containerStyles="bg-primary w-48 h-12 mt-7 items-center"
                        handlePress={handleIconPress}
                        icon={icons.shopping}
                    />
                </View>   
            </View>
        </View>
        {clickedButton ? (
            <Text>true</Text>
        ) : (
            <Text>false</Text>
        )}
    </View>
  )
}

export default ProductCard