import { View, Text, Image,} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { icons } from '../../constants';
import { images } from '../../constants'
import { ScrollView } from 'react-native-gesture-handler';

const Communication = () => {
 
  const handleIconPressed = () => {
    seticonClicked(prevState => !prevState);
    submit();
  }
  const [iconClicked, seticonClicked] = useState(false)
  const submit = () => {
    
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView>
      <View className="w-full justify-center items-center px-4 my-6 py-6">
      <Image
            source={images.logo}
            className="w-[540] h-[84px]"
            resize='contain'
          />
        <Image 
          source={icons.phone}
          className="w-12 h-12 mt-7"
          tintColor={'black'}
        />
        <View className="flex-1 flex-row items-center justify-center">
        <FormField
          title="Bircan TOPTAN"
          value={"55-555-555-555"}
          otherStyles="mt-4 mx-2"
        />
        <CustomButton 
          title={"Ara"}
          containerStyles="w-36 mt-4 items-center mx-2 bg-green-500"
          handlePress={submit}
          
        />
        </View>
      </View>
      <View className="w-full justify-center items-center px-4 my-6 py-2">
        <Image 
          source={icons.whatsApp}
          className="w-12 h-12 mt-7"
        />
        <Text className="text-base text-center font-pregular mt-2">WhatsApp İletişim</Text>
        <CustomButton 
          title={"Mesaj Gönder"}
          containerStyles="w-96 mt-4 items-center mx-2 bg-green-500"
          handlePress={submit}
        />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Communication