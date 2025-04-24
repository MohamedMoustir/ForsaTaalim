

import React, { useEffect, useState } from "react";
import AdminDashboard from "./Dashboard";
import AdminNav from "../components/AdimNav";
import axios from "axios";
import { API_URL, getToken } from "../utils/config";
import Spinner from "../components/Spinner";

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
            }

        } catch (err) {
            console.error('Error updating reservation status:', err);
            alert('Failed to update reservation status');
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
            }

        } catch (err) {
            console.error('Error updating reservation status:', err);
            alert('Failed to update reservation status');
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
        <>

            <div className=" flex bg-gray-50 min-h-screen" style={{ fontFamily: 'Open Sans' }}>
                {loading && (
                    <Spinner />
                )}
                <div className="w-full md:w-64 bg-white shadow-md">
                    <AdminNav />
                </div>
                <div className="container mx-auto p-4 max-w-7xl">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
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
                                        <p className="text-sm font-medium text-indigo-900">Nobita A.</p>
                                        <p className="text-xs text-gray-500">Admin</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-purple-200"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search here..."
                                    className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                                />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                            <div className="flex gap-3">
                                <div className="relative">
                                    <button className="flex items-center justify-between gap-2 px-4 py-2 border border-indigo-200 rounded-lg text-indigo-600 bg-white w-32">
                                        <span>Newest</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </button>
                                </div>
                                <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">
                                    <i className="fas fa-plus"></i>
                                    <span>New Student</span>
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-gray-200">

                                        <th className="p-4 text-left text-sm font-medium text-gray-600">ID</th>
                                        <th className="p-4 text-left text-sm font-medium text-gray-600">Name</th>
                                        <th className="p-4 text-left text-sm font-medium text-gray-600">Role</th>
                                        <th className="p-4 text-left text-sm font-medium text-gray-600">Date</th>
                                        <th className="p-4 text-left text-sm font-medium text-gray-600">Contact</th>
                                        <th className="p-4 text-left text-sm font-medium text-gray-600">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {student.filter((item) => {
                                        if (search) {
                                            return search.toLowerCase() === 'all' ? item : item.prenom.toLowerCase().includes(search);
                                        } else {
                                            setSearch('all')
                                        }
                                    }).map((user, index) => (
                                        <tr
                                            key={index}
                                            className="border-l-4 border-indigo-500 bg-white hover:bg-indigo-50 transition-colors duration-300"
                                        >
                                            <td className="p-4 text-gray-600 font-medium">{user.id}</td>

                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={`http://127.0.0.1:8000/storage/${user.photo}`}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full object-cover border"
                                                    />
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{user.prenom} {user.name}</p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-gray-500">{user.role}</td>


                                            <td className="p-4 text-gray-500 text-sm">
                                                {new Date(user.created_at).toLocaleDateString("fr-FR", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric"
                                                })}
                                            </td>

                                            <td className="p-4">
                                                <div className="flex gap-2">
                                                    <a
                                                        href={`tel:${user.telephone}`}
                                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                                                    >
                                                        <i className="fas fa-phone-alt"></i>
                                                    </a>
                                                    <a
                                                        href={`mailto:${user.email}`}
                                                        className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                                                    >
                                                        <i className="fas fa-envelope"></i>
                                                    </a>
                                                </div>
                                            </td>

                                            <td className="p-4 text-right relative">
                                                <div className="inline-block text-left">
                                                    <button
                                                        onClick={() => setShowMenu(user.id)}

                                                        className="text-gray-400 hover:text-gray-600 transition"
                                                    >
                                                        <i className="fas fa-ellipsis-h"></i>
                                                    </button>

                                                    {showMenu === user.id && (
                                                        <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg z-50 border">
                                                            <form onSubmit={handleStatusUpdate} className="py-2 px-4 text-sm text-gray-700">
                                                                <label className="block text-gray-600 mb-1">Role:</label>

                                                                <select
                                                                    onChange={(e) => setRole(e.target.value)}
                                                                    className="w-full px-2 py-1 border rounded-md focus:outline-none focus:ring"
                                                                >
                                                                    <option value="etudiant">Etudiant</option>
                                                                    <option value="admin">Admin</option>
                                                                    <option value="tuteur">Tuteur</option>
                                                                </select>


                                                                <button

                                                                    className="w-full px-4 py-2 text-left text-green-600 hover:bg-gray-100"
                                                                >
                                                                    <i className="fas fa-save mr-2"></i> Enregistrer
                                                                </button>
                                                            </form>
                                                            {user.isActive ? (
                                                                <button
                                                                    onClick={() => handleSuspend(user.id)}
                                                                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                                                                >
                                                                    <i className="fas fa-ban mr-2"></i> Suspendre
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    onClick={() => handleSuspend(user.id)}
                                                                    className="w-full px-4 py-2 text-left text-green-600 hover:bg-green-100"
                                                                >
                                                                    <i className="fas fa-ban mr-2"></i> Active
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}

                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>


                            </table>
                            {(
                                <div aria-label="Page navigation example">
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
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};




export default Students;