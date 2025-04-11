import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
const API_URL = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const parsedToken = JSON.parse(user);

const detiles = () => {
    const [isUserAuth, setUserAuth] = useState(false);
    const [detile, setDetilesprofiles] = useState([]);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState('');
    const [tutor, setTutors] = useState();
    const [popUp, setPopUp] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams()

    const fetchProfesseurs = async (tutor_id) => {
        axios.get(`${API_URL}/Professeur/${tutor_id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setDetilesprofiles(response.data.Profile);
                setTutors(response.data.Profile.profe_id);
            })
    };


    const handleAvis = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("content", content);
            formData.append("rating", rating);
            formData.append("tuteur_id", tutor);

            const response = await axios.post(`${API_URL}/avis`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (response.status === 200) {
                alert('comment ajoute successfully');
            } else {
                alert('Error during ajoute');
            }

        } catch (error) {
            setError('Error comment user');
            console.error(error);
        }
    };
    useEffect(() => {
        fetchProfesseurs(id);
        if (token) {
            setUserAuth(true);
        }
        if (!token) {
            navigate("/login");
        } else if (parsedToken && parsedToken.role === "tuteur") {
            navigate("/login");
        }

    }, [])
    function openPopUp() {
        setPopUp(true)
    }
    function closePopUp() {
        setPopUp(false)
    }


    return (

        <div className="container px-4 py-8 max-w-7xl mx-auto  ">

            <div className="flex flex-wrap gap-2 mb-6">
                <span className="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs flex items-center">
                    <i className="fa fa-plus mr-1"></i> {detile.nom_matiere}
                </span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{detile.biographie}</h1>

                    <div className="mt-6">
                        <h3 className="font-semibold mb-2">Lesson location</h3>
                        <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1">
                            <i className="fa fa-laptop mr-2"></i>
                            <span>{detile.location}</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 mt-6">
                        <div className="flex items-center mb-2">
                            <i className="fas fa-award text-blue-500 mr-2"></i>
                            <span className="text-blue-600 font-medium">Ambassador</span>
                        </div>
                        <p className="text-sm text-gray-700">
                            One of our best tutors. Quality profile, experience in their field, verified qualifications and a great response time. Davayne will be happy to arrange your first Mathematics lesson.
                        </p>
                    </div>

                    <div className="mt-6">
                        <h2 className="text-xl font-bold mb-4">About {detile.prenom}</h2>
                        <div className="space-y-4 text-gray-700">
                            <p>{detile.experiences}</p>

                        </div>
                    </div>
                </div>

                <div className="w-full md:w-80">
                    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                        <div className="flex justify-end mb-2">
                            <button className="text-gray-400">
                                <i className="far fa-heart"></i>
                            </button>
                            <button className="text-gray-400 ml-2">
                                <i className="fas fa-download"></i>
                            </button>
                        </div>

                        <div className="flex flex-col items-center">
                            <img src={`http://127.0.0.1:8000/storage/${detile.photo}`} alt={detile.prenom} className="w-24 h-24 rounded-full object-cover mb-2" />
                            <h3 className="font-bold text-lg">{detile.prenom}</h3>
                            <div className="flex items-center text-sm mb-4">
                                <i className="fas fa-star text-yellow-400"></i>
                                <span className="ml-1">{detile.total_ratings} ({detile.total_ratings} reviews)</span>
                            </div>
                        </div>

                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Hourly rate</span>
                                <span className="font-bold">{detile.tarifHoraire}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Number of students</span>
                                <span className="font-bold">50+</span>
                            </div>
                        </div>

                        <button className="w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-md flex justify-center items-center mb-3">
                            <i className="far fa-envelope mr-2"></i>
                            Contact
                        </button>

                        <p className="text-center text-sm text-red-500">
                            <i className="fas fa-gift mr-1"></i>
                            1<sup>st</sup> lesson free
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-12 bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-6">About the lesson</h2>

                <div className="flex flex-wrap gap-4 mb-6">
                    <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 text-sm">
                        <i className="fa fa-school mr-2 text-gray-500"></i>
                        <span>{detile.location}</span>
                    </div>
                    <div className="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 text-sm">
                        <i className="fa fa-language mr-2 text-gray-500"></i>
                        <span>{detile.nom_matiere}</span>
                    </div>
                </div>

                <div className="space-y-4 text-gray-700">
                    <p>Have trouble understanding your workload? There are a million tutors, and you have landed on the right page.</p>

                </div>
                <h1>Ma vidéo</h1>
                <video width="640" height="360" controls>
                    {/* <source src={`http://127.0.0.1:8000/storage/app/${detile.video}`} type="video/mp4" /> */}
                </video>
            </div>
            <div className="mt-12">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold flex items-center">
                        Reviews
                        <i className="far fa-question-circle ml-2 text-gray-400"></i>
                    </h2>
                    <div className="flex items-center">
                        <i className="fas fa-star text-yellow-400 mr-1"></i>
                        <span>5 (104 reviews)</span>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="bg-white rounded-lg shadow p-4">
                        <div className="flex items-center mb-2">
                            <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white mr-2">K</div>
                            <span className="font-medium">Kirsty</span>
                            <div className="ml-auto flex">
                                <i className="fas fa-star text-yellow-400"></i>
                                <span className="ml-1">5</span>
                            </div>
                        </div>
                        <p><span className="font-medium">Perfect!</span> Davayne is great!</p>
                    </div>
                    <div className="text-center">
                        <button onClick={openPopUp} className="text-gray-600 text-sm flex items-center mx-auto bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
                            Add Review
                            <i className="fas fa-plus ml-1"></i>
                        </button>
                    </div>
                </div>
                {popUp && (

                    <div className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 ">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>
                            <form onSubmit={handleAvis}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-2">Rating</label>
                                    <input value={rating} onChange={((e) => setRating(e.target.value))} type="number" min="1" max="5" className="w-full p-2 border border-gray-300 rounded" id="rating" />
                                </div>
                                <div className="mb-4">
                                    <label className="block tiext-sm font-medium mb-2">Your Review</label>
                                    <textarea value={content} onChange={((e) => setContent(e.target.value))} id="review" rows="4" className="w-full p-2 border border-gray-300 rounded"></textarea>
                                </div>
                                <div className="flex justify-between">
                                    <button onClick={closePopUp} type="button" className="text-gray-500" onclick="togglePopup()">Cancel</button>
                                    <button type="submit" className="bg-red-400 text-white px-4 py-2 rounded hover:bg-red-500 transition-colors">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>

        </div>
    );

}

export default detiles;