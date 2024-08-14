import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { useState} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { images } from '../../constants';

const SignIn = () => {

  const [form, setform] = useState({
    email: "",
    password: "",
  });

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView >
        <View className="w-full justify-center items-center h-full px-4 my-6"
              style={{
                  minHeight: Dimensions.get("window").height - 100,
                }}
        >
          <Image
            source={images.logo}
            className="w-[540] h-[84px]"
            resize='contain'
          />
          <View>
          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setform({...form, email:e})}
          otherStyles="mt-7"
          keyboardType="email-addres"
          />
          <FormField
          title="Şifre"
          value={form.password}
          handleChangeText={(e) => setform({...form, password:e})}
          otherStyles="mt-7"
          />
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn