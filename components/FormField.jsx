import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";


import { icons } from "../constants";

const FormField = ({
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
            <Text className="text-base text-newTextColor font-pmedium">{title}</Text>

            <View className="w-full h-10 px-16 bg-white rounded-2xl border-2 border-gray-200 focus:border-secondary flex flex-row items-center">
            <View className="flex-row justify-center items-center">
            <TextInput
                className="flex-1 text-newTextColor font-psemibold text-base"
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7B7B8B"
                onChangeText={handleChangeText}
                secureTextEntry={title === "Password" && !showPassword}
                {...props}
            />

            {title === "Password" && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-6 h-6"
                    resizeMode="contain"
                />
                </TouchableOpacity>
            )}
            </View>
            </View>
        </View>
    );
};

export default FormField;
