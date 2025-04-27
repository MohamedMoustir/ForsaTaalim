import React, { useEffect, useRef, useState } from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import { useNavigate } from "react-router-dom";
const NavEtudiant = ({ id_ }) => {
    const navigate = useNavigate()

    return (
        <>
            <nav className="bg-black py-3 shadow-md" style={{ fontFamily: 'Open Sans' }}>
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="flex space-x-6">
                            <a
                                id="1"
                                className={`text-gray-500 font-medium ${id_ == 1 ? 'text-black font-semibold border-b-2 border-red-500 pb-1 hover:text-red-500 transition-all duration-200' : ''} cursor-pointer hover:text-red-500 transition-colors`}
                            >
                                Tableau de bord
                            </a>
                            <a
                                id="3"
                                onClick={() => navigate('/Chat/1/room/1')}
                                className={`text-gray-500 font-medium ${id_ == 3 ? 'text-black font-semibold border-b-2 border-red-500 pb-1 hover:text-red-500 transition-all duration-200' : ''} cursor-pointer hover:text-red-500 transition-colors`}
                            >
                                Mes Messages
                            </a>
                            <a
                                onClick={()=> navigate('/')}
                                className="cursor-pointer text-gray-300 hover:text-white text-sm font-medium transition-colors"
                            >
                                Home
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="border-b bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8 py-4">
                        <a
                            id="5"
                            onClick={() => navigate('/profile')}
                            className={`text-gray-500 font-medium ${id_ == 5 ? 'text-black font-semibold border-b-2 border-red-500 pb-1 hover:text-red-500 transition-all duration-200' : ''} cursor-pointer hover:text-red-500 transition-colors`}
                        >
                            Mon Profil
                        </a>
                        <a
                            id="4"
                            onClick={(e) => { navigate('/Mespaiements') }}
                            className={`text-gray-500 font-medium ${id_ == 4 ? 'text-black font-semibold border-b-2 border-red-500 pb-1 hover:text-red-500 transition-all duration-200' : ''} cursor-pointer hover:text-red-500 transition-colors`}
                        >
                            Mes paiements
                        </a>
                    </div>
                </div>
            </div>
        </>
    );

}
export default NavEtudiant;