import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import MyDocument from './pdf';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL, getToken, getUser } from '../utils/config';
import { useState, useEffect } from 'react';

function App() {
    const [Mespaiements, setMespaiements] = useState([]);
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
            setMespaiements(response.data.reservation);
            console.log('ccc', response.data.reservation);

            if (response) {
            }
            console.error(response.data.reservation.data);
        };
        fetchPayments(id)
    }, [id]);
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <h2>Générer un PDF </h2>
            <PDFDownloadLink
                document={<MyDocument data={Mespaiements} />}
                fileName="document-Payment.pdf"
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
