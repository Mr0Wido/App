import { TouchableOpacity, Text, Image } from 'react-native'
import React from 'react'
import { View } from 'react-native-web';

const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading, icon}) => {
    return(
        <TouchableOpacity 
        onPress={handlePress}
        activeOpacity={0.7}
        className={`bg-primary rounded-xl min-h-[62] justify-center items-start ${containerStyles} ${isLoading ? 'opacity-50': ''}`}>
            <View className="flex-row items-center">
            {icon && (
                <Image
                    source={icon}
                    style={{ width: 20, height: 20, marginRight: 1 }}
                />
            )}
            <Text className={`text-newBackGround font-psemibold text-lg ${textStyles}`}> {title} </Text>
            </View>
         </TouchableOpacity>
    );
}

export default CustomButton