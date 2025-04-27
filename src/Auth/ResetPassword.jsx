import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../utils/config';
import { Nav } from '../components/Nav';
import MainLayout from '../components/MainLayout.jsX';
import Alert from '../components/Alert';

const ResetPassword = () => {
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [current_password, setcurrent_password] = useState('');
    const [message, setMessage] = useState('');
    const Navigate = useNavigate()
    const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState('');
  const [titles, setTitles] = useState('');
    const handleReset = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/auth/reset-password`, {
                token,
                email,
                password,
                current_password,
            });
            setEmail('');
            setPassword('');
            setcurrent_password('')
            const [type, setType] = useState('');
            const [titles, setTitles] = useState('');
            const [message, setMessage] = useState('');
            setShowAlert(true);
            setTitles('rest password avec succès!');
            setType('success');
            setMessage('Your password has been successfully reset!.');
        } catch (error) {
            setShowAlert(true);
            setTitles('Erreur lors de rest password!');
            setType('error');
            setMessage('An error occurred while resetting the password..');
        }
    };




    return (
        <>
            {showAlert && (
                <Alert
                    type={type}
                    title={titles}
                    message={message}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <div className="bg-white">

                <div className="flex min-h-screen">

                    <div className="w-full lg:w-1/2 flex flex-col p-8">
                        <div>
                        </div>


                        <MainLayout id_={1} >
                        </MainLayout >
                        <div className="flex-grow flex items-center justify-center">
                            <div className="w-full max-w-md">
                                <h1 className="text-2xl font-bold mb-8 text-center lg:text-left"> Réinitialiser le mot de passe</h1>

                                <form onSubmit={handleReset}>
                                    <div className="mb-4">
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" placeholder="Username or Email ID" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                        <input value={current_password} onChange={(e) => setcurrent_password(e.target.value)} type="password" id="password" placeholder="Enter  Password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                                    </div>
                                    <div className="mb-6">
                                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="Enter New Password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400" />
                                    </div>
                                    <button className="flex items-center justify-center gap-2 bg-red-400 hover:bg-red-500 text-white px-6 py-2 rounded-md transition">
                                        Réinitialiser
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </form>

                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:block lg:w-1/2">
                        <img src="https://img.freepik.com/photos-gratuite/appareil-protege-par-cybersecurite_23-2149270838.jpg?t=st=1745606126~exp=1745609726~hmac=c03dcd8b9b834d976d2d9226b540ad9de0f0557f07b49542ecd371232bebedfa&w=1380"
                            alt="Students studying"
                            className="h-full w-full object-cover" />
                    </div>
                </div>

            </div>
        </>
    );
}
export default ResetPassword;