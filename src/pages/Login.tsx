import React, { useState } from 'react';

// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleLogin } from 'react-google-login';
import { FaLinkedin ,FaGithub ,FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

import axios from 'axios';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [title, setTitle] = useState('Welcome back');

  const validate = () => {
    const newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = 'Email is required';
    if (showPasswordFields && !password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (showPasswordFields) {
        console.log('Logging in...', { email, password });
      } else {
        setShowPasswordFields(true);
        setTitle('Enter Your Password');
      }
    }
  };

 
  const handleSocialLogin = async (provider: string, token: string) => {
    const data = {
      provider: provider,
      access_provider_token: token,
    };

    try {
      const response = await axios.post('/api/social-login', data);
      console.log('Login Successful:', response.data);
    } catch (error) {
      console.error('Error during social login:', error);
    }
  };
  
  const _responseMessage = (response: any) => {
    console.log(response, "response");
    handleSocialLogin("google", response.credential);
};

const errorMessage = (error: any) => {
    console.log(error);
};

_responseMessage({ credential: "sampleCredential" });
errorMessage("Sample error message");


const handleLogin = () => {
  const clientId = '1017383357529-k3c7c4sfkbogr0896h3gbnf7i8g63h5i.apps.googleusercontent.com';
  const redirectUri = 'http://localhost:5173/callback';
  const scope = 'profile email';
  const responseType = 'token'; 

  const authorizationUrl = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams({
      client_id: clientId,
      redirect_uri: redirectUri,
      response_type: responseType,
      scope: scope,
      prompt: 'consent', 
  })}`;

  window.location.href = authorizationUrl; 
};
const GitHubCallback = () => {
  const clientId = 'Ov23lilM0XtCu2LvNFF8';
  const redirectUri = 'http://localhost:5173/GitHubCallback';
  const scope = 'user:email';
  const responseType = 'token';
  const authorizationUrl = `https://github.com/login/oauth/authorize?${new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: responseType,
    scope: scope,
      prompt: 'consent', 
  })}`;
  window.location.href = authorizationUrl;
};

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-8 rounded shadow-md w-[350px]" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-6 text-center font-bold">{title}</h2>
        {/* Email Input Field */}
        <div className="mb-4 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setIsFocusedEmail(true)}
            onBlur={() => setIsFocusedEmail(!email)}
            className={`mt-1 block w-full p-2 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded`}
            placeholder=" " 
          />
          <label
            className={`absolute left-2 top-2 transition-all duration-200 transform ${isFocusedEmail || email ? 'scale-75 -translate-y-7 text-gray-600' : 'text-gray-400'}`}
          >
            Email Address*
          </label>
          {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
        </div>

        {/* Password Input Field (conditionally rendered) */}
        {showPasswordFields && (
          <div className="mb-4 relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocusedPassword(true)}
              onBlur={() => setIsFocusedPassword(!password)}
              className={`mt-1 block w-full p-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded pr-10`}
              placeholder=" " 
            />
            <label
              className={`absolute left-2 top-2 transition-all duration-200 transform ${isFocusedPassword || password ? 'scale-75 -translate-y-7 text-gray-600' : 'text-gray-400'}`}
            >
              Password*
            </label>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            {/* Eye Icon */}
            {password && (
              <span
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            )}
          </div>
        )}

        <p className="text-green-500 py-2 font-bold">Forgot password?</p>
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Continue
        </button>

        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don't have an account? <a className="text-green-500 font-bold" href="/signup"> Sign up </a>
          </p>
          <div className="flex flex-col items-center mt-2 space-y-2">
           
<button  className="flex items-center border p-2 rounded hover:bg-gray-300 w-full"  onClick={handleLogin} ><FaGoogle  className="mr-2"/> Login with Google</button>
            <button className="flex items-center border p-2 rounded hover:bg-gray-300 w-full">
              <FaLinkedin  className="mr-2" /> Continue with LinkedIn
            </button>
            <button className="flex items-center border p-2 rounded hover:bg-gray-300 w-full" onClick={GitHubCallback}>
              <FaGithub className="mr-2" /> Continue with Github
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
