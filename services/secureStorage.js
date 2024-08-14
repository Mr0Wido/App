import reactNativeSecureStorage from "react-native-secure-storage";

const saveToken = async (token) => {
    try {
        await reactNativeSecureStorage.setItem("authToken", token);
    } catch (error) {
        console.error("Token kaydedilirken bir hata oluştu: ", error);
    }
};

const getToken = async () => {
    try {
        const token = await reactNativeSecureStorage.getItem("authToken");
        return token;
    } catch (error) {
        console.error("Token alınırken bir hata oluştu: ", error);
    }
};

export { saveToken, getToken };