import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            !originalRequest._retry 
        ) {
            originalRequest._retry = true;
            try {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_URL}token/refresh`,
                    {}, 
                    { withCredentials: true, credentials: 'include' }
                );
                const newAccessToken = response.data.accessToken;
                sessionStorage.setItem('accessToken', JSON.stringify(newAccessToken));
                window.location.reload(); 
            } catch (error) {
                window.location = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default instance;