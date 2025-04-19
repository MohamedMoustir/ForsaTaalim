import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './pdf';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, getToken, getUser } from '../utils/config';
import { useState, useEffect } from 'react';

function App() {
    const [payment_By_id, setpayment_By_id] = useState([]);
    const token = getToken();
    const user = getUser();
    const { id } = useParams();
    useEffect(() => {
        const fetchPayments = async (id) => {
            const response = await axios.get(`${API_URL}/Reservation/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setpayment_By_id(response.data.reservation);
            console.log('ccc', response.data.reservation);

            if (response) {
            }
            console.error(response.data.reservation.data);
        };
        fetchPayments(id)
    }, [id]);
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
                <h1 class="text-2xl font-bold text-center mb-2">FORSATAALIM</h1>
                <p class="text-center text-gray-600 mb-6">Facture #INV-2025-{payment_By_id[0]?.id}</p>

                <div class="mb-6">
                    <h2 class="font-semibold text-gray-700 mb-2">Facturé à :</h2>
                    <p>Nom du professeur : {payment_By_id[0]?.professeur}</p>
                    <p>Email de l'étudiant : {payment_By_id[0]?.payer_email}</p>
                    <p>Date réservation : {payment_By_id[0]?.date_reservation}</p>
                </div>

                <div class="mb-6">
                    <h2 class="font-semibold text-gray-700 mb-2">Détails du service</h2>
                    <div class="flex justify-between border-b py-1">
                        <span>Durée</span>
                        <span>{payment_By_id[0]?.dura.split(":")[0]}h</span>
                    </div>
                    <div class="flex justify-between border-b py-1">
                        <span>Statut du paiement</span>
                        <span>{payment_By_id[0]?.payment_By_id_status}</span>
                    </div>
                </div>

                <div>
                    <h2 class="font-semibold text-gray-700 mb-2">Résumé</h2>
                    <div class="flex justify-between border-b py-1">
                        <span>Montant :</span>
                        <span>
                            {
                                (parseFloat(payment_By_id[0]?.amount) * parseFloat(payment_By_id[0]?.dura?.split(":")[0] || 0)).toFixed(2)
                            } {payment_By_id[0]?.currencym}
                        </span>
                    </div>
                    <div class="flex justify-between py-1">
                        <span>Status de réservation :</span>
                        <span>{payment_By_id[0]?.status}</span>
                    </div>
                </div>
            </div>
            <h2 >Générer un PDF</h2>
            <PDFDownloadLink
                document={<MyDocument payment_By_id={payment_By_id} />}
                fileName="document-payment.pdf"
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#1976D2',
                    color: '#fff',
                    borderRadius: 5,
                    textDecoration: 'none',
                }}
            >
                {({ loading }) => (loading ? 'Chargement du PDF...' : 'Télécharger le PDF')}
            </PDFDownloadLink>
        </div>
    );
}

export default App;
