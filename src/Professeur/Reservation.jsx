import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import {
  faVideo ,
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
  faTimes,
  faCheck,
  faCalendarAlt,

} from '@fortawesome/free-solid-svg-icons';
import DashboardNav from '../components/dashboardNav';
import { Navigate, useNavigate } from 'react-router-dom';

import { API_URL, getToken, getUser } from '../utils/config';
import Spinner from '../components/Spinner';

const ReservationPage = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(null);
  const navigate = useNavigate();
  const token = getToken();
  const user = getUser();
  const [showModal, setShowModal] = useState(false);
  const [user__id, setUserId] = useState(null);


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
      console.log(status, email);


      HandleSendNotification(user_id, status);

      if (response.data) {
        setReservations(reservations.map(res =>
          res.reservation_id === id ? { ...res, status: status } : res
        ));
        if (status === 'approved') {
          setUserId(id);
          setShowModal(true)
          handleSendEmail(status, email, id);
        }

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

  const handleSendEmail = (status, email, id__) => {
    try {
      const EmailData = new FormData();
      EmailData.append('email', email);
      EmailData.append('status', status);
      EmailData.append('id', id__);

      setTimeout(() => {
        const sendEmail = axios.post(`${API_URL}/sendEmail`, EmailData, {
          headers: {
            Authorization: `bearer ${token}`
          }
        });
      }, 2000);


    } catch (err) {
      setError('Failed to send email');
      setLoading(false);
      console.error('Error fetching reservations:', err);
    }

  }

  const HandleSendNotification = async (user_id, status) => {
    try {
      console.log('ee', user_id);

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
        setLoading(false)
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

  const handleGenerateSession = async () => {

    if (user__id) {
      const formData = new FormData();
      formData.append("_method", 'PUT');
      const response = await axios.post(`${API_URL}/Reservation/session/${user__id}`, formData, {
        headers: {
          Authorization: `bearer ${token}`
        }
      });
      if (response.data) {
        setShowModal(false)
        alert('Session created and email sent successfully!');
      }
    }
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
    <div className="flex" style={{ fontFamily: 'Open Sans' }}>
      {loading && <Spinner />}
      <div className="hidden lg:flex">
        <DashboardNav id_={3} />
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-xl font-bold mb-4">Generate Session</h2>
            <p className="mb-6">Are you sure you want to generate a session and notify by email?</p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>

              <button
                onClick={handleGenerateSession}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Generate Session
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 bg-gray-50 min-h-screen py-10 px-4 md:px-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200 transition-all hover:shadow-lg">
              <div className="flex items-center space-x-3 mb-3 text-gray-500 text-sm font-medium uppercase">
                <FontAwesomeIcon icon={faChartBar} className="text-blue-500" />
                <span>Réservations Totales</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{reservations.length}</p>
              <div className="mt-2 text-sm text-gray-500">Toutes les réservations</div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200 transition-all hover:shadow-lg">
              <div className="flex items-center space-x-3 mb-3 text-gray-500 text-sm font-medium uppercase">
                <FontAwesomeIcon icon={faDollarSign} className="text-green-500" />
                <span>Paiments Approuvés</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">
                {reservations.filter(r => r.status === 'approved').length}
              </p>
              <div className="mt-2 text-sm text-gray-500">Réservations confirmées</div>
            </div>

            <div className="bg-white shadow-md rounded-xl p-6 border border-slate-200 transition-all hover:shadow-lg">
              <div className="flex items-center space-x-3 mb-3 text-gray-500 text-sm font-medium uppercase">
                <FontAwesomeIcon icon={faEnvelope} className="text-purple-500" />
                <span>Montant Total</span>
              </div>
              <p className="text-3xl font-bold text-gray-800">{totalAmount}DH</p>
              <div className="mt-2 text-sm text-gray-500">Revenus totaux</div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-md overflow-hidden">
            <div className="bg-gradient-to-r from-red-400 to-red-500 px-6 py-4">
              <h1 className="text-xl font-semibold text-white">Réservations des Étudiants</h1>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    {['ID', 'Étudiant', 'Date', 'Heure', 'Paiement', 'Montant', 'Statut', 'Actions'].map(header => (
                      <th key={header} className="px-6 py-3 text-left font-medium text-slate-600 uppercase tracking-wider">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-100">
                  {reservations.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center justify-center space-y-3">
                          <FontAwesomeIcon icon={faCalendarAlt} className="text-gray-300 text-4xl" />
                          <p className="text-gray-400 font-medium">Aucune réservation trouvée</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    reservations.map((res) => (
                      <tr key={res.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 font-medium">{res.id}</td>
                        <td className="px-6 py-4 text-slate-700 font-medium">{res.etudiant}</td>
                        <td className="px-6 py-4 text-slate-700">
                          {new Date(res.date_reservation).toLocaleDateString('fr-FR', {
                            year: 'numeric',
                            month: 'short',
                            day: '2-digit',
                          })}
                        </td>
                        <td className="px-6 py-4 text-slate-700">
                          {new Date(`1970-01-01T${res.time_reservation}`).toLocaleTimeString('fr-FR', {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="text-xs font-medium text-slate-700">{res.payment_status}</div>
                            <div className="text-xs text-slate-500">ID: {res.payment_id?.substring(0, 10)}...</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 inline-flex text-sm font-medium bg-blue-50 text-blue-700 rounded-full">
                            {res.amount} DH
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 inline-flex text-xs font-medium rounded-full ${res.status === 'approved'
                            ? 'bg-green-100 text-green-700'
                            : res.status === 'refuser'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                            }`}>
                            {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            {res.status === 'approved' ? (
                              <a
                                href={`http://localhost:3000/VideoCall/${res.session_link}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors"
                              >
                                <FontAwesomeIcon icon={faVideo} className="mr-1" /> Session
                              </a>
                            ) : (
                              <button
                                onClick={() => handleStatusUpdate(res.reservation_id, 'approved', res.email, res.user_id)}
                                disabled={res.status === 'approved'}
                                className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium transition-colors ${res.status === 'approved'
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                  : 'bg-green-600 text-white hover:bg-green-700'
                                  }`}
                              >
                                <FontAwesomeIcon icon={faCheck} className="mr-1" /> Approuver
                              </button>
                            )}

                            <button
                              onClick={() => handleStatusUpdate(res.reservation_id, 'refuser', res.email, res.user_id)}
                              disabled={res.status === 'refuser'}
                              className={`inline-flex items-center px-3 py-1.5 rounded text-xs font-medium transition-colors ${res.status === 'refuser'
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-red-500 text-white hover:bg-red-600'
                                }`}
                            >
                              <FontAwesomeIcon icon={faTimes} className="mr-1" /> Refuser
                            </button>

                            <button
                              onClick={() => handleChat(res.user_id, res.chat_user_id)}
                              className="inline-flex items-center px-3 py-1.5 rounded text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                            >
                              <FontAwesomeIcon icon={faComments} className="mr-1" /> Chat
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