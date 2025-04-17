import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavEtudiant from "../components/NavEtudiant"
import { API_URL, getToken, getUser } from '../utils/config';

const Mespaiements = () => {
    const token = getToken();
    const user = getUser();
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const [Mespaiements, setMespaiements] = useState([]);
    const [isUserAuth, setUserAuth] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [paymentlength, setpaymentlength] = useState(6);
    const [search, setSearch] = useState('');
    const [filterByLocation, setFilterByLocation] = useState('All');
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async (page) => {
        const response = await axios.get(`${API_URL}/Reservation/pay/?page=${page}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        setpaymentlength(response.data.reservation.total);
        setMespaiements(response.data.reservation.data);
        console.log('ccc', response.data.reservation.data);

        if (response) {
            setLoading(false);
        }
        console.log(response.data.reservation.data);
    };

    const navigate = useNavigate();
    useEffect(() => {

        fetchPayments(currentPage);
        if (token) {
            setUserAuth(true);
        }
        if (!parsedToken.role) {
            // navigate("/login");
        } else if (parsedToken && parsedToken.role === "tuteur") {
            navigate("/login");
        }

    }, [token, user, navigate, currentPage]);

    useEffect(() => {
        fetchPayments(currentPage);
    }, [currentPage]);

    // function handleClick() {
    //     setIsMenuHidden(false);
    // };

    // function handlegetUser(userId) {

    //     fetch(`${API_URL}/favorites`, {
    //         method: 'POST',
    //         headers: {
    //             'Authorization': `Bearer ${localStorage.getItem('token')}`,
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             user_id2: userId,
    //         }),
    //     })
    //         .then((response) => response.json())
    //         .then(() => {
    //             alert('done');
    //         });
    // }

    const lastItemsIndex = currentPage * itemsPerPage;
    const firstItemsIndex = lastItemsIndex - itemsPerPage
    const thisPageItems = Mespaiements.slice(firstItemsIndex, lastItemsIndex)
    const pages = [];
    for (let i = 0; i < paymentlength / itemsPerPage; i++) {
        pages.push(i);
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
            <NavEtudiant></NavEtudiant>
            <div className='m-24 mb-0'>


                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative">
                                <select className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent">
                                    <option>Tous les paiements</option>
                                    <option>Paiements reçus</option>
                                    <option>Paiements envoyés</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </div>
                            </div>
                            <div className="relative">
                                <select className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent">
                                    <option>Tous les statuts</option>
                                    <option>Complété</option>
                                    <option>En attente</option>
                                    <option>Annulé</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <i className="fas fa-chevron-down text-xs"></i>
                                </div>
                            </div>
                        </div>
                        <div className="relative w-full md:w-auto">
                            <input
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full md:w-64 bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <i className="fas fa-search text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            {
                                Mespaiements.filter((item) => {
                                    if (search) {
                                        return search.toLowerCase() === ''
                                            ? item
                                            : item.prenom.toLowerCase().includes(search.toLowerCase());
                                    }
                                    return filterByLocation === 'All' ? item : item.location.includes(filterByLocation);
                                })
                                    .map((prof, index) => (


                                        <tbody className="bg-white divide-y divide-gray-200">
                                            <tr>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{prof.updated_at}</td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/women/42.jpg" alt="Student" />
                                                        <div className="ml-4">
                                                            <div className="text-sm font-medium text-gray-900">Cours de {prof.nom}</div>
                                                            <div className="text-sm text-gray-500">avec {prof.professeur} </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-green-600">{prof.tarifHoraire}€</div>
                                                    <div className="text-xs text-gray-500">1 heure</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {prof.status == 'approved' && (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Complété</span>
                                                    )}
                                                    {prof.status == 'pending' && (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Complété</span>
                                                    )}
                                                    {prof.status == 'refuser' && (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Complété</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    <button className="text-indigo-600 hover:text-indigo-900 mr-3"><i className="fas fa-receipt"></i></button>
                                                    <button className="text-gray-600 hover:text-gray-900"><i className="fas fa-ellipsis-v"></i></button>
                                                </td>
                                            </tr>
                                        </tbody>


                                    ))
                            }
                        </table>
                    </div>
                </div>
            </div>

        </>
    );

};




export default Mespaiements;
