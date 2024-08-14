import * as SecureStorage from 'react-native-secure-storage';

// Saves the authentication token to secure storage
const saveToken = async (token) => {
    try {
        await SecureStorage.setItem("authToken", token);
    } catch (error) {
        console.error("Error saving token: ", error);
        throw new Error("Failed to save token."); // Optional: Throw an error for higher-level handling
    }
};

// Retrieves the authentication token from secure storage
const getToken = async () => {
    try {
        const token = await SecureStorage.getItem("authToken");
        return token;
    } catch (error) {
        console.error("Error retrieving token: ", error);
        throw new Error("Failed to retrieve token."); // Optional: Throw an error for higher-level handling
    }
};

export { saveToken, getToken };
