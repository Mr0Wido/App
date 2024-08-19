import { View, Text, Image, Pressable} from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '../../components/CustomButton';
import FormField from '../../components/FormField';
import { icons } from '../../constants';
import { images } from '../../constants'

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
      <View className="w-full justify-center items-center px-4 my-6 py-6 flex-row">
        <FormField
          title="Bircan TOPTAN"
          value={"55-555-555-555"}
          otherStyles="mt-7"
        />
        <Pressable
          className="mt-4 left-8"
          onPress={handleIconPressed}
        >
          <Image 
            className="w-12 h-12 -mb-2"
            source={icons.phone}
            tintColor={iconClicked ? "orange": "black"}
            
          />
        </Pressable>
      </View>
      <View className="w-full justify-center items-center px-4 my-6 py-6">
        <Text>HELLO</Text>
      </View>
      
    </SafeAreaView>
  );
}

export default Communication