import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Pdf from './pdf';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, getToken, getUser } from '../utils/config';
import { useState, useEffect } from 'react';
import { Nav } from '../components/Nav';
import Spinner from '../components/Spinner';

function PdfDociment() {


    const [payment_By_id, setpayment_By_id] = useState([]);
    const token = getToken();
    const user = getUser();
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchPayments = async (id) => {
            const response = await axios.get(`${API_URL}/Reservation/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            setpayment_By_id(response.data.reservation);
            console.log('dd', response.data.reservation);

            if (response) {
                setLoading(false)
            }
            console.error(response);
        };
        fetchPayments(id)
    }, []);

    return (
        <>
            {loading && (
                <Spinner />
            )}

            <Nav></Nav>
            <div className="py-8 px-4 text-center border">

                <div className="max-w-7xl mx-auto p-6 bg-white shadow-md rounded-md">
                    <button
                        className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-red-50"
                        aria-label="Go back"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            strokeWidth="2"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span onClick={() => navigate(-1)} className="hidden sm:inline">Back</span>
                    </button>
                    <h1 className="text-2xl font-bold mb-2">FORSATAALIM</h1>
                    <p className="text-gray-600 mb-6">
                        Facture #INV-2025-{payment_By_id[0]?.id}
                    </p>

                    <div className="mb-6 text-left">
                        <h2 className="font-semibold text-gray-700 mb-2">Facturé à :</h2>
                        <p>Nom du professeur : {payment_By_id[0]?.professeur}</p>
                        <p>Email de l'étudiant : {payment_By_id[0]?.payer_email}</p>
                        <p>Date réservation : {payment_By_id[0]?.date_reservation}</p>
                    </div>

                    <div className="mb-6 text-left">
                        <h2 className="font-semibold text-gray-700 mb-2">Détails du service</h2>
                        <div className="flex justify-between border-b py-1">
                            <span>Durée</span>
                            <span>{payment_By_id[0]?.dura.split(":")[0]}h</span>
                        </div>
                        <div className="flex justify-between border-b py-1">
                            <span>Statut du paiement</span>
                            <span>{payment_By_id[0]?.payment_status}</span>
                        </div>
                    </div>

                    <div className="text-left">
                        <h2 className="font-semibold text-gray-700 mb-2">Résumé</h2>
                        <div className="flex justify-between border-b py-1">
                            <span>Montant :</span>
                            <span>
                                {(parseFloat(payment_By_id[0]?.amount) *
                                    parseFloat(payment_By_id[0]?.dura?.split(":")[0] || 0)).toFixed(2)}{" "}
                                {payment_By_id[0]?.currencym}
                            </span>
                        </div>
                        <div className="flex justify-between py-1">
                            <span>Status de réservation :</span>
                            <span>{payment_By_id[0]?.status}</span>
                        </div>
                    </div>
                </div>
                <h2 className="text-xl font-semibold my-6">Générer un PDF</h2>

                <PDFDownloadLink
                    document={<Pdf payment={payment_By_id} />}
                    fileName="document-payment.pdf"
                    className="inline-block px-5 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition"
                >
                    {({ loading }) => (loading ? "Chargement du PDF..." : "Télécharger le PDF")}
                </PDFDownloadLink>
            </div>
        </>
    );
}

export default PdfDociment;
