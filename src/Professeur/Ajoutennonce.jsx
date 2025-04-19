import React, { useState, useEffect } from 'react';
import DashboardNav from "../components/dashboardNav"
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faGlobe,
    faEuroSign,
    faMapMarkerAlt,
    faPen,
    faTrash,
    faSearch
} from '@fortawesome/free-solid-svg-icons';
import DetilesAnnonce from "../pages/DetilesAnnonce";

import { API_URL, getToken, getUser } from '../utils/config';

const Dashboard = () => {
    const token = getToken();
    const user = getUser();
    const [openPopUp, setOpenPopUp] = useState(false);
    const [error, setError] = useState(false);
    const [annonces, setAnnonce] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [subjects, setSubjects] = useState('');
    const [levels, setLevels] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [image, setImage] = useState('');
    const [selectedAnnonce, setSelectedAnnonce] = useState(null);
    const [editeId, setEditeId] = useState(null);
    const [search, setSearch] = useState('');


console.log(annonces.length);

    const handleSubmit = async (e) => {
        if (annonces.length == 3) {
          alert('max annoncement add 3');
          setOpenPopUp(false);

        }else{
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('subjects', subjects);
        formData.append('levels', levels);
        formData.append('location', location);
        formData.append('date', date);
        formData.append('image', image);

        try {
            if (editeId) {
                // method spoofing
                formData.append("_method", 'PUT');
                let response = await axios.post(`${API_URL}/announcment/${editeId}`, formData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                });

                setAnnonce((prevAnnonces) =>
                    prevAnnonces.map((a) =>
                        a.id === editeId ? { ...a, title, description, subjects, levels, location, date } : a
                    )
                );
                alert('Annonce mise à jour avec succès !');
                setSelectedAnnonce(null);
                setOpenPopUp(false);
            } else {

                const response = await axios.post(`${API_URL}/announcment`, formData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                });
                setAnnonce([...annonces, response.data.Announcment]);
                setOpenPopUp(false);
            }

        } catch (error) {
            console.error(error);
            setError('error');
        }
    }
    }

    useEffect(() => {
        axios.get(`${API_URL}/announcment/${user.id}`, {
            headers: {
                authorization: `bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response.data.announcement);
                setAnnonce(response.data.announcement);
            })
            .catch(error => {
                console.error("There was an error fetching the announcements:", error);
            });
    }, []);

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/announcment/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            setAnnonce((prevAnnonces) => prevAnnonces.filter(a => a.id_annonce != id));
            alert("Annonce supprimée avec succès !");
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };

    const handleUpdate = (annonce_id) => {
        setOpenPopUp(true)
        setEditeId(annonce_id);
        const annoncement = annonces.filter((a) => a.id_annonce == annonce_id);
        setTitle(annoncement[0].title);
        setDescription(annoncement[0].description);
        setSubjects(annoncement[0].subjects);
        setLevels(annoncement[0].levels);
        setLocation(annoncement[0].location);
        setDate(annoncement[0].date);
    };

    return (
        <>
         
            <div className="bg-gray-100">
                <div className="flex h-screen">
                <div className="hidden lg:flex">
                <DashboardNav />
            </div>

                    <div className="flex h-screen w-[100%]">
                        <div className="flex-1 overflow-y-auto">
                            <div className="p-6 max-w-5xl mx-auto">
                                <div className="flex justify-between items-center mb-6">

                                    <h1 className="text-2xl font-semibold">Annoncement</h1>
                                    <button className="text-gray-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                        </svg>
                                    </button>
                                </div>


                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                                    <div className="flex items-center gap-4">
                                        <div>
                                            <span className="text-sm text-gray-500 pr-2">Search:</span>
                                            <div className="relative inline-block">
                                                <input onChange={(e) => setSearch(e.target.value)}
                                                    type="text"
                                                    placeholder="Search"
                                                    className="w-48 py-1 pl-8 pr-2 text-sm font-medium text-gray-700 bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                />
                                                <div className="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-500">
                                                    <FontAwesomeIcon icon={faSearch} />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <span className="text-sm text-gray-500">Sort by:</span>
                                            <div className="relative inline-block">
                                                <select className="appearance-none bg-transparent pr-8 py-1 pl-2 text-sm font-medium focus:outline-none">
                                                    <option>Newest First</option>
                                                    <option>Oldest First</option>
                                                    <option>A-Z</option>
                                                    <option>Z-A</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button onClick={() => setOpenPopUp(true)} id="openModalBtn" className="bg-[#ff6b6b] hover:bg-[#ff5252] text-white px-4 py-2 rounded-md flex items-center gap-2 transition-colors">
                                        Ajoute annonce
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                {annonces.filter((item) => {

                                    return search.toLowerCase() === '' ? item : item.title.toLowerCase().includes(search);

                                }).map((annonce, index) => (
                                    <div key={index} className="bg-white rounded-2xl shadow-md overflow-hidden mb-6 border border-gray-100 hover:shadow-lg transition-all duration-300">
                                        <div className="p-4 md:flex">

                                            <div className="flex-shrink-0 mr-4 mb-4 md:mb-0">
                                                <img
                                                    src={`http://127.0.0.1:8000/storage/${annonce.image}`}
                                                    alt="Annonce"
                                                    className="w-28 h-28 object-cover rounded-xl"
                                                />
                                            </div>

                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className="text-xl font-semibold text-gray-800">{annonce.title}</h3>
                                                    <span className="text-sm text-gray-400">
                                                        {new Date(annonce.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-500 mt-1 mb-2">
                                                    {annonce.description?.slice(0, 80)}...
                                                </p>

                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                    <div className="text-sm text-gray-700 mb-2 sm:mb-0 space-x-3">
                                                        <span>
                                                            <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-1" />
                                                            {annonce.location}
                                                        </span>
                                                        <span>
                                                            <FontAwesomeIcon icon={faEuroSign} className="text-green-600 mr-1" />
                                                            {annonce.price}€/h
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-md">
                                                            <FontAwesomeIcon icon={faGlobe} className="mr-1" />
                                                            En ligne
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex justify-end gap-2 px-4 pb-4">
                                            <button
                                                onClick={() => handleUpdate(annonce.id_annonce)}
                                                className="bg-yellow-400 text-white px-4 py-1.5 rounded-md hover:bg-yellow-500 text-sm flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon icon={faPen} />
                                                Modifier
                                            </button>
                                            <button
                                                onClick={() => handleDelete(annonce.id_annonce)}
                                                className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 text-sm flex items-center gap-1"
                                            >
                                                <FontAwesomeIcon icon={faTrash} />
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}

                            </div>
                        </div>
                    </div>
                    {openPopUp && (
                        <div id="announcementModal" className="fixed  inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  ">
                            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4 scale-[89%]">
                                <div className="p-6 ">
                                    <div className="flex   justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Ajouter une annonce</h2>
                                        <button onClick={() => setOpenPopUp(false)} id="closeModalBtn" className="text-gray-500 hover:text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <form onSubmit={handleSubmit} >
                                        <div className="mb-4">
                                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="title" name="title" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="subjects" className="block text-sm font-medium text-gray-700 mb-1">subjects</label>
                                            <input value={subjects} onChange={(e) => setSubjects(e.target.value)} type="text" id="subjects" name="subjects" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="levels" className="block text-sm font-medium text-gray-700 mb-1">levels</label>
                                            <select value={levels} onChange={(e) => setLevels(e.target.value)} id="levels" name="levels" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option value="lycee">Lycée</option>
                                                <option value="college">Collège</option>
                                                <option value="primaire">Primaire</option>
                                                <option value="universite">Université</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} id="description " type='text' name="description" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                            <input type="file" onChange={(e) => setImage(e.target.files[0])} id="image" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">location</label>
                                            <select value={location} onChange={(e) => setLocation(e.target.value)} id="location" name="location" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option value="lycee">En ligne</option>
                                                <option value="college">En personne</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">date</label>
                                            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} id="date" name="date" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="flex justify-end gap-2">
                                            <button type="button" id="cancelBtn" className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">Annuler</button>
                                            <button type="submit" className="px-4 py-2 bg-[#ff6b6b] text-white rounded-md hover:bg-[#ff5252]">Ajouter</button>
                                        </div>
                                    </form>


                                </div>
                            </div>
                        </div>

                    )}
                </div>
            </div>
        </>
    );
};

export default Dashboard;
