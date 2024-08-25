import AsyncStorage from '@react-native-async-storage/async-storage';

// Token'ı saklama
export async function saveToken(token) {
    try {
        // Token'ı stringe çeviriyoruz
        const tokenString = JSON.stringify(token);

        // Token'ı AsyncStorage'e kaydediyoruz
        await AsyncStorage.setItem('authToken', tokenString);
    } catch (error) {
        console.error('Error saving token:', error.message);
    }
}

// Token'ı alma
export async function getToken() {
    try {
        const tokenString = await AsyncStorage.getItem('authToken');
        return tokenString ? JSON.parse(tokenString) : null;
    } catch (error) {
        console.error('Error retrieving token:', error.message);
    }
}

// Token'ı silme
export async function removeToken() {
    try {
        await AsyncStorage.removeItem('authToken');
    } catch (error) {
        console.error('Error removing token:', error.message);
    }
}
