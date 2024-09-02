import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { saveToken } from '../../services/secureStorage';
import { icons } from '../../constants';
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { images } from '../../constants';
import { signUp } from '../../services/apiService';
import { Link, router } from 'expo-router';
import { Field, Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
    name: Yup.string().required('İsim alanı zorunludur'),
    surname: Yup.string().required('Soyad alanı zorunludur'),
    email: Yup.string().email('Geçerli bir email adresi giriniz').required('Email alanı zorunludur'),
    password: Yup.string().required('Şifre alanı zorunludur'),
    phone_number: Yup.string().required('Telefon numarası alanı zorunludur'),
    company_name: Yup.string().required('Şirket ismi alanı zorunludur'),
    company_address: Yup.string().required('Şirket adresi alanı zorunludur'),
});

const SignUpScreen = () => {
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView>
                <View className="w-full justify-center items-center h-full px-4 my-6 py-6">
                    <Image
                        source={images.logo}
                        className="w-[540] h-[84px]"
                    />
                    <Formik
                        initialValues={{ name: '', surname: '', email: '', password: '', phone_number: '', company_name: '', company_address: '' }}
                        validationSchema={validationSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            setSubmitting(true);
                            try {
                                const response = await signUp(
                                    values.name,
                                    values.surname,
                                    values.email,
                                    values.password,
                                    values.phone_number,
                                    values.company_name,
                                    values.company_address
                                );
                                await saveToken(response.token);
                                router.replace('/home');
                            } catch (error) {
                                const errorMessage = error?.response?.data?.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
                                Alert.alert('Hata', errorMessage);
                            } finally {
                                setSubmitting(false);
                            }
                        }}
                    >
                        {({ isSubmitting, submitForm }) => (
                            <View>       
                                <Field name="name">
                                    {({ field, meta }) => (
                                        <FormField
                                            title="İsim"
                                            value={field.value}
                                            handleChangeText={(text) => field.onChange(field.name)(text)}
                                            error={meta.touched && meta.error}
                                            otherStyles="mt-7"
                                            icon={icons.heart}
                                        />
                                    )}
                                </Field>
                                <Field name="surname">
                                    {({ field, meta }) => (
                                        <FormField
                                            title="Soyad"
                                            value={field.value}
                                            handleChangeText={(text) => field.onChange(field.name)(text)}
                                            error={meta.touched && meta.error}
                                            otherStyles="mt-7"
                                            icon={icons.surname}
                                        />
                                    )}
                                </Field>
                                <Field name="email">
                                    {({ field, meta }) => (
                                        <FormField
                                            title="Email"
                                            value={field.value}
                                            handleChangeText={(text) => field.onChange(field.name)(text)}
                                            error={meta.touched && meta.error}
                                            otherStyles="mt-7"
                                            keyboardType="email-address"
                                            icon={icons.mail}
                                        />
                                    )}
                                </Field>
                                <Field name="password">
                                    {({ field, meta }) => (
                                        <FormField
                                            title="Şifre"
                                            value={field.value}
                                            handleChangeText={(text) => field.onChange(field.name)(text)}
                                            error={meta.touched && meta.error}
                                            otherStyles="mt-7"
                                            icon={icons.password}
                                        />
                                    )}
                                </Field>
                                <Field name="phone_number">
                                    {({ field, meta }) => (
                                        <FormField
                                            title="Telefon Numarası"
                                            value={field.value}
                                            handleChangeText={(text) => field.onChange(field.name)(text)}
                                            error={meta.touched && meta.error}
                                            otherStyles="mt-7"
                                            keyboardType="phone-pad"
                                            icon={icons.smartPhone}
                                        />
                                    )}
                                </Field>
                                <Field name="company_name">
                                    {({ field, meta }) => (
                                        <FormField
                                            title="Şirket İsmi"
                                            value={field.value}
                                            handleChangeText={(text) => field.onChange(field.name)(text)}
                                            error={meta.touched && meta.error}
                                            otherStyles="mt-7"
                                            icon={icons.home}
                                        />
                                    )}
                                </Field>
                                <Field name="company_address">
                                    {({ field, meta }) => (
                                        <FormField
                                            title="Adres"
                                            value={field.value}
                                            handleChangeText={(text) => field.onChange(field.name)(text)}
                                            error={meta.touched && meta.error}
                                            otherStyles="mt-7"
                                            icon={icons.map}
                                        />
                                    )}
                                </Field>
                                <CustomButton
                                    title={isSubmitting ? "Kayıt Ediliyor..." : "Kayıt Ol"}
                                    handlePress={submitForm} // Buton tıklandığında formu gönder
                                    containerStyles="bg-primary w-64 h-20 mt-7 items-center"
                                    icon={icons.plus}
                                    isLoading={isSubmitting} // Loading durumunu CustomButton'a geç
                                />
                                <View className="flex justify-center flex-row gap-2">
                                    <Text className="p-2 text-base text-newTextColor font-pregular">
                                        Hesabınız var ise
                                    </Text>
                                    <Link href='/sign-in' className='p-2 text-base text-primary font-pregular'>
                                        Giriş Yap
                                    </Link>
                                </View>
                            </View>
                        )}
                    </Formik>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen;
