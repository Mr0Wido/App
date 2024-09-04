import { View, Text, TextInput, Image, Pressable } from "react-native";
import { useState } from "react";

import { icons } from "../constants";
const SearchInput = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  return (
    <View className="w-full flex-row  px-4">
      <View className="w-[90%] h-10 px-4 bg-slate-50 rounded-2xl border-2 border-gray-300 focus:border-secondary items-center flex-row">
        <TextInput
          className="text-base flex-1 text-black-100 text-psemibold"
          value={value}
          placeholder="Ürün ara"
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
        />
      </View>
      <View className="w-[10%] h-10 items-center justify-center ">
        <Image
          source={icons.search}
          className="w-8 h-8"
          tintColor={"black"}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

export default SearchInput;
