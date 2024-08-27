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

const SignUpScreen = () => {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone_number: "",
        company_name: "",
        company_address: "",
    });

    const [loading, setLoading] = useState(false);
    const [isSubmitting, setSubmitting] = useState(false);

    const handleSignUp = async () => {
        const { name, surname, email, password, phone_number, company_name, company_address } = form;

        if (!name || !surname || !email || !password || !phone_number || !company_name || !company_address) {
            Alert.alert("Lütfen, tüm alanları doldurunuz!");
            return;
        }

        setSubmitting(true); // Start submitting
        setLoading(true);

        try {
            const response = await signUp(name, surname, email, password, phone_number, company_name, company_address);
            await saveToken(response.token); // Token'ı kaydediyoruz
            router.replace('/home'); // Navigate to Home screen
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Bir hata oluştu. Lütfen tekrar deneyin.";
            Alert.alert("Hata", errorMessage);
        } finally {
            setSubmitting(false); // Stop submitting
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
                    />
                    <FormField
                        title="İsim"
                        value={form.name}
                        handleChangeText={(e) => setForm({ ...form, name: e })}
                        otherStyles="mt-7"
                        icon={icons.heart}
                    />
                    <FormField
                        title="Soyad"
                        value={form.surname}
                        handleChangeText={(e) => setForm({ ...form, surname: e })}
                        otherStyles="mt-7"
                        icon={icons.surname}
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                        icon={icons.mail}
                    />
                    <FormField
                        title="Şifre"
                        value={form.password}
                        handleChangeText={(e) => setForm({ ...form, password: e })}
                        otherStyles="mt-7"
                        icon={icons.password}
                    />
                    <FormField
                        title="Telefon Numarası"
                        value={form.phone_number}
                        handleChangeText={(e) => setForm({ ...form, phone_number: e })}
                        otherStyles="mt-7"
                        keyboardType="phone-pad"
                        icon={icons.smartPhone}
                    />
                    <FormField
                        title="Şirket İsmi"
                        value={form.company_name}
                        handleChangeText={(e) => setForm({ ...form, company_name: e })}
                        otherStyles="mt-7"
                        icon={icons.home}
                    />
                    <FormField
                        title="Adres"
                        value={form.company_address}
                        handleChangeText={(e) => setForm({ ...form, company_address: e })}
                        otherStyles="mt-7"
                        icon={icons.map}
                    />
                    <CustomButton
                        title={isSubmitting ? "Kayıt Ediliyor..." : "Kayıt Ol"}
                        handlePress={handleSignUp}
                        containerStyles="bg-primary w-64 mt-7 items-center"
                        icon={icons.plus}
                        isLoading={isSubmitting} // Pass loading state to CustomButton
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
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUpScreen;
