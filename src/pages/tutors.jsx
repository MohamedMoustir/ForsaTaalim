import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import MainLayout from "../components/MainLayout.jsX";
import { API_URL, getToken, getUser } from '../utils/config';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const Tutors = () => {
    const token = getToken();
    const user = getUser();
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const [profiles, setprofiles] = useState([]);
    const [isUserAuth, setUserAuth] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [profileslength, setprofileslength] = useState(6);
    const [search, setSearch] = useState('');
    const [filterByLocation, setFilterByLocation] = useState('All');
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [type, setType] = useState('');
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [filterByCategory, setFilterByCategory] = useState('');
    const [CategorieMatiere, setCategorieMatiere] = useState([]);
    const [city, setcity] = useState([]);

    const fetchProfesseurs = async (page) => {
        const res = await axios.get(`${API_URL}/Professeur?page=${page}`);
        setprofileslength(res.data.AllProfile.total);
        setprofiles(res.data.AllProfile.data);
        if (res) {
            setLoading(false);
        }
        console.log(res.data.AllProfile.data);
    };

    useEffect(() => {
        fetchProfesseurs(currentPage);
    }, [])

    const navigate = useNavigate();
    // useEffect(() => {
    //     if (token) {
    //         setUserAuth(true);
    //     }
    //     if (!user) {
    //         navigate("/login");
    //     } else if (user && user.role === "tuteur") {
    //         navigate("/login");
    //     }
    // }, [token,user, navigate, currentPage]);

    useEffect(() => {
        fetchProfesseurs(currentPage);
    }, [currentPage]);

    function handleClick() {
        setIsMenuHidden(false);
    };

    function handlegetUser(userId) {

        fetch(`${API_URL}/favorites`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id2: userId,
            }),
        })
            .then((response) => response.json())
            .then(() => {
                setShowAlert(true)
                setTitle('card Ajoute avec succès !')
                setType('success')
                setMessage('Votre card a ajouter avec succès.');
                setInterval(() => {
                    navigate('/favorites');
                }, 2000)

            });
    }
    useEffect(() => {

        axios.get(`${API_URL}/categorie_matiere`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setCategorieMatiere(response.data.AllCategorieMatiere);
            })
            .catch((error) => {
                console.error("Error fetching categories", error);
            });

        axios.get(`https://mohamedmoustir.github.io/api/`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                setcity(response.data.cities);


            })
            .catch((error) => {
                console.error("Error fetching city", error);
            });

    }, []);

    const lastItemsIndex = currentPage * itemsPerPage;
    const firstItemsIndex = lastItemsIndex - itemsPerPage
    const thisPageItems = profiles.slice(firstItemsIndex, lastItemsIndex)
    const pages = [];
    for (let i = 0; i < profileslength / itemsPerPage; i++) {
        pages.push(i);
    }



    return (
        <>
            {showAlert && (
                <Alert type={type} title={title} message={message} onClose={() => setShowAlert(false)} />
            )}
            {loading && <Spinner />}

            <MainLayout>
                <div className="max-w-7xl mx-auto px-6 py-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                        Find the Perfect Tutor to Guide You
                    </h1>


                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-12">
                        <div className="flex flex-wrap gap-4">
                            <button
                                onClick={() => setFilterByLocation("")}
                                className={`px-5 py-2 rounded-full border text-sm font-medium transition duration-300 ${filterByLocation === ""
                                    ? "bg-red-500 text-white"
                                    : "bg-white text-gray-800 hover:bg-red-100 border-gray-300"
                                    }`}
                            >
                                Tous
                            </button>

                            <select
                                onChange={(e) => setFilterByLocation(e.target.value)}
                                className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                <option value="">Toutes les villes</option>
                                {city.map((item) => (
                                    <option key={item.city} value={item.city}>{item.city}</option>
                                ))}
                            </select>

                            <select
                                onChange={(e) => setFilterByCategory(e.target.value)}
                                className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
                            >
                                <option value="">Toutes les matières</option>
                                {CategorieMatiere.map((item) => (
                                    <option key={item.nom} value={item.nom}>{item.nom}</option>
                                ))}
                            </select>
                        </div>

                        <div className="relative w-full max-w-xs">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </span>
                            <input
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Rechercher un professeur..."
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {profiles.filter((item) => {
                            if (search) {
                                return item.prenom.toLowerCase().includes(search.toLowerCase());
                            } else if (filterByCategory) {
                                return filterByCategory === 'All' ? item : item.nom_matiere.includes(filterByLocation);
                            }
                            return filterByLocation === 'All' ? item : item.location.includes(filterByLocation);
                        }).map((prof, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 overflow-hidden">
                                <div className="relative h-48 bg-gray-200">
                                    <img
                                        src={`http://127.0.0.1:8000/storage/${prof.photo}`}
                                        alt={prof.prenom}
                                        onClick={() => navigate(`/detilesTutor/${prof.profe_id}`)}
                                        className="w-full h-full object-cover cursor-pointer"
                                    />
                                    <button
                                        onClick={() => handlegetUser(prof.profe_id)}
                                        className="absolute top-4 right-4 p-2 bg-white/90 hover:bg-white rounded-full shadow"
                                    >
                                        <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                        </svg>
                                    </button>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-lg font-bold text-gray-900">{prof.prenom}</h2>
                                        <span className="text-sm text-gray-500">{prof.location}</span>
                                    </div>

                                    <p className="text-gray-700 text-sm mb-3">
                                        Matière: <span className="font-semibold">{prof.nom_matiere}</span>
                                    </p>

                                    <div className="flex items-center text-sm text-gray-600 mb-3">
                                        <span className="text-yellow-400">★</span>
                                        <span className="ml-1">{Number(prof.average_rating).toFixed(1)}</span>
                                        <span className="ml-2">({prof.total_ratings} avis)</span>
                                        <span className="ml-4 text-blue-600 font-medium">Ambassadeur</span>
                                    </div>

                                    <p className="text-gray-600 text-sm mb-4">{prof.biographie}</p>

                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-gray-900">${prof.tarifHoraire}/h</span>
                                        <span className="text-red-500 text-xs font-semibold">1er cours gratuit</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <nav aria-label="Pagination" className="mt-12 flex justify-center">
                        <ul className="inline-flex items-center -space-x-px">
                            <li>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className="flex items-center justify-center w-10 h-10 text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 6 10">
                                        <path d="M5 1 1 5l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </li>

                            {pages.map((pageIndex) => (
                                <li key={pageIndex}>
                                    <button
                                        onClick={() => setCurrentPage(pageIndex + 1)}
                                        className={`flex items-center justify-center w-10 h-10 border ${currentPage === pageIndex + 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-500 hover:bg-gray-100"
                                            }`}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length))}
                                    className="flex items-center justify-center w-10 h-10 text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100"
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 6 10">
                                        <path d="M1 9l4-4L1 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            </MainLayout>
        </>
    );


};




export default Tutors;
