

import React, { useEffect, useState } from "react";
import AdminDashboard from "./Dashboard";
import AdminNav from "../components/AdimNav";
import axios from "axios";
import { API_URL, getToken } from "../utils/config";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

const Students = () => {

    const token = getToken();
    const [student, setStudent] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [profileslength, setprofileslength] = useState(6);
    const [showMenu, setShowMenu] = useState();
    const [role, setRole] = useState();
    const [showAlert, setShowAlert] = useState(false);
    const [type, setType] = useState('');
    const [titles, setTitles] = useState('');
    const [message, setMessage] = useState('');


    const fetchStudents = async (page) => {
        const response = await axios.get(`${API_URL}/admin/Student?page=${page}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-Type': 'aplication/json'
            }
        })
        const data = response.data.student;
        console.log(data);
        setprofileslength(data.total);

        setLoading(false);
        setStudent(data.data);

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
                setStudent(student.map(res =>
                    res.id === showMenu ? { ...res, role: role } : res
                ));
                setLoading(false);
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
    const thisPageItems = student.slice(firstItemsIndex, lastItemsIndex)
    const pages = [];
    for (let i = 0; i < profileslength / itemsPerPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen" style={{ fontFamily: 'Open Sans' }}>
            {loading && <Spinner />}
            {showAlert && (
                <Alert
                    type={type}
                    title={titles}
                    message={message}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <aside className="w-full md:w-64 shadow-lg bg-white">
                <AdminNav id_={2} />
            </aside>

            <main className="flex-1 p-4">
                <div className="bg-white rounded-xl shadow-lg p-6">

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                        <h1 className="text-2xl font-bold text-indigo-900">Students</h1>
                        <div className="flex items-center gap-4">
                            <button className="text-gray-500 hover:text-gray-700">
                                <i className="fa-regular fa-bell text-xl"></i>
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <i className="fa-solid fa-gear text-xl"></i>
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-indigo-900">Nobita A.</p>
                                    <p className="text-xs text-gray-500">Admin</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-purple-200"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                        <div className="relative w-full md:w-1/3">
                            <input
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search here..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 border border-indigo-300 rounded-lg text-indigo-600 bg-white hover:bg-indigo-50">
                                <span>Newest</span>
                                <i className="fas fa-chevron-down"></i>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                <i className="fas fa-plus"></i>
                                <span>New Student</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-100 text-gray-700 uppercase">
                                <tr>
                                    <th className="p-4">ID</th>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Role</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Contact</th>
                                    <th className="p-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {student.filter((item) => {
                                    if (search) {
                                        return search.toLowerCase() === 'all' ? item : item.prenom.toLowerCase().includes(search);
                                    } else {
                                        setSearch('all');
                                    }
                                }).map((user, index) => (
                                    <tr key={index} className="hover:bg-indigo-50 transition">
                                        <td className="p-4 text-gray-700">{user.id}</td>
                                        <td className="p-4 flex items-center gap-3">
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${user.photo}`}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full object-cover border"
                                            />
                                            <div>
                                                <p className="font-semibold">{user.prenom} {user.name}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                        </td>
                                        <td className="p-4 text-gray-600">{user.role}</td>
                                        <td className="p-4 text-gray-500">
                                            {new Date(user.created_at).toLocaleDateString("fr-FR", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric"
                                            })}
                                        </td>
                                        <td className="p-4 flex gap-2">
                                            <a href={`tel:${user.telephone}`} className="text-blue-600 hover:text-blue-800">
                                                <i className="fas fa-phone-alt"></i>
                                            </a>
                                            <a href={`mailto:${user.email}`} className="text-blue-600 hover:text-blue-800">
                                                <i className="fas fa-envelope"></i>
                                            </a>
                                        </td>
                                        <td className="p-4 text-right relative">
                                            <button
                                                onClick={() => setShowMenu(user.id)}
                                                className="text-gray-400 hover:text-gray-700"
                                            >
                                                <i className="fas fa-ellipsis-h"></i>
                                            </button>
                                            {showMenu === user.id && (
                                                <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg z-50">
                                                    <form onSubmit={handleStatusUpdate} className="py-2 px-4">
                                                        <label className="block mb-2 text-sm font-medium text-gray-600">Role:</label>
                                                        <select
                                                            onChange={(e) => setRole(e.target.value)}
                                                            className="w-full border border-gray-300 rounded-md p-2 mb-2"
                                                        >
                                                            <option value="etudiant">Etudiant</option>
                                                            <option value="admin">Admin</option>
                                                            <option value="tuteur">Tuteur</option>
                                                        </select>
                                                        <button type="submit" className="w-full text-left text-green-600 hover:bg-gray-100 py-2">
                                                            <i className="fas fa-save mr-2"></i>Enregistrer
                                                        </button>
                                                    </form>
                                                    {user.isActive ? (
                                                        <button
                                                            onClick={() => handleSuspend(user.id)}
                                                            className="w-full text-left text-red-600 hover:bg-gray-100 py-2"
                                                        >
                                                            <i className="fas fa-ban mr-2"></i>Suspendre
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleSuspend(user.id)}
                                                            className="w-full text-left text-green-600 hover:bg-green-100 py-2"
                                                        >
                                                            <i className="fas fa-check mr-2"></i>Activer
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-center mt-8">
                        <ul className="inline-flex items-center -space-x-px text-base h-10">
                            <li>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className="flex items-center justify-center px-4 h-10 bg-white text-gray-600 border border-gray-300 rounded-l-lg hover:bg-gray-100"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                    </svg>
                                </button>
                            </li>
                            {pages.map((pageIndex) => (
                                <li key={pageIndex}>
                                    <button
                                        onClick={() => setCurrentPage(pageIndex + 1)}
                                        className={`flex items-center justify-center px-4 h-10 ${currentPage === pageIndex + 1 ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                </li>
                            ))}
                            <li>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length))}
                                    className="flex items-center justify-center px-4 h-10 bg-white text-gray-600 border border-gray-300 rounded-r-lg hover:bg-gray-100"
                                >
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4L1 1" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );

};




export default Students;