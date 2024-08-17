import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";


import { icons } from "../constants";



const SearchInput= ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props
    }) => {
   
   

    return (

            <View className="w-80 h-10 px-12 bg-slate-50 rounded-2xl border-2 border-gray-300 focus:border-secondary items-center flex-row space-x-4"
        >
            <TextInput
                className="text-base mt-0.5 text-black flex-1 font-pregular"
                value={value}
                placeholder="Ürün ara"
                placeholderTextColor="#7B7B8B"
                onChangeText={handleChangeText}
                secureTextEntry={title === "Şifre" && !showPassword}
                {...props}
            />
            <TouchableOpacity>
                <Image
                    source={icons.search}
                    className="w-5 h-5 left-4"
                    tintColor={'black'}
                    resizeMode='contain'
                />
            </TouchableOpacity>
            
            </View>
        
    );
};

export default SearchInput;
