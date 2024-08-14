import axios from 'axios';
import SecureStorage from 'react-native-secure-storage';

const refreshToken = async () => {
    try {
        const token = await SecureStorage.getItem('refreshToken');
        const response = await axios.post('http://35.159.165.210:3000/api/refreshToken', { refreshToken: token });
        await SecureStorage.setItem('authToken', response.data.token);
        return response.data.token;
    } catch (error) {
        console.error('Token yenilenirken bir hata oluştu: ', error);
    }
};

// API URL'nizi buraya 
const api = axios.create({
    baseURL: 'http://35.159.165.210:3000',
    timeout: 10000,
});

api.interceptors.request.use(async (config) => {
    try {
        let token = await SecureStorage.getItem('authToken');
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
        const {status} = error.response;
        if (status === 401) {
            const newToken = await refreshToken();
            error.config.headers.Authorization = `Bearer ${newToken}`;
            return api.request(error.config);
        }
        return Promise.reject(error);
    }
);


// Kullanıcı kaydı fonksiyonu
export const signUp = async (email, password_hash, name, surname, phone_number, address, business_name) => {
    try {
    const response = await api.post('/api/signup', { email, password_hash, name, surname, phone_number, address, business_name });
    return response.data; // JWT token burada döner
    } catch (error) {
    throw new Error(error.response?.data || 'Kayıt yapılırken bir hata oluştu.');
    }
};



export default api;