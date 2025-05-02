import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import NavEtudiant from "../components/NavEtudiant"
import Spinner from '../components/Spinner';
import { API_URL, getToken, getUser } from '../utils/config';
import {
    faComments ,
    faReceipt,
    faTimes,
    faChevronDown ,
    faSearch ,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DonePayment from "./DonePayment"
const Mespaiements = () => {
    const token = getToken();
    const user = getUser();
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const [Mespaiements, setMespaiements] = useState([]);
    const [isUserAuth, setUserAuth] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(3);
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
        console.log('ccc', response.data.reservation.data.length);

        if (response) {
            setLoading(false);
        }
        console.log(response.data.reservation.data);
    };

    const navigate = useNavigate();
  
    useEffect(() => {
        fetchPayments(currentPage);
    }, [currentPage]);


    const handleDelete = async (id) => {
        try {
            const formData = new FormData();
            formData.append("_method", 'Delete');
            const response = await axios.post(`${API_URL}/Reservation/${id}`, formData, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            const data = response.data.reservation.data;
            if (response.data) {
                await fetchPayments(currentPage);

            }

        } catch (err) {
            console.error('Error updating reservation status:', err);
            alert('Failed to remove reservation status');
        }
    };

    const lastItemsIndex = currentPage * itemsPerPage;
    const firstItemsIndex = lastItemsIndex - itemsPerPage
    const thisPageItems = Mespaiements.slice(firstItemsIndex, lastItemsIndex)
    const pages = [];
    
    for (let i = 0; i < paymentlength / itemsPerPage; i++) {
        pages.push(i);
    }


    const handleChat = (id_user, chat_user_id) => {
        navigate(`/chat/${id_user}/room/${chat_user_id}`);
    }
    
    return (
        <>
            {loading && <Spinner />}
            
            <NavEtudiant id_={4} />
            
            <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-6 md:py-8 max-w-full">
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 md:p-6 mb-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 md:items-center md:justify-between">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative w-full sm:w-auto">
                                <select className="appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 md:py-3 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent">
                                    <option>Tous les paiements</option>
                                    <option>Paiements reçus</option>
                                    <option>Paiements envoyés</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                                </div>
                            </div>
                            
                            <div className="relative w-full sm:w-auto">
                                <select className="appearance-none w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 md:py-3 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent">
                                    <option>Tous les statuts</option>
                                    <option>Complété</option>
                                    <option>En attente</option>
                                    <option>Annulé</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                    <FontAwesomeIcon icon={faChevronDown} className="text-xs" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="relative w-full md:w-64">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                type="text"
                                placeholder="Rechercher..."
                                className="w-full bg-gray-50 border border-gray-300 text-gray-700 py-2 md:py-3 px-4 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden mb-6">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {Mespaiements
                                    .filter(item => {
                                        return search.toLowerCase() === '' ||
                                            item.professeur.toLowerCase().includes(search.toLowerCase());
                                    })
                                    .map((prof, index) => (
                                        <tr key={index}>
                                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {prof.updated_at}
                                            </td>
                                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
                                                        <img 
                                                            className="h-full w-full rounded-full object-cover" 
                                                            src={`http://127.0.0.1:8000/storage/${prof?.photo}`} 
                                                            alt="Instructor" 
                                                        />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">Cours de {prof.nom}</div>
                                                        <div className="text-sm text-gray-500">avec {prof.professeur}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-green-600">{prof.tarifHoraire}€</div>
                                                <div className="text-xs text-gray-500">1 heure</div>
                                            </td>
                                            <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                                                {prof.status === 'approved' && (
                                                    <span className="px-2 md:px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                                                        Complété
                                                    </span>
                                                )}
                                                {prof.status === 'pending' && (
                                                    <span className="px-2 md:px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        En attente
                                                    </span>
                                                )}
                                                {prof.status === 'refuser' && (
                                                    <span className="px-2 md:px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                                                        Refusé
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm">
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <button 
                                                        onClick={() => navigate(`/pdfDociment/${prof.reservation_id}`)} 
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                        aria-label="View receipt"
                                                    >
                                                        <FontAwesomeIcon icon={faReceipt} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDelete(prof.reservation_id)} 
                                                        className="text-red-400 hover:text-red-600"
                                                        aria-label="Delete"
                                                    >
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleChat(prof.user_id, prof.chat_user_id)}
                                                        className="inline-flex items-center px-2 md:px-4 py-1 md:py-1.5 rounded text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                                                    >
                                                        <FontAwesomeIcon icon={faComments} className="mr-1 md:mr-2" /> 
                                                        <span className="hidden sm:inline">Chat</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <nav aria-label="Pagination" className="mt-6 md:mt-12">
                    <ul className="flex items-center justify-center flex-wrap gap-1">
                        <li>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                                disabled={currentPage === 1}
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                            </button>
                        </li>

                        {pages.map((pageIndex) => (
                            <li key={pageIndex}>
                                <button
                                    onClick={() => setCurrentPage(pageIndex + 1)}
                                    className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 leading-tight border border-gray-300 ${
                                        currentPage === pageIndex + 1
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
                                className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                                disabled={currentPage === pages.length}
                            >
                                <span className="sr-only">Next</span>
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4L1 1" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
    

};




export default Mespaiements;
