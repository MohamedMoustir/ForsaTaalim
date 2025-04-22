import React, { useState } from "react";
import { getToken, API_URL, getUser } from "../utils/config";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNav from "../components/dashboardNav";
import Spinner from "../components/Spinner";

const profilesilePage = () => {
    const [profiles, setprofilesiles] = useState([]);
    const user = getUser();
    const token = getToken();
    const [isopen, setIsopen] = useState(false);
    const [image, setImage] = useState('');
    const [email, setEmail] = useState('');
    const [prenom, setPrenom] = useState('');
    const [telephone, setTelephone] = useState('');
    const [age, setAge] = useState('');
    const [location, setLocation] = useState('');
    const [tarifHoraire, setTarifHoraire] = useState('');
    const [biographie, setBiographie] = useState('');
    const [diplomes, setDiplomes] = useState('');
    const [experiences, setExperiences] = useState('');
    const [editId, setEditeId] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchprofilesesseurs = async () => {
            axios.get(`${API_URL}/Professeur/${user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
                .then((response) => {
                    setLoading(false )
                    console.log(response.data.Profile);
                    setprofilesiles(response.data.Profile);

                })
        };
        fetchprofilesesseurs();
    }, [user.id])

    const handleSubmit =  (e) => {
        if (editId) {
            e.preventDefault();
                const data = new FormData();
                data.append('location', location);
                data.append('tarifHoraire', tarifHoraire);
                data.append('biographie', biographie);
                data.append('diplomes', diplomes);
                data.append('experiences', experiences);
                data.append('_method', 'patch');

                fetch(`${API_URL}/Professeur/${editId}`, {
                    method: 'POST',
                    headers:{
                        Authorization:`Bearer ${token}`
                                        },
                    body: data,
                })
                    .then((response) => response.json())
                    .then((result) => {
                        setIsopen(false)
                        console.log('Success:', result);
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            }

        }


    const handleUpdate = (id) => {
        setIsopen(true)
        setEditeId(id);
        setPrenom(profiles.prenom);
        setEmail(profiles.email);
        setAge(profiles.age);
        setTelephone(profiles.telephone);
        setLocation(profiles.location);
        setTarifHoraire(profiles.tarifHoraire);
        setBiographie(profiles.biographie);
        setDiplomes(profiles.diplomes);
        setExperiences(profiles.experiences);

    };


    return (
        <div className="bg-gray-100 min-h-screen flex flex-col lg:flex-row">
          {loading && <Spinner />}

            <div className="hidden lg:flex">
                <DashboardNav />
            </div>
            <div className="p-4 lg:ml-4 flex-1">
                <div className="bg-white rounded-lg shadow-sm mb-8 p-6 flex flex-col md:flex-row items-start md:items-center justify-between">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">Mon profil professeur</h1>
                    <button onClick={() => handleUpdate(profiles.profe_id)} className="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition">
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
                                            <p className="font-semibold">{profiles.location},Maroc</p>
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

            {isopen && (
                <>
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500 bg-opacity-50 ">
                        <div className="max-w-4xl mx-auto px-4 py-8 bg-white rounded-lg shadow-lg scale-75">
                            <form onSubmit={handleSubmit} class="space-y-6 ">
                                {/* <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Informations personnelles</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Photo de profil</label>
                                            <div className="flex items-center space-x-6">
                                                <img src={`http://127.0.0.1:8000/storage/${profiles.photo}`} alt="Photo de profil actuelle" className="w-24 h-24 rounded-full border-4 border-red-400" />
                                                <div>
                                                    <input type="file" onChange={(e) => setImage(e.target.files[0])} name="photo" id="photo" className="hidden" />
                                                    <label for="photo" className="bg-red-400 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-red-500 transition">
                                                        Changer la photo
                                                    </label>
                                                    <p className="text-sm text-gray-500 mt-2">JPG, PNG ou GIF (max. 2MB)</p>
                                                </div>
                                            </div>
                                        </div>





                                        <div>
                                            <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">Prénom</label>
                                            <input value={prenom} onChange={(e) => setPrenom(e.target.value)} type="text" name="prenom" id="prenom" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" />
                                        </div>


                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" />
                                        </div>


                                        <div>
                                            <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-2">Téléphone</label>
                                            <input value={telephone} onChange={(e) => setTelephone(e.target.value)} type="tel" name="telephone" id="telephone" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" />
                                        </div>


                                        <div>
                                            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">Âge</label>
                                            <input value={age} onChange={(e) => setAge(e.target.value)} type="number" name="age" id="age" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" />
                                        </div>


                                        <div>
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">Localisation</label>
                                            <input value={location} onChange={(e) => setLocation(e.target.value)} type="text" name="location" id="location" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" />
                                        </div>
                                    </div>
                                </div> */}

                                <div className="bg-white rounded-lg shadow-sm p-6">
                                    <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Informations professionnelles</h2>

                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                                        <div className="col-span-2">
                                            <label htmlFor="biographie" className="block text-sm font-medium text-gray-700 mb-2">Biographie</label>
                                            <textarea value={biographie} onChange={(e) => setBiographie(e.target.value)} name="biographie" id="biographie" rows="4" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"></textarea>
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="diplomes" className="block text-sm font-medium text-gray-700 mb-2">Diplômes</label>
                                            <textarea value={diplomes} onChange={(e) => setDiplomes(e.target.value)} name="diplomes" id="diplomes" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"></textarea>
                                        </div>

                                        <div className="col-span-2">
                                            <label htmlFor="experiences" className="block text-sm font-medium text-gray-700 mb-2">Expériences professionnelles</label>
                                            <textarea value={experiences} onChange={(e) => setExperiences(e.target.value)} name="experiences" id="experiences" rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent"></textarea>
                                        </div>

                                        <div>
                                            <label htmlFor="tarifHoraire" className="block text-sm font-medium text-gray-700 mb-2">Tarif horaire (€)</label>
                                            <input value={tarifHoraire} onChange={(e) => setTarifHoraire(e.target.value)} type="number" name="tarifHoraire" id="tarifHoraire" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent" />
                                        </div>

                                    </div>
                                </div>

                                <div className="flex justify-end space-x-4">
                                    <button onClick={() => setIsopen(false)} type="button" className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition">
                                        Annuler
                                    </button>
                                    <button type="submit" className="px-6 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition">
                                        Enregistrer les modifications
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            )}
        </div>

    );


};

export default profilesilePage;
