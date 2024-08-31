import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { icons } from "../constants";
import { images } from "../constants";

const ProductCard = ({ product: { title, price, image } }) => {
  const handleIconPress = () => {
    setclickedButton((prevState) => !prevState);
  };
  const counterQuantity = (operation) => {
    setcounter((prevCounter) => {
      if (operation === "increase") {
        return prevCounter + 1;
      } else if (operation === "decrease") {
        return prevCounter > 1 ? prevCounter - 1 : 1;
      }
      return prevCounter;
    });
  };
  const [counter, setcounter] = useState(1);
  const [clickedButton, setclickedButton] = useState(false);
  return (
    <View className="flex-1 items-center px-4 mb-14">
      <View>
        <Image source={images.fuseTea} />
      </View>
      <Text className=" text-black font-pregular text-base" numberOfLines={1}>
        FuseTea Şeftali //Product Title
      </Text>

      <View className="flex-col items-center justify-center flex-1 gap-4">
        <Text className="text- text-xl font-psemibold text-red-600">20 TL</Text>
        <View className="flex-row gap-3 items-center justify-center">
          <Pressable
            onPress={() => {counterQuantity("increase")}}
          >
            <Image
              source={icons.plusCircle}
              className="w-10 h-10"
              tintColor={"orange"}
              resizeMode="contain"
            />
          </Pressable>
          <View className="px-4 h-10 justify-center items-center bg-primary rounded-2xl border-2 border-primary">
            <Text className="text-xs font-pregular text-white">Adet: {counter}</Text>
          </View>
          <Pressable
            onPress={() => {counterQuantity("decrease")}}
          >
            <Image
              source={icons.minesCircle}
              className="w-10 h-10"
              tintColor={"orange"}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </View>
      <CustomButton
        title="Sipariş Et"
        containerStyles="bg-primary w-48 h-12 mt-4 items-center"
        handlePress={handleIconPress}
        icon={icons.shopping}
      />

      {clickedButton ? <Text>true</Text> : <Text>false</Text>}
    </View>
  );
};

export default ProductCard;
