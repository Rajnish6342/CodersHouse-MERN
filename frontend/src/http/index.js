import axios from 'axios'

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    'Content-type': 'application/json',
    'Accept': 'application/json',
  }
});

export const sendOtp = (data) => api.post('/send-otp', data);
export const verifyOtp = (data) => api.post('/verify-otp', data);
export const activate = (data) => api.post('/activate', data);

api.interceptors.response.use((config) => { return config }, async (error) => {
  const originalRequest = error.config;
  if (error.response.status === 401 && originalRequest && !originalRequest._isRetry) {
    originalRequest._isRetry = true
    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {
        withCredentials: true
      })
      return api.request(originalRequest)
    } catch (error) {
      console.log(error.message);
    }
  } else {
    throw new Error()
  }
})

export default api