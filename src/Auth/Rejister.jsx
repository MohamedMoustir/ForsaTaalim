import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/js/index';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout.jsX';
import { API_URL, getToken, getUser } from '../utils/config';
import { Sessions } from 'openai/resources/beta/realtime/sessions.mjs';
import Alert from '../components/Alert';

const Rejister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setname] = useState('');
  const [prenom, setprenom] = useState('');
  const [age, setAge] = useState('');
  const [telephone, setTelephone] = useState('');
  const [photo, setphoto] = useState('');
  const [role, setRole] = useState('tuteur');
  const [objectif, setObjectif] = useState('');
  const [ecole, setEcole] = useState('');
  const [niveau, setNiveau] = useState('');
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false);
  const token = getToken();
  const user = getUser();
  const [showAlert, setShowAlert] = useState(false);

  let data;
  const handleRejister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      formData.append("prenom", prenom);
      formData.append("age", age);
      formData.append("telephone", telephone);
      formData.append("photo", photo);
      formData.append("role", role);

      data = new FormData();
      data.append("objectifs", objectif);
      data.append("ecole", ecole);
      data.append("niveau", niveau);

      const response = await axios.post(`${API_URL}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const user = response.data.user.original.user;
      const token = response.data.user.original.token;
      sessionStorage.setItem('user', JSON.stringify(user));
      sessionStorage.setItem('token', token);

      if (role == 'etudiant') {
        const response = await axios.post(`${API_URL}/Etudiant`, data, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        setLoading(false)
      }
      if (role == 'tuteur') {
        navigate('/RejisterPro');
      }else{
        navigate('/login');
      }
      setLoading(false)
      sessionStorage.setItem('alertShown', 'true');
    } catch (err) {

      setLoading(false)
      console.error(err);
    }

  };
  
 

  if (loading && !data) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-400"></div>
      </div>
    );
  }
  return (

    <div className="bg-white">
      <div className="flex min-h-screen">
        <div className="hidden lg:block lg:w-1/2">
          <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="Student studying at desk"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col p-8 bg-gray-50 shadow-lg rounded-lg">
          <MainLayout >
          </MainLayout >

          <div className="flex-grow flex items-center justify-center py-8">
            <div className="w-full max-w-lg">
              <h1 className="text-2xl font-bold mb-8 text-center lg:text-left">Create Your Account</h1>

              <div className="flex text-center gap-8 mb-6">
                <button id="tuteur" onClick={(e) => setRole(e.target.id)} type="button" className="flex items-center justify-center gap-2 bg-white-400 border text-black border-red-400 hover:bg-red-500 px-6 py-2 rounded-md transition">
                  I'm a Tutor
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button id="etudiant" onClick={(e) => setRole(e.target.id)} type="button" className="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-md transition">
                  I'm a Student
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleRejister} encType="multipart/form-data" className="space-y-6">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="flex gap-4">
                    <input
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                      type="text"
                      placeholder="First Name"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                    <input
                      value={prenom}
                      onChange={(e) => setprenom(e.target.value)}
                      type="text"
                      placeholder="Last Name"
                      className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                  />
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      placeholder="Enter Password"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="number"
                      placeholder="Age"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      type="number"
                      placeholder="Enter Phone"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                    <input
                      onChange={(e) => setphoto(e.target.files[0])}
                      type="file"
                      accept="image/*"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                  </div>
                  <div className="w-1/2 hidden">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                    />
                  </div>
                </div>
                {role == 'etudiant' && (
                  <div className="flex gap-4 mb-6">
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">objectifs</label>
                      <input
                        value={objectif}
                        onChange={(e) => setObjectif(e.target.value)}
                        type="text"
                        placeholder="Enter objectifs"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                      <input value={ecole}
                        onChange={(e) => setEcole(e.target.value)}
                        type="text"
                        placeholder="Enter ecole"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                      />
                    </div>
                    <div className="w-1/2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Niveau</label>
                      <select
                        value={niveau}
                        onChange={(e) => setNiveau(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
                      >
                        <option value="primaire">Primaire</option>
                        <option value="lycee">Lycée</option>
                        <option value="universite">Université</option>
                      </select>
                    </div>

                  </div>
                )
                }


                <button type="submit" className="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-md transition">
                  Create Account
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
                    <span className="px-2 bg-white text-gray-500">Sign up with</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );


};

export default Rejister;
