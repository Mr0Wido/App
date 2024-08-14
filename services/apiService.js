import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

// Token'ı Secure Store'dan almak
const getToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('authToken');
        return token;
    } catch (error) {
        console.error("Error retrieving token: ", error);
        throw new Error("Failed to retrieve token.");
    }
};

// Token'ı Secure Store'a kaydetmek
const saveToken = async (token) => {
    try {
        await SecureStore.setItemAsync('authToken', token);
    } catch (error) {
        console.error("Error saving token: ", error);
        throw new Error("Failed to save token.");
    }
};

const refreshToken = async () => {
    try {
        const token = await getToken(); // refreshToken'ı buradan sağlıyoruz
        if (!token) throw new Error('Refresh token bulunamadı');
        const response = await axios.post('http://35.159.165.210:3000/api/refreshToken', { refreshToken: token });
        return response.data.token; // Yeni auth token'ı döndür
    } catch (error) {
        console.error('Token yenilenirken bir hata oluştu: ', error);
        throw error;
    }
};

const api = axios.create({
    baseURL: 'http://35.159.165.210:3000',
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await getToken(); // authToken'ı buradan alıyoruz
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error('Token alınırken bir hata oluştu: ', error);
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { status } = error.response || {};
        if (status === 401) {
            const newToken = await refreshToken();
            await saveToken(newToken); // Yeni token'ı kaydediyoruz
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return axios.request(error.config);
        }
        return Promise.reject(error);
    }
);

export const signUp = async (email, password_hash, name, surname, phone_number, company_name, company_address) => {
    try {
        const response = await api.post('/api/signup', { email, password_hash, name, surname, phone_number, company_name, company_address });
        return response.data; // JWT token burada döner
    } catch (error) {
        throw new Error(error.response?.data || 'Kayıt yapılırken bir hata oluştu.');
    }
};

export default api;
