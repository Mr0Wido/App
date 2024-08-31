import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import  CustomButton  from '../components/CustomButton';
import { Redirect, router } from 'expo-router';
import { icons } from "../constants";
import { getToken } from '../services/secureStorage';
import { useEffect } from 'react';



export default function App(){

    useEffect(() => {
        const checkToken = async () => {
            try {
                const token = await getToken();
                if(token){
                    router.replace('./home');
                }
                else{
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
            <ScrollView contentContainerStyle={{height:'100%'}}>
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
                            handlePress={() => {router.push('./sign-in')}}
                            containerStyles={"bg-primary w-64 h-20 mt-7 items-center"}
                            icon={icons.home}
                        
                        />
                    </View>
                    <View>
                        <CustomButton
                            title="Kayıt Ol"
                            handlePress={() => {router.push('./sign-up')}}
                            containerStyles={"bg-primary w-64 h-20 mt-7 items-center"}
                            icon={icons.plus}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}