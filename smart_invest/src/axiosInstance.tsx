import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface CSRFResponse {
  csrfToken: string; // Assuming the token is a string
 
}

interface UpdateCSRFTokenResponse extends AxiosResponse<CSRFResponse> {}

export const instance: AxiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
});

export const updateCSRFToken = async (): Promise<void> => {
  try {
    const response: UpdateCSRFTokenResponse = await instance.get<CSRFResponse>('/get-csrf-token/');
    const newToken: string = response.data.csrfToken;
    instance.defaults.headers.common['X-CSRFToken'] = newToken;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error updating CSRF token:', error.message);
    } else {
      console.error('Unknown error occurred while updating CSRF token.');
    }
  }
};

export const fetchResponse = async (url:string, payload:any): Promise<void> => {
  return instance.post(url, payload) 
    

};

export default instance;

