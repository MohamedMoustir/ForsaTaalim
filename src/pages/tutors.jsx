import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import index from '.';



const API_URL = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const parsedToken = JSON.parse(user);


const Tutors = () => {

    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const [profiles, setprofiles] = useState([]);
    const [isUserAuth, setUserAuth] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [profileslength, setprofileslength] = useState(6);
    const [search, setSearch] = useState('');
    const [filterByLocation, setFilterByLocation] = useState('All');


    const fetchProfesseurs = async (page) => {
        const res = await axios.get(`${API_URL}/Professeur?page=${page}`);
        setprofileslength(res.data.AllProfile.total);
        setprofiles(res.data.AllProfile.data);
        console.log(res.data.AllProfile.data);

    };

    console.log(filterByLocation);
    const navigate = useNavigate();
    useEffect(() => {

        fetchProfesseurs(currentPage);
        if (token) {
            setUserAuth(true);
        }
        if (!parsedToken.role ) {
            navigate("/login");
        } else if (parsedToken && parsedToken.role === "tuteur") {
            navigate("/login");
        }
    }, [token, user, navigate, currentPage]);

    function handleClick() {
        setIsMenuHidden(false);
    };
    function handleClickFlase() {
        setIsMenuHidden(true);
    }
    const handleClickProfessor = (id) => {
        navigate(`/detilesTutor/${id}`);
      };


    const lastItemsIndex = currentPage * itemsPerPage;
    const firstItemsIndex = lastItemsIndex - itemsPerPage
    const thisPageItems = profiles.slice(firstItemsIndex, lastItemsIndex)
    const pages = [];
    for (let i = 0; i < profileslength / itemsPerPage; i++) {
        pages.push(i);
    }
    return (
        <>
            {!isUserAuth && (
                <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto ">
                    <div className="text-2xl font-bold text-pink-500">
                        ForsaTaalim
                    </div>
                    <div className="flex gap-4 items-center">
                        <a href="#" className="text-gray-600 rounded-full bg-slate-50 w-10 py-2 text-center  hover:text-gray-800">?</a>
                        <a className="bg-white cursor-pointer px-4 py-2 rounded-full hover:bg-gray-50">Become a Tutor</a>
                        <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 ">Log In</a>
                    </div>
                </nav>
            )}

            {isUserAuth && (

                <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto">
                    <div className="text-2xl font-bold text-pink-500">
                        ForsaTaalim
                    </div>
                    <div className="flex gap-4 items-center ">
                        <a href="#"
                            className="bg-red-400 border border-red-400 text-white px-[10px] py-[10px] rounded-full hover:bg-red-400 rounded-full text-1xl absolute right-[100px]">M</a>
                    </div>
                    {isMenuHidden && (
                        <button id="" onClick={handleClick} data-collapse-toggle="navbar-hamburger" type="button"
                            className=" hamburger inline-flex itemsenter justify-center p-2 w-12 h-12 text-sm text-gray-500 rounded-lg absolute right-[180px] "
                            aria-controls="navbar-hamburger" aria-expanded="false" >
                            <span className="sr-only">Open main menu</span>
                            <svg className="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    )}
                    {!isMenuHidden && (
                        <button
                            id="close-btn"
                            onClick={handleClickFlase}
                            type="button"
                            className="inline-flex items-center justify-center p-2 w-12 h-12 text-sm text-gray-500 rounded-lg absolute right-[180px] top-2"
                            aria-label="Close menu"
                        >
                            <span className="sr-only">Close menu</span>
                            <svg
                                className="w-[110px] h-[110px] "
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                    )}


                    <ul
                        className={`menu ${isMenuHidden ? 'hidden' : ''} 
                        flex flex-col font-medium mt-4 w-[200px] bg-white shadow-sm dark:bg-red-400 dark:border-red-400 text-center absolute right-[8%] bottom-[65%] 
                        rounded-lg border border-gray-200 dark:border-gray-600`}
                        style={{ zIndex: 1 }}>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white bg-red-400 dark:bg-blue-600 rounded-t-lg hover:bg-red-500 dark:hover:bg-blue-700 transition-colors"
                                aria-current="page"
                            >
                                My Dashboard

                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="p1"
                            >
                                Priority
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="triparTiter"
                            >
                                My Profile
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="triparDate_limite"
                            >
                                Log Out
                            </a>
                        </li>
                    </ul>

                    <button className="absolute top-4 right-[225px] p-1 rounded-full bg-white/80 hover:bg-white" />
                    <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                        </path>
                    </svg>

                </nav>
            )}

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
                            console.log(filterByLocation);

                            if (search) {
                                return search.toLowerCase() === '' ? item : item.prenom.toLowerCase().includes(search);
                            }
                            return filterByLocation === 'All' ? item : item.location.includes(filterByLocation);

                        }).map((prof, index) => {
                            return (
                                <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="relative h-48 bg-gray-200">
                                        <img
                                            key={prof.id}
                                            onClick={() => handleClickProfessor(prof.id)}
                                            src={`http://127.0.0.1:8000/storage/${prof.photo}`}
                                            alt={prof.prenom}
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all">
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
                                                <span className="ml-1">{prof.total_ratings}</span>
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
