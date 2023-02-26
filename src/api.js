import axios from 'axios';

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
});

instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Code for refreshing the access token
        console.log('interceptor before try');
        const originalRequest = error.config;
        // console.log(originalRequest);
        if (
            error.response.status === 401 &&
            !originalRequest._retry 
            // && error.response.data.message === 'jwt expired'
        ) {
            originalRequest._retry = true;
            try {
                console.log('interceptor... try');
                // const response = await axios.post(`${process.env.REACT_APP_API_URL}token/refresh`, {},{ withCredentials: true }
                const response = await axios.post(`${process.env.REACT_APP_API_URL}token/refresh`,{}, { withCredentials: true, credentials: 'include' }
                );
                const newAccessToken = response.data.accessToken;
                console.log('interceptor... try...newAccessToken',newAccessToken);
                // sessionStorage.setItem('accessToken', newAccessToken);
                sessionStorage.setItem('accessToken', JSON.stringify(newAccessToken));
                return instance(originalRequest);
            } catch (error) {
                console.error('error.......', error.message);
                // sessionStorage.removeItem('accessToken');
                window.location = '/';
            }
        }
        return Promise.reject(error);
    }
);

export default instance;