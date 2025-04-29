import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL, getToken } from '../utils/config';
import AdminNav from '../components/AdimNav';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';

const AdminPayments = () => {

    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const token = getToken();
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`${API_URL}/Reservation`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'aplication/json'
                    }
                });
                setPayments(response.data.reservation);
                console.log('eeeeeeeeeeeeee', response.data.reservation);
                setLoading(false);

            } catch (err) {
                setError('Échec du chargement des paiements');
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);



    const formatDate = (date) => new Date(date).toISOString().slice(0, 10);

    const filteredPayments = activeTab === 'all'
        ? payments
        : payments.filter(payment => payment.status === activeTab);

    const totalAmount = filteredPayments.reduce((sum, payment) => sum + parseFloat(payment.amount), 0);



    return (
        <div className='flex flex-col md:flex-row min-h-screen font-sans bg-gray-100'>
            <aside className="w-full md:w-64 bg-white shadow-lg z-10">
                <AdminNav id_={4} />
            </aside>
            {loading && <Spinner />}
            <div className=" flex-1 p-4 sm:p-6 overflow-aut">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Tableau des Paiements</h1>
                    <div className="bg-white rounded-lg shadow p-1">
                        <div className="flex space-x-1">
                            <button
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'all' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('all')}
                            >
                                Tous
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'success' ? 'bg-green-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('pending')}
                            >
                                pending
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'pending' ? 'bg-yellow-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('refuser')}
                            >
                                refuser
                            </button>
                            <button
                                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'failed' ? 'bg-red-500 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                                onClick={() => setActiveTab('approved')}
                            >
                                approved
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total des paiements</p>
                                <p className="text-lg font-semibold">{filteredPayments.length}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Montant total</p>
                                <p className="text-lg font-semibold">{totalAmount} MAD</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex items-center">
                            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Moyenne</p>
                                <p className="text-lg font-semibold">{(totalAmount / (filteredPayments.length || 1)).toFixed(2)} MAD</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Montant</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Méthode</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {filteredPayments.length > 0 ? (
                                    filteredPayments.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-medium">
                                                        {payment.etudiant.charAt(0)}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{payment.etudiant}</div>
                                                        <div className="text-sm text-gray-500">ID: #{payment.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-gray-900">{payment.amount} MAD</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center text-sm text-gray-500">
                                                    <svg className="w-5 h-5 mr-2 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                    </svg>
                                                    PayPal
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {payment.status === 'pending' && (
                                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                        pending
                                                    </span>
                                                )}
                                                {payment.status === 'approved' && (
                                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                                        approved
                                                    </span>
                                                )}
                                                {payment.status === 'refuser' && (
                                                    <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                        refuser
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {formatDate(payment.created_at)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => Navigate(`/pdfDociment/${payment.reservation_id}`)} className="text-blue-600 hover:text-blue-900 font-medium mr-2">
                                                    Détails
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                                            Aucun paiement trouvé pour ce filtre
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                        <div className="flex flex-1 justify-between sm:hidden">
                            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Précédent
                            </button>
                            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                Suivant
                            </button>
                        </div>
                        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Affichage de <span className="font-medium">1</span> à <span className="font-medium">{filteredPayments.length}</span> sur <span className="font-medium">{filteredPayments.length}</span> résultats
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Précédent</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-blue-100">
                                        1
                                    </button>
                                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Suivant</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default AdminPayments;