import * as SecureStore from 'expo-secure-store';

async function saveToken(token) {
try {
// Token'ı doğrudan string formatında saklayın
await SecureStore.setItemAsync('authToken', token);
} catch (error) {
console.error('Error saving token:', error);
}
}

async function getToken() {
try {
// Token'ı string olarak alın
return await SecureStore.getItemAsync('authToken');
} catch (error) {
console.error('Error retrieving token:', error);
}
}

export { saveToken, getToken };
