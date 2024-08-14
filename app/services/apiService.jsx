import axios from 'axios';

// API URL'nizi buraya yazın
const API_URL = 'http://35.159.165.210:3000'; 

// Axios örneğini oluşturun
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

// Kullanıcı kaydı fonksiyonu
export const signUp = async (email, password_hash, name, surname, phone_number, address, business_name) => {
    try {
    const response = await api.post('/api/signup', { email, password_hash, name, surname, phone_number, address, business_name });
    return response.data; // JWT token burada döner
    } catch (error) {
    throw new Error(error.response?.data || 'Kayıt yapılırken bir hata oluştu.');
    }
};
