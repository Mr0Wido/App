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
    userName: "",
    userSurname: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",

  });

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="w-full flex justify-center h-full px-4 my-6"
      
        >
          <Image
            source={images.logo}
            resizeMode='contain'
            className="w-[120x] h-[120px] "
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
          <FormField
          title="Name"
          value={form.userName}
          handleChangeText={(e) => setform({...form, password:e})}
          otherStyles="mt-7"
          />
          <FormField
          title="Surname"
          value={form.userSurname}
          handleChangeText={(e) => setform({...form, password:e})}
          otherStyles="mt-7"
          />
          <FormField
          title="Phone Number"
          value={form.password}
          handleChangeText={(e) => setform({...form, password:e})}
          otherStyles="mt-7"
          />
          <FormField
          title="Company Name"
          value={form.companyName}
          handleChangeText={(e) => setform({...form, password:e})}
          otherStyles="mt-7"
          />
          <FormField
          title="Company Address"
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