import { View, Text, Image, Pressable } from "react-native";
import React, { useState } from "react";
import CustomButton from "../components/CustomButton";
import { icons } from "../constants";
import { images } from "../constants";
import useOrderStore from "./OrderStore";

const ProductCard = ({ product }) => {
  const handleOrder = () => {
    addOrder(product);
  }
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
  const addOrder = useOrderStore((state) => state.addOrder); 
  const [counter, setcounter] = useState(1);
  const [clickedButton, setclickedButton] = useState(false);
  return (
    <View className="flex-1 flex-col items-center justify-center px-4 mb-14">
      <Image source={product.image} />

      <Text className=" text-black font-pregular text-base" numberOfLines={1}>
        {product.name}
      </Text>
      <Text className="text-xl font-psemibold text-red-600">{product.price}</Text>
      <View className="flex-row gap-4 items-center justify-center mt-2">
        <Pressable
          onPress={() => {
            counterQuantity("increase");
          }}
        >
          <Image
            source={icons.plusCircle}
            className="w-10 h-10"
            tintColor={"orange"}
            resizeMode="contain"
          />
        </Pressable>
        <View className="px-4 h-10 justify-center items-center bg-primary rounded-2xl border-2 border-primary">
          <Text className="text-xs font-pregular text-white">
            Adet: {counter}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            counterQuantity("decrease");
          }}
        >
          <Image
            source={icons.minesCircle}
            className="w-10 h-10"
            tintColor={"orange"}
            resizeMode="contain"
          />
        </Pressable>
      </View>
      <CustomButton
        title="Sipariş Et"
        containerStyles="bg-primary w-48 h-12 mt-4 items-center"
        handlePress={handleOrder}
        icon={icons.shopping}
      />
      {clickedButton ? <Text>true</Text> : <Text>false</Text>}
    </View>
  );
};

export default ProductCard;
