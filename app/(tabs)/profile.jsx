import { View, Text, SafeAreaView, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';



const Profile = () => {
  
  const submit = async () => {

  }

  const [form, setform] = useState({
    customerNo: "",
    username: "", // burası data cekicek
    surname: "",
    email: "",
    password: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",

  });

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
       <View className="w-full flex-row items-center justify-center">
       <FormField
        title="Müşteri Numarası"
        value={form.customerNo}
        otherStyles="mt-7"
        icon={icons.user}
      />
       </View>
      <View className="w-full justify-center items-start h-full px-4">
      <FormField
        title="İsim"
        value={form.username}
        otherStyles="mt-7"
        icon={icons.heart}
      />
      <FormField
        title="Soyisim"
        value={form.username}
        otherStyles="mt-7"
        icon={icons.surname}
      />
      <FormField
        title="Email"
        value={form.username}
        otherStyles="mt-7"
        icon={icons.mail}
      />
      <FormField
        title="Şifre"
        value={form.username}
        otherStyles="mt-7"
        icon={icons.password}
      />
      <FormField
        title="Telefon Numarası"
        value={form.username}
        otherStyles="mt-7"
        icon={icons.smartPhone}
      />
      <FormField
        title="Şirket İsmi"
        value={form.companyAddress}
        otherStyles="mt-7"
        icon={icons.home}
      />
       <FormField
        title="Adres"
        value={form.companyAddress}
        otherStyles="mt-7"
        icon={icons.map}
      />
      <CustomButton
        
        title="Kaydet"
        handlePress={submit}
        containerStyles="w-64 mt-7 items-center"
        icon={icons.check}
      />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile