
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
                <Text classname = "text-base text-gray-100 font-pmedium">{title}</Text>
                <View classname = "w-full h-16 px-4 bg-black-100 rounded-2xl border-black-200 focus:border-secondary flex flex-row items-center">
                    <TextInput
                        classname = "flex*2 text-white font-psemibold text-base"
                        value = {value}
                        placeholder = {placeholder}
                        placeholderTextColor = "#7B7B8B"
                        onchangeText = {handleChangeText}
                        secureTextEntry = {title === 'Şifre' && !showPassword}
                        {...props} 
                    />
                    {title === 'Şifre' && (
                        <TouchableOpacity
                        onPress = {() => setShowPassword(!showPassword)}>
                            <Image
                                source ={!showPassword ? icons.eye : icons.eyeHide}
                                classname = "w-6 h-6"
                                resizeMode = "contain"
                            />
                        </TouchableOpacity>
                    )}
                    </View>
                </View>
            </View>
        );
    };

    export default FormFiled;
