import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MainLayout from '../components/MainLayout.jsX';
import Disponibilites from "../Professeur/Disponibilites"
import axios from 'axios';
import { API_URL, getToken, getUser } from '../utils/config';

function ReservationTutors() {

    const [menuOpen, setMenuOpen] = useState(false);
    const [detile, setDetilesprofiles] = useState([]);
    const token = getToken();
    const user = getUser();
    const { id } = useParams()
    const [loading, setLoading] = useState(true);


    const fetchProfesseurs = async (tutor_id) => {
        axios.get(`${API_URL}/Professeur/${tutor_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setDetilesprofiles(response.data.Profile);
                setLoading(false)
            })
    };
    useEffect(() => {
        fetchProfesseurs(id)
    }, [id])

    return (
        <>
            {loading && (
                <Spinner />
            )}
            <MainLayout ></MainLayout>
            <div className="min-h-screen w-[70%] relative left-[15%]">

                <div className="flex items-center mb-6">
                    <button className="text-gray-600 hover:text-red-500 transition-colors">
                        <div className="h-5 w-5" />
                    </button>
                    <div className="mx-auto text-center">
                        <span className="text-sm text-gray-500"></span>
                    </div>
                </div>

                <h2 className="text-xl font-bold mb-6">Schedule Your First Session</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <div className="md:col-span-1 flex flex-col items-center">
                        <div className="w-24 h-24 mb-3">
                            <img
                                src={`http://127.0.0.1:8000/storage/${detile.photo}`}
                                alt={detile.prenom}
                                className="w-full h-full rounded-full object-cover border-2 border-red-100"
                            />
                        </div>
                        <h3 className="font-bold text-lg mb-1">{detile.prenom}</h3>
                        <div className="flex items-center text-sm mb-2">
                            <div className="flex text-yellow-400">

                            </div>
                            <span className="ml-1">{detile.total_ratings} ({detile.total_ratings} reviews)</span>
                        </div>
                        <div className="text-sm text-gray-500 mb-2">{detile.nom_matiere} Tutor</div>
                        <div className="inline-flex items-center bg-red-100 rounded-full px-3 py-1 mb-4">
                            <span className="text-red-500 font-medium">${detile.tarifHoraire}</span>
                            <span className="text-gray-500 text-xs ml-1">/ hour</span>
                        </div>

                        <div className="w-full space-y-3 mt-3">
                            <div className="flex items-center text-gray-600 text-sm">
                                <div className="w-5 h-5 mr-2" />
                                <span>Fast responses (2h avg)</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                                <div className="w-5 h-5 mr-2" />
                                <span>Taught 50+ students</span>
                            </div>
                            <div className="flex items-center text-gray-600 text-sm">
                                <div className="w-5 h-5 mr-2 text-green-500" />
                                <span>Verified credentials</span>
                            </div>
                        </div>



                    </div>

                    <div className="md:col-span-2 h-42">
                        <Disponibilites title="Accueil" amount={detile.tarifHoraire}></Disponibilites>


                    </div>
                </div>
            </div>
        </>
    )
}

export default ReservationTutors;