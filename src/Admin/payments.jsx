import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPayments = () => {
  // const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('/api/admin/payments');
        // setPayments(response.data.data);
      } catch (err) {
        setError('Échec du chargement des paiements');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);
  
  const payments = [
    {
      id: 1,
      user: { name: 'Ahmed El Amine' },
      amount: 200,
      method: 'Carte bancaire',
      status: 'success',
      created_at: '2025-04-25T14:32:00',
    },
    {
      id: 2,
      user: { name: 'Samira Bouzidi' },
      amount: 150,
      method: 'PayPal',
      status: 'pending',
      created_at: '2025-04-24T09:15:00',
    },
    {
      id: 3,
      user: { name: 'Yassine Kabbaj' },
      amount: 350,
      method: 'Virement bancaire',
      status: 'success',
      created_at: '2025-04-22T12:50:00',
    },
    {
      id: 4,
      user: { name: 'Leila Ouarzazi' },
      amount: 120,
      method: 'Carte bancaire',
      status: 'failed',
      created_at: '2025-04-21T16:30:00',
    },
    {
      id: 5,
      user: { name: 'Mouhamed Fares' },
      amount: 500,
      method: 'PayPal',
      status: 'success',
      created_at: '2025-04-20T11:20:00',
    },
    {
      id: 6,
      user: { name: 'Meryem Zaidi' },
      amount: 90,
      method: 'Virement bancaire',
      status: 'pending',
      created_at: '2025-04-19T08:10:00',
    },
    
  ];

  const formatDate = (date) => new Date(date).toISOString().slice(0, 10);

  const filteredPayments = activeTab === 'all' 
    ? payments 
    : payments.filter(payment => payment.status === activeTab);
    
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded shadow">
        <p className="font-bold">Erreur</p>
        <p>{error}</p>
      </div>
    );
  }

};

export default AdminPayments;