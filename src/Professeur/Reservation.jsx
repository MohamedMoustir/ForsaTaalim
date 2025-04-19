import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
    faChartPie,
    faBullhorn,
    faComments,
    faDollarSign,
    faCog,
    faArrowLeft,
    faArrowUp,
    faArrowDown,
    faUsers,
    faEnvelope,
    faChartBar,
    faDownload,
    faPlus,
    faBars,

} from '@fortawesome/free-solid-svg-icons';
import DashboardNav from '../components/dashboardNav';
import { Navigate, useNavigate } from 'react-router-dom';

import { API_URL, getToken, getUser } from '../utils/config';

const ReservationPage = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const navigate = useNavigate();
    const token = getToken();
    const user = getUser();

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`${API_URL}/professeur/Reservation`, {
                    headers: {
                        Authorization: `bearer ${token}`
                    }
                });
                console.log(response.data.reservation);

                setReservations(response.data.reservation);
                setLoading(false);

            } catch (err) {
                setError('Failed to fetch reservations');
                setLoading(false);
                console.error('Error fetching reservations:', err);
            }
        };

        fetchReservations();

    }, []);

    const handleStatusUpdate = async (id, status, email, user_id) => {
        try {
            const formData = new FormData();
            formData.append("_method", 'PUT');
            const response = await axios.post(`${API_URL}/Reservation/${status}/${id}`, formData, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
            handleSendEmail(status, email);
            HandleSendNotification(user_id, status);
            if (response.data) {
                setReservations(reservations.map(res =>
                    res.reservation_id === id ? { ...res, status: status } : res
                ));



            }

        } catch (err) {
            console.error('Error updating reservation status:', err);
            alert('Failed to update reservation status');
        }
    };
    useEffect(() => {
        const total = reservations
            .filter(r => r.status === 'approved')
            .reduce((sum, r) => {
                const amount = parseFloat(r.amount);
                const dura = parseInt(r.dura);
                if (isNaN(amount) || isNaN(dura)) return sum;
                return sum + amount * dura;
            }, 0);
        setTotalAmount(total);
    }, [reservations]);

    const getStatusColorClass = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-800';
            case 'refuser':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-yellow-100 text-yellow-800';
        }
    };

    const handleSendEmail = async (status, email) => {
        try {
            const EmailData = new FormData();
            EmailData.append('email', email);
            EmailData.append('status', status);

            const sendEmail = await axios.post(`${API_URL}/sendEmail`, EmailData, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });
        } catch (err) {
            setError('Failed to send email');
            setLoading(false);
            console.error('Error fetching reservations:', err);
        }

    }

    const HandleSendNotification = async (user_id, status) => {
        try {
            const response = await axios.post(`${API_URL}/notification`, {
                receiver_id: user_id,
                title: `Paiement ${status}`,
                content: `Le professeur ${user.prenom} a ${status === 'refuser' ? 'refuser' : 'accepté'} votre paiement. Merci de vérifier avec lui.`
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                alert('Message envoyé avec succès');
            }
        } catch (error) {
            console.error('Erreur lors de l\'envoi de la notification:', error);
            alert("Échec de l'envoi de la notification");
        }
    };

    const handleChat = (id_user, chat_user_id) => {
        navigate(`/chat/${id_user}/room/${chat_user_id}`);
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            </div>
        );
    }



    return (
        <div className='flex'>

            <div className="hidden lg:flex">
                <DashboardNav />
            </div>


            <div className="bg-neutral-50 min-h-screen py-10 px-4 w-full">
                <div className="w-full mx-auto space-y-8">



                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-200">
                            <div className="flex items-center space-x-2 mb-2 text-gray-500 text-sm uppercase">
                                <FontAwesomeIcon icon={faChartBar} />
                                <span>Total Reservations</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-800">{reservations.length}</p>
                        </div>
                        <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-200">
                            <div className="flex items-center space-x-2 mb-2 text-gray-500 text-sm uppercase">
                                <FontAwesomeIcon icon={faDollarSign} />
                                <span>Approved Payments</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-800">
                                {reservations.filter(r => r.status === 'approved').length}
                            </p>
                        </div>
                        <div className="bg-white shadow-sm rounded-xl p-6 border border-slate-200">
                            <div className="flex items-center space-x-2 mb-2 text-gray-500 text-sm uppercase">
                                <FontAwesomeIcon icon={faEnvelope} />
                                <span>Total Amount</span>
                            </div>
                            <p className="text-3xl font-bold text-gray-800">
                                {totalAmount} DH
                            </p>
                        </div>
                    </div>



                    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                        <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                            <h1 className="text-xl font-semibold text-slate-800">Student Reservations</h1>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm divide-y divide-slate-200">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {['ID', 'Student', 'date', 'time', 'Payment', 'Amount', 'Status', 'Actions'].map(header => (
                                            <th key={header} className="px-6 py-3 text-left font-medium text-slate-500 uppercase tracking-wide">{header}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-slate-100">
                                    {reservations.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-4 text-center text-gray-400">No reservations found</td>
                                        </tr>
                                    ) : (
                                        reservations.map((res) => (
                                            <tr key={res.id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4">{res.id}</td>
                                                <td className="px-6 py-4 text-slate-700">{res.etudiant}</td>
                                                <td className="px-6 py-4 text-slate-700">
                                                    {new Date(res.date_reservation).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: '2-digit',
                                                    })}
                                                </td>
                                                <td className="px-6 py-4 text-slate-700">
                                                    {new Date(`1970-01-01T${res.time_reservation}`).toLocaleTimeString('en-US', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                        hour12: true,
                                                    })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="space-y-0.5">
                                                        <div className="text-xs text-slate-500">{res.payment_status}</div>
                                                        <div className="text-xs text-slate-400">ID: {res.payment_id?.substring(0, 10)}...</div>
                                                    </div>

                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className="px-2 py-1 inline-flex text-xs font-medium rounded-full ">
                                                        {res.amount} DH
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 inline-flex text-xs font-medium rounded-full ${getStatusColorClass(res.status)}`}>
                                                        {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-2">
                                                        <button
                                                            onClick={() => handleStatusUpdate(res.reservation_id, 'approved', res.payer_email, res.user_id)}
                                                            disabled={res.status === 'approved'}
                                                            className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium ${res.status === 'approved'
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                : 'bg-emerald-600 text-white hover:bg-emerald-700'
                                                                }`}
                                                        >
                                                            <div size={14} className="mr-1" /> Approve
                                                        </button>
                                                        <button
                                                            onClick={() => handleStatusUpdate(res.reservation_id, 'refuser', res.payer_email, res.user_id)}
                                                            disabled={res.status === 'refuser'}
                                                            className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium ${res.status === 'refuser'
                                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                                : 'bg-red-500 text-white hover:bg-red-600'
                                                                }`}
                                                        >
                                                            <div size={14} className="mr-1" /> Refuse
                                                        </button>
                                                        <button onClick={() => handleChat(res.user_id, res.chat_user_id)} className='inline-flex items-center px-3 py-1.5 rounded text-xs font-medium'>
                                                            <FontAwesomeIcon icon={faComments} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );



};

export default ReservationPage;