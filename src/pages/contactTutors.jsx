import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from '../components/MainLayout.jsX';
import { API_URL, getToken, getUser } from '../utils/config';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';


const ContactTutors = ({ }) => {

    const token = getToken();
    const user = getUser();
    const { id } = useParams()
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const [profiles, setprofiles] = useState([]);
    const [isUserAuth, setUserAuth] = useState(false);
    const [Detilesprofiles, setDetilesprofiles] = useState(6);
    const [message, setMessage] = useState(`Hello ,
        My name is ... and I am looking for a Mathematics tutor.
        I would like to take lessons at your place or mine.
        Ideally, I would like to start lessons as soon`);
    const [address, setAddress] = useState(Detilesprofiles.location);
    const [phoneNumber, setPhoneNumber] = useState(Detilesprofiles.telephone);
    const [err, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [ishidden, setIshidden] = useState(false);
    const fetchProfesseursById = async () => {
        const response = await axios.get(`${API_URL}/Professeur/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        const profile = response.data.Profile;
        console.log('hada', profile);
        setDetilesprofiles(profile);
        setAddress(profile.location);
        setPhoneNumber(profile.telephone)
        setLoading(false)
    };

    useEffect(() => {
        fetchProfesseursById(id);
    }, [id])

    const handleMessage = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("username", Detilesprofiles.prenom);
            formData.append("message", message);
            formData.append("receiver_id", id);

            const response = await axios.post(`${API_URL}/messages/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            });
            console.log('ddddddddd', response.data.chat_user_id);
            if (response.data.chat_user_id > 0) {
                navigate(`/chat/${id}/room/null`)
            } else {
                setIshidden(true)
            }
            const user = response.data.user;


        } catch (err) {

        }
    }

    return (
        <>
            {loading && <Spinner />}

            <MainLayout>

                <div className="min-h-screen w- flex justify-center items-start  py-10 px-4">
                    {ishidden && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50">
                            <div className="bg-white rounded-lg p-6 shadow-lg w-96 text-center">
                                <h2 className="text-xl font-semibold text-red-600 mb-4">Inscription requise</h2>
                                <p className="text-gray-700 mb-6">Vous devez vous inscrire à un cours avant d’envoyer un message au tuteur.</p>
                                <div className="flex justify-center gap-4">
                                    <button onClick={() => navigate(`/detilesTutor/${id}`)} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                        Voir les cours
                                    </button>
                                    <button onClick={() => setIshidden(false)} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400">
                                        Annuler
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    <form
                        onSubmit={handleMessage}
                        className="w-full max-w-[1300px] p-8 rounded-xl shadow-md"
                    >
                        <div className="flex items-center justify-between mb-8 bg-white rounded-xl shadow-sm p-4">
                            <div
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
                                <span onClick={() => navigate(`/detilesTutor/${id}`)} className="hidden sm:inline">Back</span>
                            </div>

                            <div className="text-center">
                                <h1 className="text-xl font-bold text-gray-900 mb-1">Schedule</h1>
                                <p className="text-sm text-gray-500">Your first class with {Detilesprofiles.prenom}</p>
                            </div>

                            <div className="w-20" />
                        </div>


                        <div className="flex items-center justify-center mb-6">
                            <div className="w-[300px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition">
                                <div className="flex flex-col items-center pt-10 pb-6">
                                    <div className="relative">
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${Detilesprofiles.photo}`}
                                            alt={Detilesprofiles.prenom}
                                            className="w-36 h-36 rounded-xl object-cover border-4 border-red-100"
                                        />
                                        <div className="absolute top-16 -right-6 bg-red-500 text-white text-center rounded-full h-10 w-10 shadow">
                                            <span className="text-[18px] text-center relative top-1 font-bold">{Detilesprofiles.tarifHoraire}</span>
                                            <span className="text-red-500 absolute text-[14px] left-6 -top-4">/h</span>
                                        </div>
                                    </div>
                                    <h3 className="mt-4 font-bold text-lg">{Detilesprofiles.prenom}</h3>
                                    <div className="flex items-center text-sm mt-1">
                                        <div className="flex text-yellow-400">
                                            {[...Array(5)].map((_, i) => <i key={i} className="fas fa-star" />)}
                                        </div>
                                        <span className="ml-2 text-gray-500">
                                            {Number(Detilesprofiles.average_rating).toFixed(0)} ({Detilesprofiles.total_ratings} reviews)
                                        </span>
                                    </div>
                                    <div className="text-xs text-red-400 mt-1">1st lesson is free</div>
                                </div>
                            </div>
                        </div>

                        <div className="text-sm text-gray-600 text-center mb-8 flex items-center justify-center">
                            <span className="bg-green-400 rounded-full w-2 h-2 block mr-2 animate-pulse"></span>
                            Available and responds in 2 hours
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 font-medium mb-2">Your message</label>
                            <textarea
                                className="w-full border border-gray-300 rounded-md p-3 h-32 focus:outline-none focus:ring-2 focus:ring-red-300"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Write your message here..."
                            />
                        </div>

                        <div className="mb-8">
                            <h3 className="text-gray-700 font-medium mb-2">Contact information</h3>
                            <p className="text-sm text-gray-600 mb-3 flex items-center">
                                <i className="fas fa-lock text-gray-400 mr-1" />
                                They are only given to the tutors you select.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>

                                    <label className="block text-gray-600 text-sm mb-1">Address</label>
                                    <div className="relative">

                                        <input
                                            type="text"
                                            className="w-full border border-gray-300 rounded-md py-2 pl-9 pr-3 focus:outline-none focus:ring-2 focus:ring-red-300"
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                        />
                                        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm mb-1">Phone number</label>
                                    <div className="flex">
                                        <div className="flex items-center border border-gray-300 rounded-l-md py-2 px-3 bg-gray-50">
                                            <span className="text-xs mr-1">+1</span>
                                            <img src="https://flagcdn.com/w40/ma.png" alt="Flag" className="w-6 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            className="flex-1 border border-gray-300 border-l-0 rounded-r-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-red-300"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center mb-6">
                            <input type="checkbox" id="save-info" className="rounded text-red-500 focus:ring-red-300 mr-2" />
                            <label htmlFor="save-info" className="text-sm text-gray-600">
                                Save my contact information for future bookings
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md flex items-center justify-center transition-colors"
                        >
                            Complete Reservation
                            <i className="fas fa-arrow-right ml-2"></i>
                        </button>
                    </form>
                </div>
            </MainLayout>
        </>
    );


}

export default ContactTutors;