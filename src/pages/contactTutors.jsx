import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from '../components/MainLayout.jsX';
import { API_URL, getToken, getUser } from '../utils/config';


const ContactTutors = () => {

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
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [err, setError] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const fetchProfesseurs = async (tutor_id) => {
        axios.get(`${API_URL}/Professeur/${tutor_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setDetilesprofiles(response.data.Profile);
                setAddress(response.data.Profile.location)
                setPhoneNumber(response.data.Profile.telephone)
                setLoading(false)
            })
    };
    useEffect(() => {
        fetchProfesseurs(id);
    }, [id])

    const handleMessage = async (e) => {
        setLoading(false)

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

            if (response) {
                setLoading(true)
                navigate(`/chat/${id}/room/null`)
            }
            const user = response.data.user;


        } catch (err) {

        }
    }
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-400"></div>
            </div>
        );
    }
    return (
        <MainLayout>
            <div className="min-h-screen w-[70%] relative left-[15%]">
                <form onSubmit={handleMessage}>
                    <h2 className="text-xl font-bold mb-1">Schedule</h2>
                    <p className="text-gray-600 mb-6">Your first class with Jose</p>

                    <div className="flex items-center justify-center mb-6">
                        <div className="w-[50%] bg-white h-[50%] rounded-2xl">
                            <div className="flex items-center justify-center pt-16">
                                <div className="relative">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${Detilesprofiles.photo}`} alt={Detilesprofiles.prenom}

                                        className="w-40 h-40 rounded-2xl object-cover border-2 border-red-100"
                                    />
                                    <div className="absolute top-16 -right-6 bg-red-400 text-white text-center rounded-full h-10 w-10">
                                        <span className="text-center relative top-[10%] text-[20px]">{Detilesprofiles.tarifHoraire}$</span>
                                        <span className="text-center text-red-400 relative -top-[130%] left-[60%] text-[20px]">/h</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-center mb-6">
                                <h3 className="font-bold">{Detilesprofiles.prenom}</h3>
                                <div className="flex items-center text-sm p-2">
                                    <div className="flex text-yellow-400">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                    <span className="ml-1">{Detilesprofiles.total_ratings} ({Detilesprofiles.total_ratings} reviews)</span>
                                </div>
                                <div className="text-xs text-red-400">1st lesson is free</div>
                            </div>
                        </div>
                    </div>

                    <div className="text-sm text-gray-600 text-center mb-8 flex items-center justify-center">
                        <span className="bg-green-100 rounded-full w-2 h-2 block mr-2"></span>
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

                    {/* <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">What course format do you want?</label>
                    <div className="flex space-x-4">
                        <button className="flex-1 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-300 bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center">
                            <i className="fas fa-user mr-2 text-gray-500"></i>
                            Face to Face
                        </button>
                        <button className="flex-1 border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-300 hover:bg-gray-100 transition-colors flex items-center justify-center">
                            <i className="fas fa-video mr-2 text-gray-500"></i>
                            By webcam
                        </button>
                    </div>
                </div> */}

                    <div className="mb-8">
                        <h3 className="text-gray-700 font-medium mb-2">Contact information</h3>
                        <p className="text-sm text-gray-600 mb-3 flex items-center">
                            <i className="fas fa-lock text-gray-400 mr-1"></i>
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
                                        <i className="fas fa-map-marker-alt"></i>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-600 text-sm mb-1">Phone number</label>
                                <div className="flex">
                                    <div className="flex items-center border border-gray-300 rounded-l-md py-2 px-3 bg-gray-50">
                                        <span className="text-xs mr-1">+1</span>
                                        <img src="/api/placeholder/24/16" alt="Flag" className="w-6 h-4" />
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
                        <label htmlFor="save-info" className="text-sm text-gray-600">Save my contact information for future bookings</label>
                    </div>

                    <button
                        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 rounded-md flex items-center justify-center transition-colors"
                    >
                        Complte Reservation
                        <i className="fas fa-arrow-right ml-2"></i>
                    </button>
                </form>
            </div>
        </MainLayout >
    );

}

export default ContactTutors;