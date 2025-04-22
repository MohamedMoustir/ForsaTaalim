import React, { useEffect, useState } from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
faChartPie,
faBullhorn,
faComments,
faDollarSign,
faSignOutAlt,
faCalendarCheck,
faBars,
faTimes,
faClipboardList
} from '@fortawesome/free-solid-svg-icons';
import ReservationTutors from "../pages/reservation";
import { API_URL, getToken, getUser } from '../utils/config';

const DashboardNav = ({id_}) => {

  const token = getToken();
  const user = getUser();
  const navigate = useNavigate();

useEffect(()=>{
  if (user) {
    if (user.role == 'etudiant') {
     navigate('/login'); 
  }  
  }
  
},[])
  return (
    <>
      <div className="w-64 bg-slate-900 text-white flex flex-col">

        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <h1 className="font-bold text-lg">ForsaTaalim</h1>
          <button className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faTimes} className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="px-2 space-y-1">
            <a id="1" onClick={(e) => { navigate('/dashboard-tuteur'); setid(e.target.id) }} className={`cursor-pointer ${id_ == 1 ? 'text-red-400':''}  flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800`}>
              <FontAwesomeIcon icon={faChartPie} className={`h-5 w-5 mr-3 ${id_ == 1 ? 'text-red-400':''}`} />
              Dashboard
            </a>
            <a id="2" onClick={(e) => { navigate(`/disponibilites/${user.id}`); setid(e.target.id) }} className={`cursor-pointer ${id_ == 2 ? 'text-red-400':''}  flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800`}>
              <FontAwesomeIcon icon={faCalendarCheck} className={`h-5 w-5 mr-3 ${id_ == 2 ? 'text-red-400':''}`} />
              Disponibilites
            </a>
            <a id="3" onClick={(e) => { navigate('/dashboard-tuteur/reservation'); setid(e.target.id) }} className={`cursor-pointer ${id_ == 3 ? 'text-red-400':''}  flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800`}>
              <FontAwesomeIcon icon={faClipboardList} className={`h-5 w-5 mr-3 ${id_ == 3 ? 'text-red-400':''}`} />
              Reservation
            </a>
            <a id="4" onClick={(e) => { navigate(`/Chat/null/room/null`); setid(e.target.id) }}  className={`cursor-pointer ${id_ == 4 ? 'text-red-400':''}  flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800`}>
              <FontAwesomeIcon icon={faComments} className={`h-5 w-5 mr-3 ${id_ == 4 ? 'text-red-400':''}`} />
              Communication
            </a>
            <a id="5" onClick={(e) => { navigate('/dashboard-annonce'); setid(e.target.id) }} className={`cursor-pointer ${id_ == 5 ? 'text-red-400':''}  flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800`}>
              <FontAwesomeIcon icon={faBullhorn} className={`h-5 w-5 mr-3 ${id_ == 5 ? 'text-red-400':''}`} />
              Annoncement
            </a>
            <a id="5" onClick={(e) => { navigate('/logout'); setid(e.target.id) }} className={`cursor-pointer ${id_ == 5 ? 'text-red-400':''}  flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800`}>
              <FontAwesomeIcon icon={faSignOutAlt} className={`h-5 w-5 mr-3 ${id_ == 6 ? 'text-red-400':''}`} />
              log Out
            </a>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <img onClick={() => navigate('/profilePage')}
              src={`http://127.0.0.1:8000/storage/${user.photo}`}
              alt="User"
              className="h-8 w-8 rounded-full mr-3 cursor-pointer"
            />
            <div>
              <p className="text-xs text-gray-400">Hi, {user.prenom}</p>
            </div>
          </div>
          <button className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faBars} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </>
  );
};



export default DashboardNav;