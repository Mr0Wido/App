import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveToken } from '../../services/secureStorage';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { images } from '../../constants';
import { signIn } from '../../services/apiService';
import { Link, router } from 'expo-router';
import { icons } from '../../constants';
import { Alert } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Geçerli bir email adresi giriniz').required('Email alanı zorunludur'),
  password: Yup.string().required('Şifre alanı zorunludur'),
});

const SignIn = () => {
  const handleSignIn = async (values) => {
    const { email, password } = values;

  try {
    const response = await signIn(email, password);
    await saveToken(response.token);
    router.replace('/home');
  } catch (error) {
    const errorMessage = error?.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
    Alert.alert('Hata', errorMessage);
  }
};

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View
          className="w-full justify-center items-center h-full px-4 my-6 py-6"
          style={{
            minHeight: Dimensions.get("window").height - 100,
          }}
        >
          <Image
            source={images.logo}
            className="w-[540] h-[84px]"
            resize="contain"
          />
          <Formik
          initialValues = {{email: '', password: ''}}
          validationSchema = {validationSchema}
          onSubmit={handleSignIn}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting}) => (
            <>
              <FormField
                title="Email"
                value={values.email}
                handleChangeText= {handleChange('email')}
                handleBlur={handleBlur('email')}
                otherStyles="mt-7"
                keyboardType="email-address"
                icon={icons.user}
                error={touched.email && errors.email}
              />
              <FormField
                title="Şifre"
                value={values.password}
                handleChangeText={handleChange('password')}
                handleBlur={handleBlur('password')}
                otherStyles="mt-7"
                icon={icons.password}
                error ={touched.password && errors.password}
                
              />
              <CustomButton
                title="Giriş Yap"
                handlePress={handleSubmit}
                containerStyles="bg-primary w-64 h-20 mt-7 items-center"
                icon={icons.home}
                isLoading={isSubmitting}
              />
              <View className="flex justify-center flex-row gap-2">
                <Text className="p-2 text-sm text-newTextColor font-pregular">
                  Hesabınız yok mu? 
                </Text>
                <Link href="/sign-up" className="p-2 text-sm font-psemibold text-primary">
                  Kayıt Ol
                </Link>
                <Link href="/home" className="p-2 text-sm font-psemibold text-primary">
                  Anasayfa
                </Link>
              </View>
            </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
