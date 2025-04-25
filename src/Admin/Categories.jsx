import React, { useEffect } from "react";
import AdminNav from "../components/AdimNav";
import axios from "axios";
import { API_URL, getToken } from "../utils/config";
import { useState } from "react";

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

    const CreateCategories = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('nom', nomCategories)
        const response = axios.post(`${API_URL}/categorie_matiere`, formData, {
            headers: {
                authorization: `Bearer ${token}`,
                'content-type': 'aplication/json'
            }
        })
        let data = response.data;
        setCategories(data)


    }

    const fetchCategories = async (page) => {
        const response = await axios.get(`${API_URL}/categorie_matiere?page=${page}`, {
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
        <div className="flex bg-gray-50 min-h-screen" style={{ fontFamily: 'Open Sans' }}>

            <div className="w-full md:w-64 shadow-md">
                <AdminNav />
            </div>

            <div className=" flex-1 p-6">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-2xl font-bold text-gray-800">Gestion des Catégories</h1>
                    <button onClick={() => { setShowPopUp(true) }} id="openModalBtn" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center">
                        <i className="fas fa-plus mr-2"></i>
                        Ajouter une catégorie
                    </button>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <input
                                    type="text"
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full border rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    placeholder="Rechercher..."
                                />
                                <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                            </div>
                        </div>
                        <div>
                            <select className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                <option>Toutes les catégories</option>
                                <option>Science</option>
                                <option>Technologies</option>
                                <option>Art</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {categories.filter((item) => {
                        if (search) {
                            return search.toLowerCase() === 'all' ? item : item.nom.toLowerCase().includes(search);
                        } else{
                            setSearch('all')
                        }

                    }).map((item, index) => {
                        return (
                            <div key={index} className="bg-white p-4 rounded-lg shadow-sm text-center">
                                <div className="flex justify-between items-center mb-4">
                                    <div className="h-16 w-16 bg-purple-200 rounded-full mx-auto flex items-center justify-center">
                                        <a className=" text-purple-600 text-xl"> {item.nom.charAt(0).toUpperCase()}</a>
                                    </div>
                                    <div className="relative group">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </button>
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10 hidden group-hover:block">
                                            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-100 text-left">
                                                <i className="fas fa-edit mr-2"></i> Modifier
                                            </a>
                                            <a href="#" className="block px-4 py-2 text-red-600 hover:bg-red-100 text-left">
                                                <i className="fas fa-trash mr-2"></i> Supprimer
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-bold text-indigo-900">{item.nom}</h3>
                                <p className="text-gray-500 text-sm mb-4">{item.count} produits</p>
                                <div className="flex justify-center gap-2">
                                    <button className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-700">
                                        <i className="fas fa-eye text-white text-xs"></i>
                                    </button>
                                    <button className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-700">
                                        <i className="fas fa-edit text-white text-xs"></i>
                                    </button>
                                </div>
                            </div>
                        )
                    })

                    }

                </div>

                {(
                    <div aria-label="Page navigation example">
                        <ul className="flex items-center -space-x-px h-10 text-base justify-center mt-12">
                            <li>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
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
                                        className={`flex items-center justify-center px-4 h-10 leading-tight border border-gray-300 ${currentPage === pageIndex + 1
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700'
                                            }`}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                </li>
                            ))}

                            <li>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pages.length))}
                                    className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
                                >
                                    <span className="sr-only">Next</span>
                                    <svg className="w-3 h-3 rtl:rotate-180" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4L1 1" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>

                )}

                {showPopUp && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center transition-opacity duration-300">
                        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 z-50 animate-fade-in-up">
                            <form onSubmit={CreateCategories}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryName">
                                        Nom de la catégorie
                                    </label>
                                    <input
                                        value={nomCategories}
                                        onChange={(e) => setNomCategories(e.target.value)}
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        id="categoryName"
                                        type="text"
                                        placeholder="Ex: Science, Art, Technologie..."
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoryDescription">
                                        Description (optionnel)
                                    </label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        id="categoryDescription"
                                        placeholder="Description de la catégorie..."
                                    ></textarea>
                                </div>

                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        id="cancelBtn"
                                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                        onClick={() => setShowPopUp(false)}
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

            </div>


        </div>
    );
};

export default Categories;
