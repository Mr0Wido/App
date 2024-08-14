import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormFiled = ({ 
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles,
    ...props 
    }) => {
        const [showPassword, setShowPassword] = useState(false);

        return (
            <View className={`space-y-2 ${otherStyles}`}>
                <Text className = "text-base text-slate-950 font-pmedium">{title}</Text>
                <View className = "w-full h-16 px-4 bg-gray-800 rounded-2xl border-y-red-700 border-4 focus:border-secondary flex flex-row items-center">
                    <TextInput
                        className = "flex*2 text-white font-psemibold text-base"
                        value = {value}
                        placeholder = {placeholder}
                        placeholderTextColor = "gray-200"
                        onchangeText = {handleChangeText}
                        secureTextEntry = {title === 'Şifre' && !showPassword}
                        {...props} 
                    />
                    {title === 'Şifre' && (
                        <TouchableOpacity onPress = {() => setShowPassword(!showPassword)}>
                            <Image
                                source ={!showPassword ? icons.eye : icons.eyeHide}
                                className = "w-6 h-6"
                                resizeMode = "contain"
                            />
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    export default FormFiled;
