import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { icons } from "../constants";
import { getToken, removeToken } from '../services/secureStorage'; // keychainStorage yerine secureStore
import { useEffect } from 'react';
import axios from 'axios';

// API URL
const API_URL = process.env.API_URL || 'http://35.159.165.210:3000'; // .env dosyası için

export default function App() {

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await getToken(); // Token'ı secureStore'dan al
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
                        // Token geçersizse secureStore'dan sil ve giriş sayfasına yönlendir
                        if (error.response?.status === 401 || error.response?.status === 403) {
                            await removeToken(); // Token'ı secureStore'dan sil
                            router.replace('./sign-in');
                        } else {
                            console.error('Error checking token validity', error.message);
                            router.replace('./sign-in');
                        }
                    }
                } else {
                    router.replace('./sign-in');
                }
            } catch (error) {
                console.error('Error while checking token', error.message);
                router.replace('./sign-in');
            }
        };
        checkToken();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={images.logo}
                        style={{ width: 540, height: 84 }}
                        resizeMode='contain'
                    />
                    <View style={{ marginTop: 8 }}>
                        <Text style={{ fontSize: 24, color: '#000', fontFamily: 'Poppins-Regular', textAlign: 'center' }}>
                            HOŞ GELDİNİZ!
                        </Text>
                    </View>
                    <View style={{ marginTop: 7 }}>
                        <CustomButton
                            title="Giriş Yap"
                            handlePress={() => router.push('./sign-in')}
                            containerStyles={{ backgroundColor: '#6200EE', width: 256, height: 80, justifyContent: 'center', alignItems: 'center' }}
                            icon={icons.home}
                        />
                    </View>
                    <View style={{ marginTop: 7 }}>
                        <CustomButton
                            title="Kayıt Ol"
                            handlePress={() => router.push('./sign-up')}
                            containerStyles={{ backgroundColor: '#6200EE', width: 256, height: 80, justifyContent: 'center', alignItems: 'center' }}
                            icon={icons.plus}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
