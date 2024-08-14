import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import { Alert } from 'react-native';
import { saveToken } from '../../services/secureStorage';

import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { images } from '../../constants';
import { signUp } from '../../services/apiService';


const SignUpScreen = ({ navigation }) => {
  const [form, setform] = useState({
    name: "",
    surname: "",
    email: "",
    password_hash: "",
    phone_number: "",
    company_name: "",
    company_address: "",

  });
  
  const handleSignUp = async () => {
    const { name, surname, email, password_hash, phone_number, company_name, company_address } = form;
    
    if (!name || !surname || !email || !password_hash || !phone_number || !company_name || !company_address) {
      Alert.alert("Lütfen, tüm alanları doldurunuz!");
      return;
    }

    try {
      const response = await signUp(email, password_hash, name, surname, phone_number, company_name, company_address);
      const token = response.token; // JWT token burada döner
      await saveToken(token); // Token'ı güvenli depolamaya kaydediyoruz
      Alert.alert("Başarılı bir şekilde kayıt oldunuz!");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Kayıt olurken bir hata oluştu: ", error.message);
    }
  };



  return (
    <SafeAreaView className= "flex-1">
      <ScrollView>
        <View className="w-full h-full justify-center  px-4 my-6 py-6">
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[540] h-[84px]"
          />
          <FormField
          title="Name"
          value={form.name}
          handleChangeText={(e) => setform({...form, name:e})}
          otherStyles="mt-7"
          />
          <FormField
          title="Surname"
          value={form.surname}
          handleChangeText={(e) => setform({...form, surname:e})}
          otherStyles="mt-7"
          />
          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setform({...form, email:e})}
          otherStyles="mt-7"
          keyboardType="email-address"
          />
          <FormField
          title="Password"
          value={form.password_hash}
          handleChangeText={(e) => setform({...form, password_hash:e})}
          otherStyles="mt-7"
          secureTextEntry
          />
          <FormField
          title="Telefon Numarası"
          value={form.phone_number}
          handleChangeText={(e) => setform({...form, phone_number:e})}
          otherStyles="mt-7"
          keyboardType="phone-pad"
          />
          <FormField
          title="Company Name"
          value={form.company_name}
          handleChangeText={(e) => setform({...form, company_name:e})}
          otherStyles="mt-7"
          />
          <FormField
          title="Company Address"
          value={form.company_address}
          handleChangeText={(e) => setform({...form, company_address:e})}
          otherStyles="mt-7"
          />
          <CustomButton
            title="Sign Up"
            handlePress={handleSignUp}
            containerStyles={" mt-7 items-center"}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};



export default SignUpScreen;