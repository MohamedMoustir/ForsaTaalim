
import React, { useEffect, useState } from "react";
import AdminDashboard from "./Dashboard";
import AdminNav from "../components/AdimNav";
import axios from "axios";
import { API_URL, getToken } from "../utils/config";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
const TeacherList = () => {

    const token = getToken();
    const [tuteur, setTuteur] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [profileslength, setprofileslength] = useState(6);
    const [showMenu, setShowMenu] = useState(false);
    const [role, setRole] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [type, setType] = useState('');
    const [titles, setTitles] = useState('');
    const [message, setMessage] = useState('');
    const Navigate = useNavigate();


    const fetchStudents = async (page) => {
        const response = await axios.get(`${API_URL}/admin/Tuteur?page=${page}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-Type': 'aplication/json'
            }
        })
        const data = response.data.Tuteur;
        console.log(data.data);
        setprofileslength(data.total);

        setLoading(false);
        setTuteur(data.data);

    }
    useEffect(() => {
        fetchStudents(currentPage);
    }, [currentPage])


    const handleStatusUpdate = async (e) => {

        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("role", role);
            formData.append("_method", 'PUT');
            const response = await axios.post(`${API_URL}/users/${showMenu}/role`, formData, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });

            if (response.data) {
                setShowMenu(0)
                setTuteur(tuteur.map(res =>
                    res.id === showMenu ? { ...res, role: role } : res
                ));
                setShowAlert(true);
                setTitles('user update avec succès!');
                setType('success');
                setMessage('user update avec succès.');

            }

        } catch (err) {
            setShowAlert(true);
            setTitles('Error updating reservation status');
            setType('error');
            setMessage('Failed to update reservation status');
            console.error('Error updating reservation status:', err);
        }
    };

    const handleSuspend = async () => {
        try {
            const formData = new FormData();
            formData.append("_method", 'patch');

            const response = await axios.post(`${API_URL}/users/${showMenu}/suspend`, formData, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });

            if (response.data) {
                console.log(response.data);

                setShowMenu(0)
                setShowAlert(true);
                setTitles('user Suspend avec succès!');
                setType('success');
                setMessage('user Suspend avec succès.');
            }

        } catch (err) {
            setShowAlert(true);
            setTitles('Error updating reservation status!');
            setType('error');
            setMessage('Failed to update reservation status');
            console.error('Error updating reservation status:', err);
        }
    };



    const lastItemsIndex = currentPage * itemsPerPage;
    const firstItemsIndex = lastItemsIndex - itemsPerPage
    const thisPageItems = tuteur.slice(firstItemsIndex, lastItemsIndex)
    const pages = [];
    for (let i = 0; i < profileslength / itemsPerPage; i++) {
        pages.push(i);
    }
    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen" style={{ fontFamily: 'Open Sans' }}>
            {loading && <Spinner />}

            <div className="w-full md:w-64  shadow-md">
                <AdminNav id_={3} />
            </div>
            {showAlert && (
                <Alert
                    type={type}
                    title={titles}
                    message={message}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <div className="flex-1 px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 max-w-screen-lg mx-auto">
                    <h1 className="text-2xl font-semibold text-indigo-800 mb-4 sm:mb-0">Teachers</h1>
                    <div className="flex items-center gap-4">
                        <button className="text-gray-500 hover:text-indigo-600 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0..." />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">Nadine A.</span>
                            <div className="h-9 w-9 bg-purple-400 rounded-full"></div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 max-w-screen-lg mx-auto gap-4">
                    <div className="relative w-full sm:w-64">
                        <div className="absolute inset-y-0 left-3 flex items-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7..." />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search here..."
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full py-2 pl-10 pr-4 rounded-md border border-gray-300 shadow-sm focus:ring-indigo-500 focus:outline-none focus:ring-2 transition-all"
                        />
                    </div>

                    <div className="flex gap-2">
                        <button className="flex items-center gap-1 px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-100 transition-all">
                            Newest
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" stroke="currentColor" viewBox="0 0 24 24" fill="none">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        <button className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all">
                            + New Student
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-screen-lg mx-auto">
                    {tuteur
                        .filter((item) => search === '' || search.toLowerCase() === 'all' || item.prenom.toLowerCase().includes(search.toLowerCase()))
                        .map((user, index) => (
                            <div key={index} className="relative bg-white p-5 rounded-xl shadow-md text-center hover:shadow-lg transition-all">
                                {showMenu === user.id && (
                                    <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg z-50 border">
                                        <form onSubmit={handleStatusUpdate} className="py-2 px-4 text-sm text-gray-700">
                                            <label className="block text-gray-600 mb-1">Role:</label>
                                            <select
                                                onChange={(e) => setRole(e.target.value)}
                                                className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-400"
                                            >
                                                <option value="etudiant">Etudiant</option>
                                                <option value="admin">Admin</option>
                                                <option value="tuteur">Tuteur</option>
                                            </select>
                                            <button className="w-full px-4 py-2 text-left text-green-600 hover:bg-gray-100 mt-2">
                                                <i className="fas fa-save mr-2"></i> Enregistrer
                                            </button>
                                        </form>

                                        <button
                                            onClick={() => handleSuspend(user.id)}
                                            className={`w-full px-4 py-2 text-left ${user.isActive ? 'text-red-600' : 'text-green-600'} hover:bg-gray-100`}
                                        >
                                            <i className="fas fa-ban mr-2"></i> {user.isActive ? 'Suspendre' : 'Activer'}
                                        </button>
                                    </div>
                                )}

                                <button
                                    onClick={() => setShowMenu(user.id)}
                                    className="text-gray-400 hover:text-gray-600 transition absolute top-2 right-2"
                                >
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>

                                <div className="mb-4">
                                    <img
                                        className="h-16 w-16 mx-auto rounded-full border border-gray-200 object-cover"
                                        src={`http://127.0.0.1:8000/storage/${user.photo}`}
                                        alt={user.name}
                                    />
                                </div>

                                <h3 className="font-semibold text-indigo-900">{user.prenom}</h3>
                                <p className="text-gray-500 text-sm">{user.nom}</p>
                                <div className="flex justify-center gap-3 mt-4">
                                    <a href={`tel:${user.telephone}`} className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all">
                                        <i className="fas fa-phone-alt"></i>
                                    </a>
                                    <a href={`mailto:${user.email}`} className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-all">
                                        <i className="fas fa-envelope"></i>
                                    </a>

                                    <a
                                        onClick={() => Navigate(`/detilesTutor/${user.id}`)}
                                        className="relative w-9 h-9 flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-all"
                                    >
                                        <i className="fas fa-user"></i>


                                    </a>
                                </div>
                            </div>
                        ))}
                </div>


                <div className="flex justify-center mt-12">
                    <ul className="inline-flex items-center space-x-1">
                        <li>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="px-3 py-2 bg-white border border-gray-300 rounded-l-md hover:bg-gray-100"
                            >
                                <svg className="w-3 h-3" viewBox="0 0 6 10" fill="none">
                                    <path d="M5 1 1 5l4 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </button>
                        </li>
                        {pages.map((pageIndex) => (
                            <li key={pageIndex}>
                                <button
                                    onClick={() => setCurrentPage(pageIndex + 1)}
                                    className={`px-4 py-2 border ${currentPage === pageIndex + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
                                >
                                    {pageIndex + 1}
                                </button>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length))}
                                className="px-3 py-2 bg-white border border-gray-300 rounded-r-md hover:bg-gray-100"
                            >
                                <svg className="w-3 h-3" viewBox="0 0 6 10" fill="none">
                                    <path d="M1 9l4-4L1 1" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );


};

export default TeacherList;
