import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './loginForm.scss';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { instance } from '../../axiosInstance';


type LoginFormData = {
  username: string;
  password: string;
};

type LoginFormProps = {
  slug: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleLogin: (username: string) => void;
};

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<LoginFormData>({
    username: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setErrors] = useState<string | null>(null);

  useEffect(() => {
    // Fetch CSRF token and set it in cookies
    axiosInstance.get('/csrf/')
      .then((response) => {
        const csrfToken = response.data.csrfToken;
        Cookies.set('csrfToken', csrfToken, { expires: 1, path: '/' });
      })
      .catch((error) => {
        console.error('Error fetching CSRF token:', error);
      });
  }, []);

  const mutation = useMutation({
    mutationFn: () => {
      return instance.post('/dj-rest-auth/login_the_right/', formData)
        .then((response) => {
          console.log(response);
          const responseData = response.data;
          console.log("test");
          if (responseData.key) {
            Cookies.set('authToken', responseData.key, { expires: 1, path: '/' });
            props.handleLogin(formData.username);
            navigate('/dashboard');
          }
          return response;
        })
        .catch((error) => {
          console.log(error);
          
            setErrors(error.response.data);

        });
    },
    onSuccess: () => {
      queryClient.invalidateQueries([`all${props.slug}s`]);
    },
  });
  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await mutation.mutateAsync();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const setFormOpen = (open: boolean) => {
    props.setOpen(open);
  };


  return (


    <div className="loginForm">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          x
        </span>
        <h1>{props.slug}</h1>
        <form onSubmit={handleSubmit}>
          <div className="item">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleInputChange(e, 'username')}
              required
            />
          </div>

          <div className="item">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange(e, 'password')}
              required
            />
            
          </div>
            {/* <div className="item">
                <label>Email</label>
                <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleInputChange(e, 'email')}
                required
                />
            </div> */}
 
          <button type="submit">Send</button>
          {error && <p>{error.non_field_errors}</p>}
          {error && <p>{error.detail}</p>}

          
        </form>
      </div>
    </div>
  );
};

export default LoginForm;