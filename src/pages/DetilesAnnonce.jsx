import React, { useState, useEffect } from 'react';
import {
    faCalendarAlt,
    faMapMarkerAlt,
    faChalkboardTeacher,
    faBookOpen,
    faUsers,
    faSignInAlt,
    faClock,
    faTicketAlt,
    faShareAlt,
    faHeart,
    faBookmark
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import Nav from '../components/Nav';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL, getToken, getUser } from '../utils/config';
const token = getToken();
const user = getUser();

const DetilesAnnonce = () => {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [annonces, setAnnonce] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        axios.get(`${API_URL}/detile/announcment/${id}`, {
            headers: {
                authorization: `bearer ${token}`,
            }
        })
            .then(response => {
                setLoading(false)
                console.log(response.data.announcement);
                setAnnonce(response.data.announcement);
             
            })
            .catch(error => {
                console.error("There was an error fetching the announcements:", error);
            });
    }, []);

    const handleRegister = (id_touter) => {
        
       
          navigate(`/reservation/${id_touter}`);  
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-400"></div>
            </div>
        );
    }
    return (
        <>
            <Nav></Nav>
            <div className="max-w-[85%] mt-14 mx-auto  bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="relative h-80">
                    <img
                        src={`http://127.0.0.1:8000/storage/${annonces.image}`}
                        alt={annonces.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                        <div className="p-6 text-white">
                            <h1 className="text-3xl font-bold mb-2">{annonces.title}</h1>
                            <div className="flex items-center gap-4 text-sm">
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-red-400" />
                                    {annonces.date}
                                </span>
                                <span className="flex items-center">
                                    <FontAwesomeIcon icon={faClock} className="mr-2 text-red-400" />
                                    {annonces.time}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                        <button
                            className="bg-white/90 hover:bg-white p-2 rounded-full text-gray-700 hover:text-red-500 transition-colors"
                            onClick={() => setIsLiked(!isLiked)}
                        >
                            <FontAwesomeIcon icon={faHeart} className={isLiked ? "text-red-500" : ""} />
                        </button>
                        <button
                            className="bg-white/90 hover:bg-white p-2 rounded-full text-gray-700 hover:text-blue-500 transition-colors"
                            onClick={() => setIsSaved(!isSaved)}
                        >
                            <FontAwesomeIcon icon={faBookmark} className={isSaved ? "text-blue-500" : ""} />
                        </button>
                        <button className="bg-white/90 hover:bg-white p-2 rounded-full text-gray-700 hover:text-green-500 transition-colors">
                            <FontAwesomeIcon icon={faShareAlt} />
                        </button>
                    </div>
                </div>

                <div className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2">
                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">About This Event</h2>
                                <p className="text-gray-600">{annonces.description}</p>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Speaker</h2>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                        <FontAwesomeIcon icon={faChalkboardTeacher} size="lg" />
                                    </div>
                                    <div>
                                        <p className="font-medium">{annonces.prenom}</p>
                                        <p className="text-sm text-gray-500">{annonces.categorie_matieres}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Subject Areas</h2>
                                <div className="flex flex-wrap gap-2">
                                    {/* {subjectArray.map((subject, index) => ( */}
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        {annonces.subjects}
                                    </span>
                                    {/* ))} */}
                                </div>
                            </div>

                            <div className="mb-6">
                                <h2 className="text-lg font-semibold text-gray-700 mb-2">Educational Levels</h2>
                                <div className="flex flex-wrap gap-2">

                                    <span className="border border-red-300 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        {annonces.levels}
                                    </span>

                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-1">
                            <div className="bg-gray-50 rounded-xl p-6 shadow-md border border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-800 mb-4">Event Details</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-start">
                                        <FontAwesomeIcon icon={faCalendarAlt} className="mr-3 text-red-500 mt-1" />
                                        <div>
                                            <p className="font-medium">Date & Time</p>
                                            <p className="text-sm text-gray-600">{annonces.date}</p>
                                            <p className="text-sm text-gray-600">{annonces.time}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-red-500 mt-1" />
                                        <div>
                                            <p className="font-medium">Location</p>
                                            <p className="text-sm text-gray-600">{annonces.location}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FontAwesomeIcon icon={faTicketAlt} className="mr-3 text-red-500 mt-1" />
                                        <div>
                                            <p className="font-medium">Registration Fee</p>
                                            <p className="text-sm text-gray-600">{annonces.tarifHoraire}  1H</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <FontAwesomeIcon icon={faUsers} className="mr-3 text-red-500 mt-1" />
                                        <div>
                                            <p className="font-medium">Available Seats</p>
                                            <p className="text-sm text-gray-600">{annonces.availableSeats} remaining</p>
                                        </div>
                                    </div>
                                </div>

                                <button onClick={()=>handleRegister(annonces.user_id)}
                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faSignInAlt} />
                                    Register Now
                                </button>

                                <p className="text-xs text-center text-gray-500 mt-3">
                                    Registration closes 24 hours before the event
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    );

}
export default DetilesAnnonce;