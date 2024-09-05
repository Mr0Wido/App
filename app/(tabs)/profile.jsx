import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";

const Profile = () => {
  const [form, setform] = useState({
    customerNo: "",
    username: "",
    surname: "",
    email: "",
    password: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
  });
  const [iconClicked, seticonClicked] = useState(false);
  const [showForm, setshowForm] = useState(false);

  const handleIconPress = () => {
    seticonClicked((prevState) => !prevState);
    
  };

  const handleActionPress = () => {
    if (iconClicked) {
      seticonClicked((prevState) => !prevState);
    }
    submit();
  };
  const handleShowForm = () => {
    setshowForm((prevState) => !prevState);
  }

  const submit = async () => {
    // Form submit logic
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
        <View className="w-full flex-col justify-center items-center mt-12">
          <View className="justify-center items-center flex-row flex-1">
          <Image
              source={icons.user}
              className="w-12 h-12 mr-8"
              style={{ tintColor: "orange" }} // statik tintColor
            />
          <Text className="text-xl bg-slate-50 rounded-xl border-2 border-gray-300 text-black font-psemibold">
          No: #5555
          </Text>
          </View>
          <CustomButton 
            title={showForm ? "Bilgileri Gizle" : "Bilgileri Görüntüle"}
            handlePress={handleShowForm}
            containerStyles="bg-primary w-64 h-12 mt-7 items-center"
            icon={showForm ? icons.up : icons.down}
          />
          <View className="justify-center items-center flex-row flex-1 mt-12">
            <Image 
              source={icons.bag}
              className="w-12 h-12 mr-8"
              style={{tintColor: "orange"}}
            />
            <Text className="text-xl text-black font-psemibold">
          Siparişlerim
          </Text>
          </View>
          <CustomButton 
            title={ "Sipariş Görüntüle" }
            handlePress={handleShowForm}
            containerStyles="bg-primary w-64 h-12 mt-7 items-center"
            icon={icons.down}
          />
        </View>
        {showForm && (
          <View className="w-full justify-center items-center mt-7">
            <Text className="text-2xl font-psemibold">
              Hesap Bilgileri {iconClicked ? "true" : "false"}
            </Text>
            <Pressable onPress={handleIconPress}>
              <Image
                source={icons.change}
                className="w-12 h-12 ml-8"
                style={{ tintColor: iconClicked ? "orange" : "black" }}
              />
            </Pressable>
            <FormField
              title="İsim"
              value={form.username}
              handleChangeText={(e) => setform({ ...form, username: e })}
              isEditable={iconClicked}
              icon={icons.heart}
              otherStyles="mt-7"
            />
            <FormField
              title="Soyisim"
              value={form.surname}
              handleChangeText={(e) => setform({ ...form, surname: e })}
              isEditable={iconClicked}
              icon={icons.surname}
              otherStyles="mt-7"
            />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e) => setform({ ...form, email: e })}
              isEditable={iconClicked}
              icon={icons.mail}
              otherStyles="mt-7"
            />
            <FormField
              title="Şifre"
              value={form.password}
              handleChangeText={(e) => setform({ ...form, password: e })}
              isEditable={iconClicked}
              icon={icons.password}
              otherStyles="mt-7"
            />
            <FormField
              title="Telefon Numarası"
              value={form.phoneNumber}
              handleChangeText={(e) => setform({ ...form, phoneNumber: e })}
              isEditable={!iconClicked}
              icon={icons.smartPhone}
              otherStyles="mt-7"
            />
            <FormField
              title="Şirket İsmi"
              value={form.companyName}
              handleChangeText={(e) => setform({ ...form, companyName: e })}
              isEditable={iconClicked}
              icon={icons.home}
              otherStyles="mt-7"
            />
            <FormField
              title="Adres"
              value={form.companyAddress}
              handleChangeText={(e) => setform({ ...form, companyAddress: e })}
              isEditable={iconClicked}
              icon={icons.map}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Kaydet"
              handlePress={handleActionPress}
              containerStyles="bg-primary w-64 h-12 mt-7 items-center"
              icon={icons.check}
            />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
