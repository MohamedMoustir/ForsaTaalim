import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../utils/config';

const ResetPassword = () => {
    const { token } = useParams();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [current_password, setcurrent_password] = useState('');
    const [message, setMessage] = useState('');
    const Navigate = useNavigate()
    const handleReset = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${API_URL}/auth/reset-password`, {
                token,
                email,
                password,
                current_password,
            });
            setMessage("Your password has been successfully reset!");
        } catch (error) {
            setMessage("An error occurred while resetting the password.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-center mb-6">
                <div className="bg-red-400 text-white p-3 rounded-lg">
                    <span className="text-xl font-bold">S</span>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6 text-center">Reset Password</h2>

            {message && (
                <div className={`mb-4 text-center ${message.includes('match') ? 'text-red-600' : 'text-green-600'}`}>
                    {message}
                </div>
            )}

            <form onSubmit={handleReset} className="space-y-4">
                <div>
                    <label className="block mb-2 text-sm text-gray-600">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-600">Password</label>
                    <input
                        type="password"
                        value={current_password}
                        onChange={(e) => setcurrent_password(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-600">New Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border border-gray-300 px-3 py-2 rounded-lg"
                        required
                    />
                </div>



                <button
                    type="submit"
                    className="w-full bg-red-400 text-white py-3 rounded-lg hover:bg-red-500 transition duration-200"
                >
                    Reset Password
                </button>
            </form>

            <div className="mt-6 text-center text-gray-500">
                <span>Remember your password? </span>
                <a onClick={() => Navigate('/login')} className="cursor-pointer text-black font-medium">Log in</a>
            </div>
        </div>
    );

};

export default ResetPassword;
