import React, { useState } from 'react';
import axios from 'axios';
import '../assets/js/index';

const API_URL = 'http://127.0.0.1:8000/api';

const Rejister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [name, setname] = useState('');
  const [prenom, setprenom] = useState('');
  const [age, setAge] = useState('');
  const [telephone, setTelephone] = useState('');
  const [photo, setphoto] = useState('');
  const [role, setRole] = useState('');


  const handleRejister = async (e) => {
    e.preventDefault();
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
      const response = await axios.post(`${API_URL}/auth/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (err) {
      setError('erorr login');
      console.error(err);
    }

  };
  
  

  return (
    <div className="bg-white">
      <div className="flex min-h-screen">
        <div className="hidden lg:block lg:w-1/2">
          <img src="https://photos.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
            alt="Student studying at desk"
            className="h-full w-full object-cover" />
        </div>

        <div className="w-full lg:w-1/2 flex flex-col p-8">
          <header className="flex justify-between items-center">
            <div className="text-xl font-bold text-red-400">ForsaTaalim</div>
            <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto">

              <div className="flex gap-4 items-center">
                <a href="#" className="text-gray-600 rounded-full bg-slate-50 px-2 py-2  hover:text-gray-800">?</a>
                <a href="#" className="bg-white px-4 py-2 rounded-full hover:bg-gray-50">Become a Tutor</a>
                <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 ">Log In</a>
              </div>
            </nav>
          </header>

          <div className="flex-grow flex items-center justify-center py-8">
            <div className="w-full max-w-lg">
              <h1 className="text-2xl font-bold mb-8 text-center lg:text-left">Create Your Account</h1>
              <div className="flex text-center gap-[90px] ml-16 mb-6">
                <button id='tuteur' onClick={(e) => setRole(e.target.id)} type="submit" className="flex items-center justify-center gap-2 bg-white-400 border text-black border-red-400  hover:bg-red-500  px-6 py-2 rounded-md transition">
                  I m tuteur
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button id='etudiant' onClick={(e) => setRole(e.target.id)} type="submit" className="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-md transition">
                  I m etudiant
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleRejister} encType="multipart/form-data">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="flex gap-4">
                    <input value={name} onChange={(e) => setname(e.target.value)} type="text" placeholder="First Name" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                    <input value={prenom} onChange={(e) => setprenom(e.target.value)} type="text" placeholder="Last Name" className="w-1/2 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email " className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter Password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="Age" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                  </div>
                </div>
                <div className="flex gap-4 mb-6">
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">telephone</label>
                    <input value={telephone} onChange={(e) => setTelephone(e.target.value)} type="number" placeholder="Enter telephone" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">photo</label>
                    <input onChange={(e) => setphoto(e.target.files[0])} type="file" accept="image/*" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">role</label>
                    <input value={role} onChange={(e) => setRole(e.target.value)} type="text" name="" id="" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                  </div>
                </div>
          
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
