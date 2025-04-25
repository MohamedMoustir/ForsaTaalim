import React from "react";

const Categories = () => {
    return (
        <div className="ml-64 flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Gestion des Catégories</h1>
                <button id="openModalBtn" className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center">
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
                <div className="bg-white p-4 rounded-lg shadow-sm text-center">
                    <div className="flex justify-between items-center mb-4">
                        <div className="h-16 w-16 bg-purple-200 rounded-full mx-auto flex items-center justify-center">
                            <i className="fas fa-flask text-purple-600 text-xl"></i>
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
                    <h3 className="font-bold text-indigo-900">Science</h3>
                    <p className="text-gray-500 text-sm mb-4">18 produits</p>
                    <div className="flex justify-center gap-2">
                        <button className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-700">
                            <i className="fas fa-eye text-white text-xs"></i>
                        </button>
                        <button className="p-2 bg-indigo-600 rounded-full hover:bg-indigo-700">
                            <i className="fas fa-edit text-white text-xs"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
                <p className="text-gray-600">Affichage de 1-4 sur 10 catégories</p>
                <div className="flex gap-2">
                    <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Précédent</button>
                    <button className="px-3 py-1 border rounded bg-indigo-600 text-white">1</button>
                    <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">2</button>
                    <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">3</button>
                    <button className="px-3 py-1 border rounded text-gray-600 hover:bg-gray-100">Suivant</button>
                </div>
            </div>
        </div>
    );
};

export default Categories;
