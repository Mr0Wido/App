import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
  Alert,
} from "react-native";
import React from "react";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import { router } from "expo-router";
import { logout } from '../../services/apiService'; // Çıkış yapma servisi import
import { removeToken } from '../../services/secureStorage'; // Token temizleme servisi import

const Profile = () => {
  const handleLogout = async () => {
    try {
      await logout(); // Çıkış yapma servisi çağrısı
      await removeToken(); // Token'ı temizleme işlemi
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
          <View className="justify-center flex-row flex-1 pt-11">
            <Image
              source={icons.user}
              className="w-12 h-12 mr-8"
              style={{ tintColor: "orange" }}
            />
            <CustomButton
              title="Bilgileri Görüntüle"
              handlePress={() => router.push("/account/profileDetail")}
              containerStyles="bg-primary w-64 h-12 items-center"
              icon={icons.down}
            />
          </View>

          {/* Siparişlerim */}
          <View className="justify-center flex-row flex-1 pb-60">
            <Image
              source={icons.bag}
              className="w-12 h-12 mr-8"
              style={{ tintColor: "orange" }}
            />
            <CustomButton
              title="Siparişleri Görüntüle"
              handlePress={() => router.push("/account/orderDetail")}
              containerStyles="bg-primary w-64 h-12 items-center"
              icon={icons.down}
            />
          </View>

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
