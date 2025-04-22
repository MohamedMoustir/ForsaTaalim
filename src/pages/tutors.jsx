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
    useEffect(() => {


        if (token) {
            setUserAuth(true);
        }
        if (!user.role) {
            // navigate("/login");
        } else if (user && user.role === "tuteur") {
            navigate("/login");
        }
    }, [token, user, navigate, currentPage]);
    useEffect(() => {
        fetchProfesseurs(currentPage);
    }, [currentPage]);
    function handleClick() {
        setIsMenuHidden(false);
    };
    const handleClickProfessor = (id) => {
       
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
                <Alert
                    type={type}
                    title={title}
                    message={message}
                    onClose={() => setShowAlert(false)}
                />
            )}
            {loading && (
                <Spinner />
            )}
            <MainLayout >
                <div class="max-w-6xl mx-auto p-6">
                    <h1 class="text-2xl font-bold mb-8">
                        Trouvez le professeur idéal pour vous accompagner
                    </h1>
                    <div class="flex items-center text-sm text-gray-500 mb-6 ">
                        <ul id="" onClick={(e) => setFilterByLocation(e.target.id)}
                            class="border cursor-pointer   border-black hover:border-red-400 relative  lg:ml-10 mr-10 lg:m-0 text-black px-2 py-2 rounded-lg hover:bg-red-400 hover:text-white transition">
                            All
                        </ul>
                        <ul id="Distance" onClick={(e) => setFilterByLocation(e.target.id)}
                            class="border cursor-pointer   border-black hover:border-red-400 relative -ml-8 lg:ml-1 lg:mr-1 lg:m-0 text-black px-2 py-2 rounded-lg hover:bg-red-400 hover:text-white transition">
                            Distance
                        </ul>
                        <ul id="Online" onClick={(e) => setFilterByLocation(e.target.id)}
                            class="border cursor-pointer   border-black hover:border-red-400 relative ml-2 -lg:ml-2 lg:mr-2 lg:m-0 text-black px-2 py-2 rounded-lg w-24 text-center hover:bg-red-400 hover:text-white transition">
                            Online
                        </ul>
                        <div class="flex relative left-[500px]">
                            <div class="relative flex-grow mr-4">
                                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </span>
                                {/* <input id="inputSerch" type="hidden" placeholder="ESL tutors nearby"
                                class="pl-10 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-red-400" /> */}
                                <input value={filterByLocation} onChange={(e) => setFilterByLocation(e.target.value)} id="" type="hidden" placeholder="ESL tutors nearby"
                                    class="pl-10 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-red-400" />
                                <input onChange={(e) => setSearch(e.target.value)} id="inputSerch" type="text" placeholder="ESL tutors nearby"
                                    class="pl-10 w-full py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-red-400" />
                            </div>
                            <button
                                class="bg-red-400 text-white px-6 py-2 rounded-full hover:bg-red-500 transition">Search</button>
                        </div>


                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {

                            profiles.filter((item) => {

                                if (search) {
                                    return search.toLowerCase() === '' ? item : item.prenom.toLowerCase().includes(search);
                                }
                                return filterByLocation === 'All' ? item : item.location.includes(filterByLocation);

                            }).map((prof, index) => {
                                return (
                                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                        <div className="relative h-48 bg-gray-200">
                                            <img
                                                key={prof.profe_id}
                                                onClick={() =>  navigate(`/detilesTutor/${prof.profe_id}`)}
                                                src={`http://127.0.0.1:8000/storage/${prof.photo}`}
                                                alt={prof.prenom}
                                                className="w-full h-full object-cover cursor-pointer"
                                            />
                                            <button
                                                onClick={() => handlegetUser(prof.profe_id)}
                                                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-gray-600 hover:text-red-500"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                >
                                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                </svg>
                                            </button>

                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-center mb-3">
                                                <h2 className="text-xl font-semibold text-gray-800">{prof.prenom}</h2>
                                                <p className="text-sm text-gray-600">{prof.location}</p>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-3">
                                                Matière: <span className="font-semibold">{prof.nom_matiere}</span>
                                            </p>

                                            <div className="flex items-center mb-3">
                                                <div className="flex items-center">
                                                    <span className="text-yellow-400">★</span>
                                                    <span className="ml-1">{prof.average_rating?.split(0, 3)}</span>
                                                    <span className="text-gray-500 text-sm ml-1">({prof.total_ratings} reviews)</span>
                                                </div>
                                                <span className="ml-4 text-blue-600 text-sm font-medium">Ambassador</span>
                                            </div>

                                            <p className="text-gray-700 text-sm mb-4">{prof.biographie}</p>

                                            <div className="flex items-center justify-between">
                                                <div className="text-gray-900">
                                                    <span className="font-semibold">${prof.tarifHoraire}</span>
                                                    <span className="text-sm">/h</span>
                                                </div>
                                                <span className="text-red-500 text-sm font-medium">1st lesson free</span>
                                            </div>
                                        </div>
                                    </div>

                                )
                            })
                        }

                    </div>
                </div>
            </MainLayout >
            {
                <nav aria-label="Page navigation example">
                    <ul className="flex items-center -space-x-px h-10 text-base justify-center mt-12">
                        <li>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                            </button>
                        </li>

                        {pages.map((pageIndex) => (

                            <li key={pageIndex}>
                                <button
                                    onClick={() => setCurrentPage(pageIndex + 1)}
                                    className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${currentPage === pageIndex + 1
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                        }`}
                                >
                                    {pageIndex + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length))}
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4L1 1" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>

            }
        </>
    );

};




export default Tutors;
