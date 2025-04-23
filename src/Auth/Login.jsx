import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from '../components/MainLayout.jsX';
import { API_URL, getToken, getUser } from '../utils/config';
import Alert from '../components/Alert';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: email,
        password: password
      });
      const token = response.data.token;
      const user = response.data.user;
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      setEmail('');
      setPassword('');

      if (user) {
        if (user.role === 'etudiant') {
          navigate('/');
        } else if (user.role === 'tuteur') {
          navigate('/dashboard-tuteur');
        } else if (user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/login');
        }
        sessionStorage.setItem('alertShown', 'true');
      }

    } catch (err) {
      setShowAlert(true)
      setError('erorr login');
      console.error(err);
    }

  };
  const google = (e) => {
    window.location.href = "http://127.0.0.1:8000/login/google";
  };
  useEffect(() => {
    const alertState = sessionStorage.getItem('alertShown');
    if (alertState) {
      setShowAlert(true);
    }
    setTimeout(() => {
      sessionStorage.removeItem('alertShown')
      setShowAlert(false);
    }, 3000)
    if (!showAlert) {
      sessionStorage.removeItem('alertShown')
    }
  }, [showAlert]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const user = queryParams.get("user");

    if (token && user) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', user);

    }
    const users = JSON.parse(sessionStorage.getItem('user'));
    if (users) {
      if (users.role === 'etudiant') {
        navigate('/');
      } else if (users.role === 'tuteur') {
        navigate('/dashboard-tuteur');
      } else if (users.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/login');
      }
      sessionStorage.setItem('alertShown', 'true');
    }
  }, [])



  return (
    <>
      {showAlert && (
        <Alert
          type="error"
          title="Login Failed"
          message="Email or password is incorrect."
          onClose={() => setShowAlert(false)}
        />
      )}
      <div className="bg-white">

        <div className="flex min-h-screen">

          <div className="w-full lg:w-1/2 flex flex-col p-8">
            <div>
            </div>


            <MainLayout >
            </MainLayout >
            <div className="flex-grow flex items-center justify-center">
              <div className="w-full max-w-md">
                <h1 className="text-2xl font-bold mb-8 text-center lg:text-left">Sign in to your account</h1>

                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Username or Email ID" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Enter Password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                  </div>

                  <button type="submit" className="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-md transition">
                    Sign In
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>

                <div className="mt-8">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-gray-500">Sign in with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <a href="#" className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      <span className="ml-2 text-sm">Facebook</span>
                    </a>

                    <button onClick={google} className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24">
                        <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" fill="#EA4335 #4285F4 #FBBC05 #34A853" />
                      </svg>
                      <span className="ml-2 text-sm">Google</span>
                    </button>

                    <a href="#" className="flex items-center justify-center py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 23 23">
                        <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                        <path fill="#f35325" d="M1 1h10v10H1z" />
                        <path fill="#81bc06" d="M12 1h10v10H12z" />
                        <path fill="#05a6f0" d="M1 12h10v10H1z" />
                        <path fill="#ffba08" d="M12 12h10v10H12z" />
                      </svg>
                      <span className="ml-2 text-sm">Microsoft</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/2">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
              alt="Students studying"
              className="h-full w-full object-cover" />
          </div>
        </div>

      </div>
    </>
  );

};




export default Login;
