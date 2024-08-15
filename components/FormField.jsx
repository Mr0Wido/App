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
    selectionColor,
    ...props
    }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-newTextColor font-pmedium">{title}</Text>

            <View className="w-80 h-10 px-12 bg-white rounded-2xl border-2 border-gray-200 focus:border-secondary  items-center flex-row"
           >
             {icon && (
            <Image
                source={icon}
                className="w-6 h-6 right-8"
                resizeMode="contain"
                tintColor={"orange"}
                
            />
        )}
        
            <TextInput
                className="flex-1 text-newTextColor font-psemibold text-base rig "
                value={value}
                placeholder={placeholder}
                placeholderTextColor="#7B7B8B"
                onChangeText={handleChangeText}
                source={icon}
                selectionColor="newTextColor"
                secureTextEntry={title === "Şifre" && !showPassword}
                {...props}
            />

            {title === "Şifre" && (
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Image
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    className="w-6 h-6 flex-row left-12"
                    resizeMode="contain"
                />
                </TouchableOpacity>
           
            )}
            
            </View>
        </View>
    );
};

export default FormField;
