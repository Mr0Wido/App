import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React, { useState } from "react";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import { router } from "expo-router";
import { logout } from '../../services/apiService'; // Çıkış yapma servisi import
import { removeToken } from '../../services/secureStorage'; // Token temizleme servisi import

const Profile = () => {
  const [iconClicked, setIconClicked] = useState(false);
  const [showOrders, setShowOrders] = useState(false);

  const handleIconPress = () => {
    setIconClicked((prevState) => !prevState);
  };

  const handleShowOrders = () => {
    setShowOrders((prevState) => !prevState);
  };

  const handleLogout = async () => {
    try {
      await removeToken(); // Token'ı temizleme işlemi
      await logout(); // Çıkış yapma servisi çağrısı
      router.push("/sign-in"); // Giriş ekranına yönlendirme
    } catch (error) {
      Alert.alert('Hata', 'Çıkış yaparken bir hata oluştu. Lütfen tekrar deneyin.');
      console.error('Çıkış yapma hatası:', error);
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 flex-col justify-center items-center mt-10">
          {/* Hesap Bilgileri */}
          <View className="justify-center items-center flex-row flex-1">
            <Image
              source={icons.user}
              className="w-12 h-12 mr-8"
              style={{ tintColor: "orange" }}
            />
            <CustomButton
              title="Bilgileri Görüntüle"
              handlePress={() => router.push("/ekleme/profileDetail")}
              containerStyles="bg-primary w-64 h-12 items-center"
              icon={icons.down}
            />
          </View>

          {/* Siparişlerim */}
          <View className="bg-gray-200 justify-center items-center flex-row flex-1 mt-12">
            <Image
              source={icons.bag}
              className="w-12 h-12 mr-8"
              style={{ tintColor: "orange" }}
            />
            <CustomButton
              title={showOrders ? "Siparişleri Gizle" : "Siparişleri Görüntüle"}
              handlePress={handleShowOrders}
              containerStyles="bg-primary w-64 h-12 items-center"
              icon={icons.down}
            />
          </View>
          {showOrders && (
            <View className="w-full justify-center items-center mt-7">
              <Text>Merhaba</Text>
              {/* Veritabanından siparişler buraya eklenecek */}
            </View>
          )}

          {/* Çıkış Yap Butonu */}
          <CustomButton
            title="Çıkış Yap"
            handlePress={handleLogout}
            containerStyles="bg-red-600 w-36 h-12 mt-7 mb-4 items-center"
            icon={icons.power}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
