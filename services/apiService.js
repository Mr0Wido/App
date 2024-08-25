import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

// Token'ı AsyncStorage'dan almak
const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('authToken');
        if (!token) {
            console.error('Token bulunamadı');
            throw new Error('Token bulunamadı');
        }
        return token;
    } catch (error) {
        console.error("Error retrieving token: ", error.message);
        throw new Error("Failed to retrieve token.");
    }
};

// Token'ı AsyncStorage'a kaydetmek
const saveToken = async (token) => {
    try {
        if (typeof token !== 'string') {
            console.error('Geçersiz token formatı');
            throw new Error('Invalid token format');
        }
        await AsyncStorage.setItem('authToken', token);
    } catch (error) {
        console.error("Error saving token: ", error.message);
        throw new Error("Failed to save token.");
    }
};

// Token'ı yenileme
const refreshToken = async () => {
    try {
        const token = await getToken(); // refreshToken'ı buradan sağlıyoruz
        if (!token) throw new Error('Refresh token bulunamadı');
        const response = await axios.post('http://35.159.165.210:3000/api/refresh-token', { refreshToken: token });
        return response.data.accessToken; // Yeni auth token'ı döndür
    } catch (error) {
        console.error('Token yenilenirken bir hata oluştu: ', error.message);
        throw error;
    }
};

// Axios instance
const api = axios.create({
    baseURL: 'http://35.159.165.210:3000',
    timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(async (config) => {
    try {
        const token = await getToken(); // authToken'ı buradan alıyoruz
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error('Token alınırken bir hata oluştu: ', error.message);
    }
    return config;
});

// Response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { status } = error.response || {};
        if (status === 401) {
            try {
                const newToken = await refreshToken();
                await saveToken(newToken); // Yeni token'ı kaydediyoruz
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return axios.request(error.config);
            } catch (refreshError) {
                console.error('Token yenilenirken bir hata oluştu: ', refreshError.message);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

// Signup fonksiyonu
export const signUp = async (name, surname, email, password, phone_number, company_name, company_address) => {
    try {
        const response = await api.post('/api/signup', { name, surname, email, password, phone_number, company_name, company_address });
        return response.data; // JWT token burada döner
    } catch (error) {
        console.error("Error during sign up:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Kayıt yapılırken bir hata oluştu.');
    }
};
