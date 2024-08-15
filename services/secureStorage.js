import * as SecureStore from 'expo-secure-store';

async function saveToken(token) {
try {
// Token'ı string formatına dönüştürün
await SecureStore.setItemAsync('authToken', JSON.stringify(token));
} catch (error) {
console.error('Error saving token:', error);
}
}


async function getToken() {
    try {
    const tokenString = await SecureStore.getItemAsync('authToken');
    // JSON formatından geri dönüştürün
    return JSON.parse(tokenString);
} catch (error) {
    console.error('Error retrieving token:', error);
}
};



export { saveToken, getToken };