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
        const response = await axios.get('');
        // setPayments(response.data.data);
      } catch (err) {
        setError('Échec du chargement des paiements');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);
  

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
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