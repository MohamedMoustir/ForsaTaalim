import React, { useEffect } from "react";
import AdminNav from "../components/AdimNav";
import axios from "axios";
import { API_URL, getToken } from "../utils/config";
import { useState } from "react";
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";

const Categories = () => {
    const token = getToken();
    const [nomCategories, setNomCategories] = useState();
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('all');
    const [showPopUp, setShowPopUp] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [profileslength, setprofileslength] = useState(6);
    const [loading, setLoading] = useState(true);
    const [id_, setEditeId] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [type, setType] = useState('');
    const [titles, setTitles] = useState('');
    const [message, setMessage] = useState('');

    const CreateCategories = async (e) => {
        e.preventDefault();
        try {
            if (id_) {
                const response = await axios.put(`${API_URL}/categorie_matiere/${id_}`, {
                    nom: nomCategories
                }, {
                    headers: {
                        authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                setShowPopUp(false)
                setCategories((prevAnnonces) =>
                    prevAnnonces.map((a) =>
                        a.id === id_ ? { ...a, nom: nomCategories } : a
                    )
                );
                setShowAlert(true);
                setTitles('Catégorie mise à jour avec succès!');
                setType('success');
                setMessage('Catégorie mise à jour avec succès.');
            } else {
                const formData = new FormData();
                formData.append('nom', nomCategories);
                const response = await axios.post(`${API_URL}/categorie_matiere`, formData, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    }
                });
                setShowPopUp(false)
                setCategories((prevAnnonces) =>
                    prevAnnonces.map((a) =>
                        a.id === id_ ? { ...a, nom: nomCategories } : a
                    )
                );
                setShowAlert(true);
                setTitles('Catégorie ajoutée avec succès');
                setType('success');
                setMessage('Catégorie ajoutée avec succès');

            }
        } catch (error) {
            setShowAlert(true);
            console.error("Erreur lors de la création/mise à jour :", error);
            alert("Une erreur s'est produite");
            setTitles('Une erreur sest produite');
            setType('success');
            setMessage('Erreur lors de la création/mise à jour ');
        }
    }


    const fetchCategories = async (page) => {
        const response = await axios.get(`${API_URL}/admin/categorie_matiere?page=${page}`, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'aplication/json',
            }
        })

        let data = response.data.AllCategorieMatiere;
        console.log(data);
        setprofileslength(data.total);
        setCategories(data.data)
        setLoading(false);
        setprofileslength(data.total)

    }

    const HandlEdite = (id_cat) => {
        setShowPopUp(true)
        setEditeId(id_cat);
        const categorie = categories.filter((a) => a.id == id_cat);
        console.log(categorie);

        setNomCategories(categorie[0].nom);
    }

    const HandlDelete = async (id_cat) => {
        try {
            const response = await axios.delete(`${API_URL}/categorie_matiere/${id_cat}`, {
                headers: {
                    Authorization: `bearer ${token}`
                }
            });

            if (response.data) {
                console.log(response.data);
                setShowPopUp(false)
                setShowAlert(true);
                setTitles('Catégorie delete avec succès!');
                setType('success');
                setMessage('Catégorie delete avec succès.');
            }
        } catch (err) {
            console.error('Error delete reservation status:', err);
            setShowAlert(true);
            setTitles('Error delete reservation status');
            setType('error');
            setMessage('Failed to delete reservation status');
        }
    }
    useEffect(() => {
        fetchCategories(currentPage);
    }, [nomCategories, currentPage])


    const lastItemsIndex = currentPage * itemsPerPage;
    const firstItemsIndex = lastItemsIndex - itemsPerPage
    const thisPageItems = categories.slice(firstItemsIndex, lastItemsIndex)
    const pages = [];
    for (let i = 0; i < profileslength / itemsPerPage; i++) {
        pages.push(i);
    }

    return (
        <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen font-sans">
            {showAlert && (
                <Alert
                    type={type}
                    title={titles}
                    message={message}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <aside className="w-full md:w-64 bg-white shadow-md">
                <AdminNav id_={5} />
            </aside>
            {loading && <Spinner />}
            <main className="flex-1 p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-2xl font-bold text-gray-800">Gestion des Catégories</h1>
                    <button
                        onClick={() => setShowPopUp(true)}
                        id="openModalBtn"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300"
                    >
                        <i className="fas fa-plus"></i> Ajouter une catégorie
                    </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow mb-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                placeholder="Rechercher..."
                            />
                            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        </div>
                        <div>
                            <select className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Toutes les catégories</option>
                                <option>Science</option>
                                <option>Technologies</option>
                                <option>Art</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.filter((item) => {
                        if (search) {
                            return search.toLowerCase() === 'all' ? item : item.nom.toLowerCase().includes(search);
                        } else {
                            setSearch('all')
                        }
                    }).map((item, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center relative group">
                            <div className="flex justify-between items-center mb-4">
                                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 text-2xl mx-auto">
                                    {item.nom.charAt(0).toUpperCase()}
                                </div>

                            </div>
                            <h3 className="font-bold text-indigo-900">{item.nom}</h3>
                            <p className="text-gray-500 text-sm mb-4">{item.count} produits</p>
                            <div className="flex justify-center gap-2">
                                <button
                                    onClick={() => HandlDelete(item.id)}
                                    className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full"
                                >
                                  <i class="fa fa-trash  text-white text-xs"></i> 
                                </button>
                                <button
                                    onClick={() => HandlEdite(item.id)}
                                    className="p-2 bg-indigo-600 hover:bg-indigo-700 rounded-full"
                                >
                                    <i className="fas fa-edit text-white text-xs"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div aria-label="Page navigation example" className="mt-12">
                    <ul className="flex justify-center items-center -space-x-px h-10 text-base">
                        <li>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="sr-only">Previous</span>
                                <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
                                </svg>
                            </button>
                        </li>

                        {pages.map((pageIndex) => (
                            <li key={pageIndex}>
                                <button
                                    onClick={() => setCurrentPage(pageIndex + 1)}
                                    className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${currentPage === pageIndex + 1 ? 'bg-blue-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                        }`}
                                >
                                    {pageIndex + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length))}
                                className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700"
                            >
                                <span className="sr-only">Next</span>
                                <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4L1 1" />
                                </svg>
                            </button>
                        </li>
                    </ul>
                </div>

                {showPopUp && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center">
                        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 animate-fade-in-up">
                            <form onSubmit={CreateCategories}>
                                <div className="mb-4">
                                    <label htmlFor="categoryName" className="block text-gray-700 text-sm font-bold mb-2">
                                        Nom de la catégorie
                                    </label>
                                    <input
                                        id="categoryName"
                                        type="text"
                                        onChange={(e) => setNomCategories(e.target.value)}
                                        value={nomCategories}
                                        placeholder="Ex: Science, Art, Technologie..."
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="categoryDescription" className="block text-gray-700 text-sm font-bold mb-2">
                                        Description (optionnel)
                                    </label>
                                    <textarea
                                        id="categoryDescription"
                                        placeholder="Description de la catégorie..."
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    ></textarea>
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setShowPopUp(false)}
                                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                    >
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
                                    >
                                        Sauvegarder
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>

        </div>
    );

};

export default Categories;
