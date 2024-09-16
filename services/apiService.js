import axios from 'axios';
import { getToken, saveToken, removeToken } from './secureStorage'; // secureStore.js'e güncellendi

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
            // Refresh token işlemi (Eğer refreshToken işlevi varsa kullanabilirsiniz)
            try {
                const newToken = await refreshToken(); // Eğer refresh token kullanıyorsanız
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

// Signin fonksiyonu
export const signIn = async (email, password) => {
    try {
        const response = await api.post('/api/signin', { email, password });
        await saveToken(response.data.token); // Token'ı burada kaydediyoruz
        return response.data;
    } catch (error) {
        console.error("Error during sign in:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Giriş yapılırken bir hata oluştu.');
    }
};

// Signup fonksiyonu
export const signUp = async (name, surname, email, password, phone_number, company_name, company_address) => {
    try {
        const response = await api.post('/api/signup', { name, surname, email, password, phone_number, company_name, company_address });
        await saveToken(response.data.token); // Token'ı burada kaydediyoruz
        return response.data;
    } catch (error) {
        console.error("Error during sign up:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Kayıt yapılırken bir hata oluştu.');
    }
};

// Profil bilgilerini getirme
export const getProfile = async () => {
    const token = await getToken(); // Token'ı burada alıyoruz
    try {
        const response = await api.get('/api/profile', {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error during profile fetch:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Profil bilgileri getirilirken bir hata oluştu.');
    }
};

// Profil bilgilerini güncelleme
export const updateProfile = async (profileData) => {
    const token = await getToken();
    if (!token) throw new Error('Token bulunamadı');
    try {
        const response = await api.put('/api/profile', profileData, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error during profile update:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Profil bilgileri güncellenirken bir hata oluştu.');
    }
};

// Logout fonksiyonu// Logout fonksiyonu
export const logout = async () => {
    try {
        const response = await api.post('/api/logout');
        return response.data;
    }
    catch (error) {
        console.error("Error during logout:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Çıkış yapılırken bir hata oluştu.');
    }
};