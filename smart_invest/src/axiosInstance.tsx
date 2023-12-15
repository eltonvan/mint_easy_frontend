import axios, { AxiosInstance, AxiosResponse } from 'axios';

interface CSRFResponse {
  csrfToken: string; // Assuming the token is a string
}

interface UpdateCSRFTokenResponse extends AxiosResponse<CSRFResponse> {}

const instance = (): Promise<AxiosInstance> => {
  const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
    withCredentials: true,
  });

  return axiosInstance.get<CSRFResponse>('/get-csrf-token/')
    .then((response: UpdateCSRFTokenResponse) => {
      console.log('CSRF token response:', response); // Check entire response first
      const csrfToken: string = response.data?.csrfToken || '';
      console.log('Extracted CSRF token:', csrfToken);
      
      // Setting CSRF token in headers if available
      if (csrfToken) {
        axiosInstance.defaults.headers.common['X-CSRFToken'] = csrfToken;
      } else {
        console.error('CSRF token not found in response data.');
      }

      return axiosInstance;
    })
    .catch((error: unknown) => {
      if (error instanceof Error) {
        console.error('Error updating CSRF token:', error.message);
      } else {
        console.error('Unknown error occurred while updating CSRF token.');
      }
      return axiosInstance;
    });
};

export default instance;
