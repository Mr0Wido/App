import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  handleBlur,
  fieldName, // Field name to identify the form field
  otherStyles,
  icon,
  error,
  isEditable = true,
  secureTextEntry,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-black font-pmedium">{title}</Text>

      <View className="w-80 h-10 px-12 bg-slate-50 rounded-2xl border-2 border-gray-300 flex-row items-center">
        {icon && (
          <Image
            source={icon}
            className="w-6 h-6 absolute left-4"
            resizeMode="contain"
            style={{ tintColor: isFocus ? "orange" : "black" }}
          />
        )}

        <TextInput
          className="flex-1 text-newTextColor font-psemibold text-base pl-12"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={isEditable ? handleChangeText : undefined}
          editable={isEditable}
          onFocus={() => setIsFocus(true)}
          onBlur={() => {
            setIsFocus(false);
            if (handleBlur) handleBlur(fieldName); // HandleBlur işlevini doğru bir şekilde çağırın
          }}
          secureTextEntry={title === "Şifre" && !showPassword}
          {...props}
        />

        {title === "Şifre" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={{ position: "absolute", right: 10 }}
          >
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </View>
  );
};

export default FormField;
