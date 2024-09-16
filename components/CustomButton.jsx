import { View, TouchableOpacity, Text, Image, ActivityIndicator } from 'react-native';
import React from 'react';

const CustomButton = ({ 
  title, 
  handlePress, 
  containerStyles, 
  textStyles, 
  isLoading, 
  icon 
}) => {
  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.7}
      className={`rounded-2xl justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
    >
      <View className="flex-row items-center">
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <>
            {icon && (
              <Image
                source={icon}
                style={{ width: 20, height: 20, marginRight: 8 }} // Adjust margin as needed
              />
            )}
            <Text className={`text-white font-psemibold text-lg ${textStyles}`}>
              {title}
            </Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default CustomButton;
