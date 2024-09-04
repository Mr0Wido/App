import { View, Text, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, GestureHandlerRootView } from "react-native-gesture-handler";
import useOrderStore from "../../components/OrderStore";
import { icons, images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { useEffect } from "react";

const Order = () => {
  const orders = useOrderStore((state) => state.orders);
  const cleanOrders = useOrderStore((state) => state.cleanOrders);

  const [sumOrder, setsumOrder] = useState(0);

  // orders degişince bu kod blogu tekrar calısıcak
  useEffect(() => {
    const calculatedTotalPrice = () => {
      // reduce js fonksyionu acc 0 baslar item parametresinde olanları acc ile toplanır
      const total = orders.reduce(
        (accumulator, item) => accumulator + item.amaount * item.price,
        0
      );
      setsumOrder(total);
    };
    calculatedTotalPrice();
    // orders bagımlılıktır degiştigi an tekrar fonksiyon kısmı calışır
  }, [orders]);

  const handlePressAction = () => {
    cleanOrders();
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="bg-white h-full">
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row p-4 border-b border-gray-300">
              <Image source={images.fuseTea} className="w-16 h-16 mr-4" />
              <View className="items-center justify-end">
                <Text className="text-base font-psemibold">{item.name}</Text>
                <Text className="text-red-600 font-pregular">
                  {item.price} TL
                </Text>
                <Text className="text-base font-pregular">
                  Adet: {item.amaount}
                </Text>
                <Text className=" text-red-600 text-base font-pregular">
                  {item.amaount * item.price} TL
                </Text>
              </View>
            </View>
          )}
        />
        <View className="items-center justify-center mt-7 mb-4">
          <Text className="text-red-600 text-base font-pregular">
            Sipariş Tutarı: {sumOrder} TL
          </Text>
          <CustomButton
            title="Siparişi Tamamla"
            containerStyles="bg-primary w-72 h-12 mt-7 items-center justify-center"
            handlePress={handlePressAction}
            icon={icons.shopping}
          />
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Order;
