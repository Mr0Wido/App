import {
    View,
    Text,
    SafeAreaView,
    Image,
    ScrollView,
    Pressable,
    Alert,
    ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { icons } from "../../constants";
import { router } from "expo-router";
import { getProfile, updateProfile } from '../../services/apiService'; // API service import

const ProfileDetail = () => {
    const [form, setForm] = useState({
        name: "",
        surname: "",
        email: "",
        password: "",
        phone_number: "",
        company_name: "",
        company_address: "",
    });

    const [customerNumber, setCustomerNumber] = useState("#12345678");
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const profileData = await getProfile();
                setForm({
                    name: profileData.name,
                    surname: profileData.surname,
                    email: profileData.email,
                    password: "", // Keep password empty initially
                    phone_number: profileData.phone_number,
                    company_name: profileData.company_name,
                    company_address: profileData.company_address,
                });
                setCustomerNumber(`#${profileData.customer_number}`);
            } catch (error) {
                Alert.alert('Error', 'Failed to load profile data. Please try again.');
                console.error('Error fetching profile data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleActionPress = async () => {
        if (!submitting) {
            await submit();
        }
    };

    const submit = async () => {
        setSubmitting(true);
        try {
            await updateProfile(form);
            Alert.alert('Success', 'Profile updated successfully!');
        } catch (error) {
            Alert.alert('Error', 'Failed to update profile. Please try again.');
            console.error('Error submitting form:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <SafeAreaView className="flex-1 justify-center items-center">
                <ActivityIndicator size="large" color="blue" />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="h-full bg-white">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View className="flex-row items-center justify-start w-full pt-20 pl-6">
                    <Pressable onPress={() => router.back()}>
                        <Image source={icons.back} className="w-8 h-8" />
                    </Pressable>
                    <Image
                        source={icons.user}
                        className="w-12 h-12 ml-4"
                        style={{ tintColor: "orange" }}
                    />
                    <Text className="ml-4 text-xl font-semibold">
                        Kullanıcı Bilgileri{' '}
                        <Text style={{ color: 'orange' }}>
                            {customerNumber}
                        </Text>
                    </Text>
                </View>
                <View className="flex-1 flex-col justify-center items-center mt-2 pb-12">
                    <FormField
                        title="İsim"
                        value={form.name}
                        handleChangeText={(e) => setForm({ ...form, name: e })}
                        isEditable={true}
                        icon={icons.heart}
                        otherStyles="mt-5"
                    />
                    <FormField
                        title="Soyisim"
                        value={form.surname}
                        handleChangeText={(e) => setForm({ ...form, surname: e })}
                        isEditable={true}
                        icon={icons.surname}
                        otherStyles="mt-5"
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        isEditable={true}
                        icon={icons.mail}
                        otherStyles="mt-5"
                    />
                    <FormField
                        title="Telefon Numarası"
                        value={form.phone_number}
                        handleChangeText={(e) => setForm({ ...form, phone_number: e })}
                        isEditable={true}
                        icon={icons.smartPhone}
                        otherStyles="mt-5"
                    />
                    <FormField
                        title="Şirket İsmi"
                        value={form.company_name}
                        handleChangeText={(e) => setForm({ ...form, company_name: e })}
                        isEditable={true}
                        icon={icons.home}
                        otherStyles="mt-5"
                    />
                    <FormField
                        title="Adres"
                        value={form.company_address}
                        handleChangeText={(e) => setForm({ ...form, company_address: e })}
                        isEditable={true}
                        icon={icons.map}
                        otherStyles="mt-5"
                    />
                    <CustomButton
                        title="Değişiklikleri Kaydet"
                        handlePress={handleActionPress}
                        containerStyles="bg-primary w-48 h-12 mt-5 items-center"
                        icon={icons.check}
                        isLoading={submitting}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default ProfileDetail;
