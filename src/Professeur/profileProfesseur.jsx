import React, { useState } from "react";
import { getToken, API_URL, getUser } from "../utils/config";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/dashboardNav";

const profilesilePage = () => {
    const [profiles, setprofilesiles] = useState([]);
    const user = getUser();
    const token = getToken();

    useEffect(() => {
        const fetchprofilesesseurs = async () => {
            axios.get(`${API_URL}/Professeur/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    console.log(response.data.Profile);
                    setprofilesiles(response.data.Profile);

                })
        };
        fetchprofilesesseurs();
    }, [user.id])

    
      
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col lg:flex-row">
            <div className="hidden lg:flex">
                <DashboardNav />
            </div>
          <div className="p-4 lg:ml-4 flex-1">
            <div className="bg-white rounded-lg shadow-sm mb-8 p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Mon profil professeur</h1>
              <button className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition">
                <i className="fas fa-edit mr-2"></i>Modifier
              </button>
            </div>
      
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-400">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-red-100 text-red-500">
                    <i className="fas fa-users text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500 text-sm">Étudiants</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                </div>
              </div>
      
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-400">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-green-100 text-green-500">
                    <i className="fas fa-star text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500 text-sm">Notation</p>
                    <p className="text-2xl font-bold">{profiles.average_rating?.split(0, 3)}/5</p>
                  </div>
                </div>
              </div>
      
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-400">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-blue-100 text-blue-500">
                    <i className="fas fa-clock text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500 text-sm">Heures enseignées</p>
                    <p className="text-2xl font-bold">524h</p>
                  </div>
                </div>
              </div>
      
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-400">
                <div className="flex items-center">
                  <div className="p-3 rounded-full bg-yellow-100 text-yellow-500">
                    <i className="fas fa-euro-sign text-xl"></i>
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-500 text-sm">Tarif horaire</p>
                    <p className="text-2xl font-bold">{profiles.tarifHoraire}</p>
                  </div>
                </div>
              </div>
            </div>
      
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <div className="flex flex-col md:flex-row items-start">
                    <img
                      src={`http://127.0.0.1:8000/storage/${profiles.photo}`}
                      alt="Photo de profil"
                      className="w-32 h-32 rounded-full border-4 border-red-400 object-cover"
                    />
                    <div className="mt-4 md:mt-0 md:ml-6 flex-1">
                      <h2 className="text-3xl font-bold text-gray-800">{profiles.prenom}</h2>
                      <p className="text-gray-600 mt-1">{profiles.email}</p>
                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-gray-500 text-sm">Âge</p>
                          <p className="font-semibold">{profiles.age} ans</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Téléphone</p>
                          <p className="font-semibold">{profiles.telephone}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-sm">Localisation</p>
                          <p className="font-semibold">{profiles.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>
      
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Biographie</h3>
                    <p className="text-gray-600 leading-relaxed">{profiles.biographie}</p>
                  </div>
      
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Matières enseignées</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full">{profiles.nom_matiere}</span>
                    </div>
                  </div>
                </div>
              </div>
      
              <div className="lg:col-span-4">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Diplômes</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full">
                        <i className="fas fa-graduation-cap text-red-500"></i>
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">{profiles.diplomes}</p>
                      </div>
                    </div>
                  </div>
                </div>
      
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">Expériences</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="bg-red-100 p-2 rounded-full">
                        <i className="fas fa-briefcase text-red-500"></i>
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">{profiles.experiences}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
      
};

export default profilesilePage;
