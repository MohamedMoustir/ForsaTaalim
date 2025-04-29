import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../components/MainLayout.jsX';
import Disponibilites from "../Professeur/Disponibilites"
import axios from 'axios';
import { API_URL, getToken, getUser } from '../utils/config';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

function ReservationTutors() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [detile, setDetilesprofiles] = useState([]);
    const token = getToken();
    const user = getUser();
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [type, setType] = useState('');
    const [titles, setTitles] = useState('');
    const [message, setMessage] = useState('');
    
    const fetchProfesseurs = async (tutor_id) => {
        axios.get(`${API_URL}/Professeur/${tutor_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setDetilesprofiles(response.data.Profile);
                console.log('ddd', response.data);
                setLoading(false)
            })
    };
    useEffect(() => {
        fetchProfesseurs(id)
    }, [id])

    return (
        <>
            {loading && <Spinner />}
            {showAlert && (
                <Alert
                    type={type}
                    title={titles}
                    message={message}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <MainLayout>
                <div className="min-h-screen bg-gray-50 py-12">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between mb-8 bg-white rounded-xl shadow-sm p-4">
                            <button
                                className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50"
                                aria-label="Go back"
                            >
                                <svg
                                    className="h-5 w-5"
                                    fill="none"
                                    strokeWidth="2"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                                </svg>
                                <span onClick={() => navigate(-1)} className="hidden sm:inline">Back</span>
                            </button>

                            <div className="text-center">
                                <h1 className="text-xl font-bold text-gray-900 mb-1">Schedule Your First Session</h1>
                                <p className="text-sm text-gray-500">Select a time that works best for you</p>
                            </div>

                            <div className="w-20" />
                        </div>

                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">


                            <div className="p-8">
                                <Disponibilites
                                    title="Tutor Availability"
                                    amount={detile.tarifHoraire ? detile.tarifHoraire : 10}
                                />
                            </div>
                        </div>

                        <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 rounded-full p-2">
                                    <svg
                                        className="h-5 w-5 text-blue-600"
                                        fill="none"
                                        strokeWidth="2"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-blue-900 font-semibold">Need Help?</h3>
                                    <p className="text-blue-800 text-sm">Contact our support team if you have any questions about scheduling.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>
    );

}

export default ReservationTutors;