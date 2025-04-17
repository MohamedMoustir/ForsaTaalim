import React from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
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
  faDownload,
  faPlus,
  faBars,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import ReservationTutors from "../pages/reservation";


const DashboardNav = () => {
  const navigate = useNavigate();
  function handleDisponibilites() {
    navigate(`/disponibilites/${parsedToken.id}`);
  }
  function handledashboard_tuteur() {
    navigate(`/dashboard-tuteur`);
  }
  function ReservationEtudiant() {
    navigate('/dashboard-tuteur/reservation')
  }
  function Annoncement(){
    navigate('/dashboard-annonce');
  } 
 
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
              <a onClick={handledashboard_tuteur} className="cursor-pointer bg-slate-800 flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800">
                <FontAwesomeIcon icon={faChartPie} className="h-5 w-5 mr-3" />
                Dashboard
              </a>
              <a onClick={handleDisponibilites} className="cursor-pointer  flex items-center px-4 py-3 text-sm rounded-md">
                <FontAwesomeIcon icon={faBullhorn} className="h-5 w-5 mr-3 text-red-400" />
                Disponibilites
              </a>
              <a onClick={ReservationEtudiant} className="cursor-pointer  flex items-center px-4 py-3 text-sm rounded-md">
                <FontAwesomeIcon icon={faDollarSign} className="h-5 w-5 mr-3" />
                Reservation
              </a>
              <a href="#" className="cursor-pointer flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800">
                <FontAwesomeIcon icon={faComments} className="h-5 w-5 mr-3" />
                Communication
              </a>
              <a onClick={Annoncement} className="cursor-pointer flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800">
                <FontAwesomeIcon icon={faDollarSign} className="h-5 w-5 mr-3" />
                Annoncement
              </a>
              <a href="#" className="cursor-pointer flex items-center px-4 py-3 text-sm rounded-md hover:bg-slate-800">
                <FontAwesomeIcon icon={faCog} className="h-5 w-5 mr-3" />
                logOut
              </a>
            </nav>
          </div>
          
          <div className="p-4 border-t border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={`http://127.0.0.1:8000/storage/${parsedToken.photo}`}
                alt="User"
                className="h-8 w-8 rounded-full mr-3"
              />
              <div>
                <p className="text-xs text-gray-400">Hi, {parsedToken.prenom}</p>
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