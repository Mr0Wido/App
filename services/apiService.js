import axios from 'axios';
import * as SecureStorage from 'react-native-secure-storage';

const refreshToken = async () => {
    try {
        const token = await SecureStorage.getItem('refreshToken');
        if (!token) throw new Error('Refresh token bulunamadı');
        const response = await axios.post('http://35.159.165.210:3000/api/refreshToken', { refreshToken: token });
        await SecureStorage.setItem('authToken', response.data.token);
        return response.data.token; // accessToken yerine authToken döndürülüyor
    } catch (error) {
        console.error('Token yenilenirken bir hata oluştu: ', error);
        throw error; // Hata ile ilgili bilgi verilmelidir
    }
};

const api = axios.create({
    baseURL: 'http://35.159.165.210:3000',
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    try {
        const token = await SecureStorage.getItem('authToken');
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
        const { status } = error.response;
        if (status === 401) {
            const newToken = await refreshToken();
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
