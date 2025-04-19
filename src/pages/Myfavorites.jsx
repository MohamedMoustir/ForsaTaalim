
import React, { useEffect, useState } from 'react';
import MainLayout from '../components/MainLayout.jsX';
import gift from '../../../forsaTaalim/resources/image/gift.png';
import { useNavigate } from 'react-router-dom';
import { API_URL, getToken, getUser } from '../utils/config';

export default function Myfavorites() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [favorite, setFavorite] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const token = getToken();
    const user = getUser();
    
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
                console.log(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des favoris:', error);
            });
    }

    useEffect(() => {
        fetchFavorites()
       
    },[])
    useEffect(() => {
        // navigate('/login')
    })

    function handlegetUser(userId) {

        fetch(`${API_URL}/favorites/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(() => {
                setFavorites(prevFavorites => prevFavorites.filter(item => item.user_id2 !== userId));
            });
    }
 
    return (

        <MainLayout >
             {loading && (
                <Spinner />
            )}
            <section className="bg-gray-50">
                <div className="max-w-6xl mx-auto p-6">
                    <h1 className="text-2xl font-bold mb-8">
                        My Favorites
                    </h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {favorites && favorites.length > 0 ? (
                            favorites.map((item, index) => (
                                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-red-400">
                                    <div className="relative h-48 bg-gray-200">
                                        <img
                                         
                                            key={item.profe_id}
                                            onClick={() => handleClickProfessor(item.id)}
                                            src={`http://127.0.0.1:8000/storage/${item.user_photo}`}
                                            alt={item.prenom}
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                         
                                        <button  onClick={() => handlegetUser(item.user_id)}
                                            className={`btn ${item.isFavorite ? 'btn-danger' : 'btn-primary'} absolute top-4 right-4 p-1 rounded-full bg-white/80 hover:bg-white`}
                                            aria-label={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
                                        >
                                            <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex items-center mb-3">
                                            <div className="flex items-center">
                                                <span className="text-yellow-400">★</span>
                                                <span className="ml-1">{item.total_ratings}</span>
                                                <span className="text-gray-500 text-sm ml-1">({item.total_ratings} reviews)</span>
                                            </div>
                                            <span className="ml-4 text-blue-600 text-sm">Ambassador</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <h1 className="border border-red-400 w-20 h-8 rounded-3xl text-center font-bold text-red-400">
                                            {item.tarifHoraire}$
                                            </h1>
                                            <img className="h-8 w-20 rounded-3xl" src={gift} alt="Product icon" />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-red-500 cursor-pointer text-sm bg-red-400 text-white p-4 w-full text-center mt-4 rounded-3xl">
                                                Finalize your request
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>Aucun favori trouvé.</div>
                        )}
                    </div>
                </div>
            </section>

        </MainLayout >
    );
}