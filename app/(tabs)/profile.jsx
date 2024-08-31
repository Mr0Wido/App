import { View, Text, SafeAreaView, Image, ScrollView, Pressable } from 'react-native'
import React, { useState } from 'react'
import FormField from '../../components/FormField';
import CustomButton from '../../components/CustomButton';
import { icons } from '../../constants';




const Profile = () => {
  const handleIconPress = () => {
    seticonClicked(prevState => !prevState)
  }
  const handleActionPress = () => {
    if(iconClicked){
      seticonClicked(prevState => !prevState)
    }
    submit();
  }
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
  const [iconClicked, seticonClicked] = useState(false)

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
       <View className="w-full flex-row items-center justify-center">
        <Image 
          className="w-12 h-12 mt-14 right-8"
          source={icons.user}
          tintColor={'orange'}
        />
       <FormField
        title="Müşteri Numarası"
        value={form.customerNo}
        otherStyles="mt-7"
      />
      <Pressable
        className="mt-14 left-8"
        onPress={handleIconPress}
      >
        <Image 
          className="w-12 h-12 "
          source={icons.change}
          tintColor={iconClicked ? 'orange': 'black'}

        />
      </Pressable>
      
       </View>
       <View className="w-full flex-row justify-center items-center  mt-8 -mb-16 ">
         <Text className="text-3xl font-semibold items-center justify-center">
          Hesap Bilgileri {iconClicked ? "true":"false"}
        </Text>
       </View>
      <View className="w-full justify-center items-center h-full px-4">
      <FormField
        title="İsim"
        value={form.username}
        handleChangeText={(e) => setform({...form, username:e})}
        isEditable={iconClicked}
        otherStyles="mt-7"
        icon={icons.heart}
      />
      <FormField
        title="Soyisim"
        value={form.surname}
        handleChangeText={(e) => setform({...form, surname:e})}
        isEditable={iconClicked}
        otherStyles="mt-7"
        icon={icons.surname}
      />
      <FormField
        title="Email"
        value={form.email}
        handleChangeText={(e) => setform({...form, email:e})}
        isEditable={iconClicked}
        otherStyles="mt-7"
        icon={icons.mail}
      />
      <FormField
        title="Şifre"
        value={form.password}
        handleChangeText={(e) => setform({...form, password:e})}
        isEditable={iconClicked}
        otherStyles="mt-7"
        icon={icons.password}
      />
      <FormField
        title="Telefon Numarası"
        value={form.phoneNumber}
        handleChangeText={(e) => setform({...form, phoneNumber:e})}
        isEditable={!iconClicked}
        otherStyles="mt-7"
        icon={icons.smartPhone}
      />
      <FormField
        title="Şirket İsmi"
        value={form.companyName}
        handleChangeText={(e) => setform({...form, companyName:e})}
        isEditable={iconClicked}
        otherStyles="mt-7"
        icon={icons.home}
      />
      <FormField
        title="Adres"
        value={form.companyAddress}
        handleChangeText={(e) => setform({...form, companyAddress:e})}
        isEditable={iconClicked}
        otherStyles="mt-7"
        icon={icons.map}
      />
      
      <CustomButton
        title="Kaydet"
        handlePress={handleActionPress}
        containerStyles="bg-primary w-64 h-20 mt-7 items-center"
        icon={icons.check}
      />
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Profile