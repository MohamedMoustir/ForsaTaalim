import React, { useEffect, useRef, useState } from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import { useNavigate } from "react-router-dom";
const NavEtudiant =  ()=>{
    const navigate = useNavigate()


function PgeHome() {
    navigate('/')
}
function Mespaiements() {
    navigate('/Mespaiements')
}
function profile() {
    navigate('/profile')
}
// function MesMessages(){
//     navigate('/chat')
// }
return (
    <>
          <nav className="bg-black py-3">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="text-white space-x-8">
                            <a href="#" className=" cursor-pointer text-gray-300 hover:text-white transition-colors">
                                Tableau de bord
                            </a>
                            <a onClick={MesMessages}  className="cursor-pointer  text-gray-300 hover:text-white transition-colors">
                                Mes Messages
                            </a>
                            <a onClick={PgeHome} className="cursor-pointer text-gray-300 hover:text-white transition-colors">
                                Home
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="border-b bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8 py-4">
                        <a onClick={profile}  className="text-black font-medium border-b-2 border-red-400 pb-1">
                            Mon Profil
                        </a>
                        <a onClick={Mespaiements} className="text-gray-500 cursor-pointer hover:text-black transition-colors">
                            Mes paiements
                        </a>
                    </div>
                </div>
            </div>
    </>
)
}
export default NavEtudiant;