import * as SecureStore from 'expo-secure-store';

// Saves the authentication token to secure storage
const saveToken = async (token) => {
    try {
        await SecureStore.setItemAsync('authToken', token);
    } catch (error) {
        console.error("Error saving token: ", error.message);
        throw new Error("Failed to save token.");
    }
};

// Retrieves the authentication token from secure storage
const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('authToken');
        return token;
    } catch (error) {
        console.error("Error retrieving token: ", error.message);
        throw new Error("Failed to retrieve token.");
    }
};

// Removes the authentication token from secure storage
const removeToken = async () => {
    try {
        await SecureStore.deleteItemAsync('authToken');
    } catch (error) {
        console.error("Error removing token: ", error.message);
        throw new Error("Failed to remove token.");
    }
};

export { saveToken, getToken, removeToken };
