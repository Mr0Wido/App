import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";


import { icons } from "../constants";



const FormField = ({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    icon,
    ...props
    }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [isFocus, setisFocus] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-newTextColor font-pmedium">{title}</Text>

            <View className="w-80 h-10 px-12 bg-slate-50 rounded-2xl border-2 border-gray-300 focus:border-secondary  items-center flex-row"
        >
            {icon && (
            <Image
                source={icon}
                className="w-6 h-6 right-8"
                resizeMode="contain"
                style={{tintColor: isFocus ? 'orange' : 'black'}}
                
            />
        )}
        
            <TextInput
                className="flex-1 text-newTextColor font-psemibold text-base"
                value={value}
                style={{}}
                placeholder={placeholder}
                placeholderTextColor="#7B7B8B"
                onChangeText={handleChangeText}
                source={icon}
                onFocus={() => setisFocus(true)}
                onBlur={() => setisFocus(false)}
                secureTextEntry={title === "Şifre" && !showPassword}
                {...props}
            />

            {title === "Şifre" && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-6 h-6 flex-row left-8"
                    resizeMode="contain"
                />
                </TouchableOpacity>
           
            )}
            
            </View>
        </View>
    );
};

export default FormField;
