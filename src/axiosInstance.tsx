import axios, { AxiosInstance } from 'axios';
import Cookies from 'js-cookie';

/*
defining an axios instance to handel all the requests to the backend
fetching the CSRF token from the backend and storing it in a cookie
attaching a CSRF token to all the requests
*/

// interface CSRFResponse { // Defines the structure of the response expected when fetching the CSRF token
//   csrfToken: string; // string data type
// }

// interface UpdateCSRFTokenResponse extends AxiosResponse<CSRFResponse> {}

export const instance: AxiosInstance = axios.create({ 
  baseURL: 'https://backend.mint-easy.de', // Base URL of the backend
  xsrfCookieName: 'csrftoken', // The name of the cookie containing the CSRF token
  xsrfHeaderName: 'authToken', // The name of the header containing the CSRF token
  withCredentials: true, // Whether to send cookies with the request

});

export const updateCSRFToken = async (): Promise<void> => {

      instance.get('/get-csrf-token/') // Fetches the CSRF token from the backend
      .then((response) => {
        const csrfToken = response.data.csrfToken; // Extracts the CSRF token from the response
        Cookies.set('csrfToken', csrfToken, { expires: 1, path: '/' }); // Sets the CSRF token in a cookie
      })
      .catch((error) => {
        console.error('Error fetching CSRF token:', error);
      });
};

export default instance;
