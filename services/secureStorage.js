import * as SecureStore from 'expo-secure-store';

// Saves the authentication token to secure storage
const saveToken = async (token) => {
    try {
        await SecureStore.setItemAsync('authToken', token);
    } catch (error) {
        console.error("Error saving token: ", error);
        throw new Error("Failed to save token.");
    }
};

// Retrieves the authentication token from secure storage
const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('authToken');
        return token;
    } catch (error) {
        console.error("Error retrieving token: ", error);
        throw new Error("Failed to retrieve token.");
    }
};

export { saveToken, getToken };
