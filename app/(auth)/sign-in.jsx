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
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6"
      
        >
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[540px] h-[270px] "
          />
          <FormField
          title="Email"
          value={form.email}
          handleChangeText={(e) => setform({...form, email:e})}
          otherStyles="mt-7"
          keyboardType="email-addres"
          />
          <FormField
          title="Password"
          value={form.password}
          handleChangeText={(e) => setform({...form, password:e})}
          otherStyles="mt-7"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn