import * as SecureStore from 'expo-secure-store';

// Token'ı kaydetme fonksiyonu
export const saveToken = async (token) => {
  try {
    await SecureStore.setItemAsync('userToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Token'ı alma fonksiyonu
export const getToken = async () => {
    try {
    return await SecureStore.getItemAsync('userToken');
    } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
    }
    };

    // Token'ı silme fonksiyonu
    export const removeToken = async () => {
    try {
    await SecureStore.deleteItemAsync('userToken');
    } catch (error) {
    console.error('Error removing token:', error);
    }
};
