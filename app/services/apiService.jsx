import axios from 'axios';

// API URL'nizi buraya yazın
const API_URL = 'http://35.159.165.210:3000'; 

// Axios örneğini oluşturun
const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    });

    // API isteği yapmak için fonksiyonlar
    export const fetchData = async () => {
    try {
    const response = await api.get('/api/data'); // Endpoints burada tanımlanır
    return response.data;
    } catch (error) {
    console.error('API isteğinde hata:', error);
    throw error;
    }
};

// Diğer API fonksiyonlarını buraya ekleyebilirsiniz
