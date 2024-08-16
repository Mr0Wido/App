import * as SecureStore from 'expo-secure-store';

async function saveToken(token) {
    try {
    // Eğer token bir obje ise JSON.stringify() ile string'e dönüştürün
    const tokenString = typeof token === 'string' ? token : JSON.stringify(token);
    await SecureStore.setItemAsync('authToken', tokenString);
    } catch (error) {
    console.error('Error saving token:', error);
    }
    }

    async function getToken() {
    try {
    const tokenString = await SecureStore.getItemAsync('authToken');
    // Eğer token bir obje olarak kaydedildiyse JSON.parse() ile tekrar obje haline getirin
    return tokenString ? JSON.parse(tokenString) : null;
    } catch (error) {
    console.error('Error retrieving token:', error);
    }
    }

export { saveToken, getToken };
