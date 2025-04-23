
import React, { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout.jsX';
import gift from '../../../forsaTaalim/resources/image/gift.png';
import { useNavigate } from 'react-router-dom';
import { API_URL, getToken, getUser } from '../utils/config';
import Spinner from '../components/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Alert from '../components/Alert';

export default function Myfavorites() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [favorite, setFavorite] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = getToken();
    const user = getUser();
    const [showAlert, setShowAlert] = useState(false);
    const [type, setType] = useState('');
    const [titles, setTitles] = useState('');
    const [message, setMessage] = useState('');

    const fetchFavorites = () => {
        
        fetch(`${API_URL}/favorites`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {

                setFavorites(data);
                console.log('ccc', data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des favoris:', error);
            });
    }

    useEffect(() => {
        fetchFavorites()
    }, [])
    function handlegetUser(userId) {

        fetch(`${API_URL}/favorites/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(() => {
                setShowAlert(true)
                setFavorites(prevFavorites => prevFavorites.filter(item => item.user_id2 !== userId));
                setTitles('Catd Delete avec succès !')
                setType('success')
                setMessage('Votre Card a Delete avec succès.')
            });
    }

    return (
        <>
            {loading && (
                <Spinner />
            )}

            <MainLayout >
                {showAlert && (
                    <Alert
                        type= {type}
                        title={titles}
                        message={message}
                        onClose={() => setShowAlert(false)}
                    />
                )}
                <section className="bg-gradient-to-b from-gray-50 to-white py-16">
                    <div className="max-w-7xl mx-auto px-6">
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
                                <span onClick={()=>navigate('/tutors')} className="hidden sm:inline">Back</span>
                            </button>

                            <div className="text-center">
                                <h1 className="text-xl font-bold text-gray-900 mb-1">My Favorites</h1>
                                <p className="text-sm text-gray-500">Discover your bookmarked professionals</p>
                            </div>

                            <div className="w-20" />
                        </div>
                      

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {favorites && favorites.length > 0 ? (

                                favorites.map((item, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-transparent hover:border-red-200 transform hover:-translate-y-1 transition-all duration-300 ease-in-out"
                                    >
                                        <div className="relative h-56 bg-gray-100">
                                            <img
                                                key={item.profe_id}
                                                src={`http://127.0.0.1:8000/storage/${item.user_photo}`}
                                                alt={item.prenom}
                                                className="w-full h-full object-cover cursor-pointer transition-transform duration-300 "
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

                                            <FontAwesomeIcon icon={faTrash}
                                                onClick={() => handlegetUser(item.user_id)}
                                                className={`absolute top-3 right-3 p-2.5 hover:bg-red-100 cursor-pointer rounded-full ${item.isFavorite
                                                    ? 'bg-red-50 hover:bg-red-100'
                                                    : 'bg-white/90 hover:bg-white backdrop-blur-sm'
                                                    } shadow-md transform hover:scale-110 transition-all duration-200`}
                                                aria-label={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                            />

                                        </div>

                                        <div className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center">
                                                    <div className="flex items-center bg-yellow-50 px-2.5 py-1 rounded-full">
                                                        <span className="text-yellow-500 text-sm font-semibold">★</span>
                                                        <span className="ml-1 text-sm font-semibold text-gray-900">{Number(item.average_rating).toFixed(0)}</span>
                                                    </div>
                                                    <span className="text-gray-500 text-sm ml-2">
                                                        ({item.total_ratings} reviews)
                                                    </span>
                                                </div>
                                                <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                                                    Ambassador
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="flex items-center justify-center bg-red-50 border border-red-200 w-24 h-10 rounded-xl">
                                                    <span className="font-bold text-red-600 text-lg">
                                                        {item.tarifHoraire}$
                                                    </span>
                                                </div>
                                                <div className="flex items-center justify-center">
                                                    <img
                                                        className="h-10 w-24 object-contain"
                                                        src={gift}
                                                        alt="Product icon"
                                                    />
                                                </div>
                                            </div>

                                            <button onClick={() => navigate(`/detilesTutor/${item.user_id}`)}
                                                className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white text-center py-3 rounded-xl font-medium hover:from-red-600 hover:to-red-700 transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
                                            >
                                                Finalize your request
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full">
                                    <div className=" rounded-2xl shadow-sm p-12 text-center">

                                        <p className="text-gray-500">Start adding professionals to your favorites to see them here.</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>


            </MainLayout >
        </>
    );
}