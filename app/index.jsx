import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import  CustomButton  from '../components/CustomButton';
import { Redirect, router } from 'expo-router';



export default function App(){
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
                            containerStyles={"w-64 mt-7 items-center"}
                        />
                    </View>
                    <View>
                        <CustomButton
                            title="Kayıt Ol"
                            handlePress={() => {router.push('./sign-up')}}
                            containerStyles={"w-64 mt-7 items-center"}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}