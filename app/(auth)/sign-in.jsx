import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { saveToken} from '../../services/secureStorage';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { images } from '../../constants';
import { signIn } from '../../services/apiService';
import { Link } from 'expo-router';
import { icons } from '../../constants';
import { Alert } from 'react-native';

const SignIn = ({ navigation }) => {

  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    const { email, password } = form;

    if (!email || !password) {
      Alert.alert("Lütfen, tüm alanları doldurunuz!");
      return;
    }

    setLoading(true);

    try {
      const response = await signIn(email, password);

      if (response.accessToken && response.refreshToken === 'string') {
        await saveToken(response.accessToken);
        console.log("Token kaydedildi");
        navigation.navigate("Home");
      } else {
        throw new Error("Geçersiz token formatı");
      }

    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.";
      Alert.alert("Hata", errorMessage);
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView >
        <View className="w-full justify-center items-center h-full px-4 my-6 py-6"
              style={{
                  minHeight: Dimensions.get("window").height - 100,
                }}
        >
          <Image
            source={images.logo}
            className="w-[540] h-[84px]"
            resize='contain'
          />
          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setform({...form, email:e})}
          otherStyles="mt-7"
          keyboardType="email-addres"
          icon={icons.user}
          />
          <FormField
          title="Şifre"
          value={form.password}
          handleChangeText={(e) => setform({...form, password:e})}
          otherStyles="mt-7"
          icon={icons.password}
          
          />
          <CustomButton
            title="Giriş Yap"
            handlePress={handleSignIn}
            containerStyles="w-64 mt-7 items-center"
            icon={icons.home}
          />
          <View className="flex justify-center flex-row gap-2">
            <Text className="p-2 text-sm text-newTextColor font-pregular">
              Hesabınız yok mu? 
            </Text>
            <Link  href="/sign-up" className="p-2 text-sm font-psemibold text-primary">
              Kayıt Ol
            </Link>
            <Link  href="/home" className="p-2 text-sm font-psemibold text-primary">
              Anasayfa Giriş
            </Link>
          </View>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
};


export default SignIn