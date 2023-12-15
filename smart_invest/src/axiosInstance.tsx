import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

interface CSRFResponse {
  csrfToken: string; // CSRF token
}

interface UpdateCSRFTokenResponse extends AxiosResponse<CSRFResponse> {}

export const instance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
});

export const updateCSRFToken = async (): Promise<void> => {

      instance.get('/get-csrf-token/')
      .then((response) => {
        const csrfToken = response.data.csrfToken;
        Cookies.set('csrfToken', csrfToken, { expires: 1, path: '/' });
        console.log('CSRF token updated.');
      })
      .catch((error) => {
        console.error('Error fetching CSRF token:', error);
      });
};

export default instance;
