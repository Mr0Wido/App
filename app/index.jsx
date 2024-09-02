import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { icons } from "../constants";
import { getToken, removeToken } from '../services/secureStorage';
import { useEffect } from 'react';
import axios from 'axios';

// API URL
const API_URL = 'http://35.159.165.210:3000'; // Sunucu adresinizi buraya ekleyin

export default function App() {

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await getToken();
                if (token) {
                    // Token geçerliliğini kontrol et
                    try {
                        await axios.get(`${API_URL}/api/profile`, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        });
                        // Token geçerliyse ana sayfaya yönlendir
                        router.replace('./home');
                    } catch (error) {
                        // Token geçersizse Secure Storage'dan sil ve giriş sayfasına yönlendir
                        if (error.response?.status === 401 || error.response?.status === 403) {
                            await removeToken();
                            router.replace('./sign-in');
                        } else {
                            console.error('Error checking token validity', error);
                            router.replace('./sign-in');
                        }
                    }
                } else {
                    router.replace('./sign-in');
                }
            } catch (error) {
                console.error('Error while checking token', error);
                router.replace('./sign-in');
            }
        };
        checkToken();
    }, []);

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center h-full px-4">
                    <Image
                        source={images.logo}
                        className="w-[540] h-[84px]"
                        resize='contain'
                    />
                    <View className="mt-8">
                        <Text className=" text-3xl text-newTextColor font-pregular text-center">HOŞ GELDİNİZ!
                        </Text>
                    </View>
                    <View>
                        <CustomButton
                            title="Giriş Yap"
                            handlePress={() => { router.push('./sign-in') }}
                            containerStyles={"bg-primary w-64 h-20 mt-7 items-center"}
                            icon={icons.home}
                        />
                    </View>
                    <View>
                        <CustomButton
                            title="Kayıt Ol"
                            handlePress={() => { router.push('./sign-up') }}
                            containerStyles={"bg-primary w-64 h-20 mt-7 items-center"}
                            icon={icons.plus}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
