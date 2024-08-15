import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert } from 'react-native';
import { saveToken } from '../../services/secureStorage';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { images } from '../../constants';
import { signUp } from '../../services/apiService';
import { Link, router } from 'expo-router';


const SignUpScreen = ({ navigation }) => {
  const [form, setform] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone_number: "",
    company_name: "",
    company_address: "",

  });
  
  const [loading, setLoading] = useState(false); 

  const handleSignUp = async () => {
    const { name, surname, email, password, phone_number, company_name, company_address } = form;
  
    if (!name || !surname || !email || !password || !phone_number || !company_name || !company_address) {
      Alert.alert("Lütfen, tüm alanları doldurunuz!");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await signUp(name, surname, email, password, phone_number, company_name, company_address);
      await saveToken(response.accessToken);
      navigation.navigate("Home");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.";
      Alert.alert("Hata", errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center items-center h-full px-4 my-6 py-6">
          <Image
            source={images.logo}
            className="w-[540] h-[84px]"
            resizeMode='contaion'
          />
          <FormField
          title="İsim"
          value={form.name}
          handleChangeText={(e) => setform({...form, name:e})}
          otherStyles="mt-7"
          icon={icons.heart}
          
          /><FormField
          title="Soyad"
          value={form.surname}
          handleChangeText={(e) => setform({...form, surname:e})}
          otherStyles="mt-7"
          icon={icons.surname}
          
          /><FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setform({...form, email:e})}
          otherStyles="mt-7"
          keyboardType="email-addres"
          icon={icons.mail}
          
          /><FormField
          title="Şifre"
          value={form.password}
          handleChangeText={(e) => setform({...form, password:e})}
          otherStyles="mt-7"
          icon={icons.password}
          
          /><FormField
          title="Telefon Numarası"
          value={form.phone_number}
          handleChangeText={(e) => setform({...form, phone_number:e})}
          otherStyles="mt-7"
          keyboardType="phone-pad"
          icon={icons.smartPhone}
          
          /><FormField
          title="Şirket İsmi"
          value={form.company_name}
          handleChangeText={(e) => setform({...form, company_name:e})}
          otherStyles="mt-7"
          icon={icons.home}
          
          />
          <FormField
          title="Adres"
          value={form.company_address}
          handleChangeText={(e) => setform({...form, company_address:e})}
          otherStyles="mt-7"
          icon={icons.map}
          />
          <CustomButton
            title="Kayıt Ol"
            handlePress={() => (router.push('./sign-in'))}
            containerStyles="w-64 mt-7 items-center"
            icon={icons.plus}
          />
          <View className="flex justify-center flex-row gap-2">
            <Text className="p-2 text-base text-newTextColor font-pregular">
              Hesabınız var ise
            </Text>
            <Link  href='/sign-in' className='p-2 text-base text-primary font-pregular'>
              Giriş Yap
            </Link>
            
          </View> 
            
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default SignUpScreen;