import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './userForm.scss';
import { instance } from '../../axiosInstance';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

type UserFormData = {
  username: string;
  email: string;
  password1: string;
  password2: string;
};

type UserFormProps = {
  slug: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserForm: React.FC<UserFormProps> = (props) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    username: null,
    email: null,
    password1: null,
    password2: null,
  });

  const [msg, setMsg] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async () => {
     instance.post('/registration/', formData)
     .then((response) => {
        console.log(response);
        //console.log(response.data.message);
        if (response.data && response.data.message) {
    
          setMsg(response.data.message);
          console.log(msg);
        }
          

    },)
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

    if (formData.password1 !== formData.password2) {
      return alert("Passwords don't match!");
    }

    try {
      await mutation.mutateAsync();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData({ ...formData, [field]: e.target.value });

    setErrors({ ...errors, [field]: null });
  };

  return (
    <div className="userForm">
      <div className="modal">
        <span className="close" onClick={() => props.setOpen(false)}>
          x
        </span>
        <h1>{props.slug}</h1>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="item">
            <label>Username</label>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => handleInputChange(e, 'username')}
              required
            />
            {errors.username && <p>{errors.username}</p>}
          </div>

          {/* Email Input */}
          <div className="item">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => handleInputChange(e, 'email')}
              required
            />
            {errors.email && <p>{errors.email}</p>}
          </div>

          {/* Password Input */}
          <div className="item">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={formData.password1}
              onChange={(e) => handleInputChange(e, 'password1')}
              required
            />
            {errors.password1 && <p>{errors.password1}</p>}
          </div>

          {/* Confirm Password Input */}
          <div className="item">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.password2}
              onChange={(e) => handleInputChange(e, 'password2')}
              required
            />
            {errors.password2 && <p>{errors.password2}</p>}
            {msg && <p>{msg}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
