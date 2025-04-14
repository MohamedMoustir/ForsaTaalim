import React, { useState } from 'react';
import DashboardNav from "../components/dashboardNav"

const Dashboard = () => {

    const [openPopUp, setOpenPopUp] = useState(false);
    const [error, setError] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('subjects', subjects);
        formData.append('levels', levels);
        formData.append('price', price);
        formData.append('location', location);
        formData.append('date', date);

        try {
            axios.post(`${API_URL}/announcment`, formData, {
                headers: {
                    authorization: `bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
                body: formData
            })
                .then((response) => {
                    setIsOpen(false)
                    console.log(response.data);
                })
        } catch (error) {
            console.error(error);
            setError('error')
        }
    }


    return (
        <>
            <div className="bg-gray-100">
                <div className="flex h-screen">
                    <DashboardNav></DashboardNav>

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
                                            <span className="text-sm text-gray-500">Assignment:</span>
                                            <div className="relative inline-block">
                                                <select className="appearance-none bg-transparent pr-8 py-1 pl-2 text-sm font-medium focus:outline-none">
                                                    <option>All</option>
                                                    <option>Draft</option>
                                                    <option>Published</option>
                                                </select>
                                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                                    </svg>
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

                                <div className="space-y-4">
                                    <div className="bg-white rounded-md shadow-sm overflow-hidden">
                                        <div className="p-4 flex">
                                            <div className="flex-shrink-0 mr-4">
                                                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Book" className="w-20 h-20 object-cover rounded-md" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h3 className="font-medium text-lg">Cours de Mathématiques</h3>
                                                    <button className="text-gray-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">Draft on 25 Jan 2022</p>
                                                <div className="mt-2 flex items-center">
                                                    <span className="text-sm">Lycée • 20€/h</span>
                                                </div>
                                                <div className="mt-2">
                                                    <span className="text-sm text-blue-500">En ligne</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-md shadow-sm overflow-hidden">
                                        <div className="p-4 flex">
                                            <div className="flex-shrink-0 mr-4">
                                                <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" alt="Book" className="w-20 h-20 object-cover rounded-md" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex justify-between">
                                                    <h3 className="font-medium text-lg">Cours de Mathématiques</h3>
                                                    <button className="text-gray-500">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-1">Draft on 25 Jan 2022</p>
                                                <div className="mt-2 flex items-center">
                                                    <span className="text-sm">Lycée • 20€/h</span>
                                                </div>
                                                <div className="mt-2">
                                                    <span className="text-sm text-blue-500">En ligne</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {openPopUp && (
                        <div id="announcementModal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50  ">
                            <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
                                <div className="p-6">
                                    <div className="flex  justify-between items-center mb-4">
                                        <h2 className="text-xl font-bold">Ajouter une annonce</h2>
                                        <button onClick={() => setOpenPopUp(false)} id="closeModalBtn" className="text-gray-500 hover:text-gray-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <form id="announcementForm">
                                        <div className="mb-4">
                                            <label for="title" className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                                            <input type="text" id="title" name="title" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                        </div>
                                        <div className="mb-4">
                                            <label for="category" className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                                            <select id="category" name="category" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                                                <option value="lycee">Lycée</option>
                                                <option value="college">Collège</option>
                                                <option value="primaire">Primaire</option>
                                                <option value="universite">Université</option>
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label for="price" className="block text-sm font-medium text-gray-700 mb-1">Prix (€/h)</label>
                                            <input type="number" id="price" name="price" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                                        </div>
                                        <div className="mb-4">
                                            <label for="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea id="description" name="description" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
                                        </div>
                                        <div className="mb-4">
                                            <label for="image" className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                            <input type="file" id="image" name="image" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                                        </div>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                                            <div className="flex items-center gap-4">
                                                <label className="inline-flex items-center">
                                                    <input type="radio" name="type" value="online" className="form-radio" checked />
                                                    <span className="ml-2">En ligne</span>
                                                </label>
                                                <label className="inline-flex items-center">
                                                    <input type="radio" name="type" value="inperson" className="form-radio" />
                                                    <span className="ml-2">En personne</span>
                                                </label>
                                            </div>
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
