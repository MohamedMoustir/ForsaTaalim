import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Login from "../Auth/Login";
import MainLayout from "../components/MainLayout.jsX";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faCalendarAlt,
    faBookOpen,
    faUsers,
    faSignInAlt,
    faChalkboardTeacher
} from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';


import { API_URL, getToken, getUser } from '../utils/config';
import Alert from "../components/Alert";
const token = getToken();
const user = getUser();
const detiles = () => {
    const [isUserAuth, setUserAuth] = useState(false);
    const [detile, setDetilesprofiles] = useState([]);
    const [comment, setComment] = useState([]);
    const [content, setContent] = useState('');
    const [rating, setRating] = useState('');
    const [error, setError] = useState('');
    const [tutor, setTutors] = useState(null);
    const [popUp, setPopUp] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [annonces, setAnnonces] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams()
    const [type, setType] = useState('');
    const [titles, setTitles] = useState('');
    const [message, setMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const fetchProfesseursById = async () => {
        const response = await axios.get(`${API_URL}/Professeur/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        const profile = response.data.Profile;
        console.log('hada', profile);
        setDetilesprofiles(profile);
         fetchComment(profile.profe_id);
         fetchAnnonces(profile.profe_id);
        setLoading(false)
    };
    const fetchComment = async (id_) => {
        const response = await axios.get(`${API_URL}/avis/${id_}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
        const comments = response.data.comments;
        console.log(comments);
        setComment(comments);

    };
    const fetchAnnonces = async (profe_id) => {
        try {
            const response = await axios.get(`${API_URL}/announcment/${profe_id}`, {
                headers: {
                    authorization: `bearer ${token}`,
                }
            })
            const annonce = response.data.announcement;
            setAnnonces(annonce);
        }
        catch (error) {
            console.error("There was an error fetching the announcements:", error);
        }

    };
    const handleAvis = async (e) => {
        e.preventDefault();
        try {
            let response;
            let data;
            const formData = new FormData();
            formData.append("content", content);
            formData.append("rating", rating);
            formData.append("tuteur_id", detile.profe_id);

            if (editId) {
                formData.append("_method", 'PUT');

                response = await axios.post(`${API_URL}/avis/${editId}`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': "multipart/from-data",
                    },

                });
                if (response) {
                    setPopUp(false);
                }
            } else {

                response = await axios.post(`${API_URL}/avis`, formData, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response) {
                    setPopUp(false);
                    const setNewcomment = { content: content, rating: rating, tuteur_id: detile.profe_id }
                    setComment([...comment, setNewcomment])
                    await fetchComment(detile.profe_id);
                    setShowAlert(true);
                    setTitles('Commentaire ajouté avec succès!');
                    setType('success');
                    setMessage('Your Commentaire  has been ajouté successfully.');
                } else {
                    setShowAlert(true);
                    setTitles('Erreur lors de l\'ajout!');
                    setType('error');
                    setMessage('Erreur lors de l\'ajout ou modification du commentaire');
                }
            }
        } catch (error) {
            setError('Erreur lors de l\'ajout ou modification du commentaire');
            console.error(error);
        }
    };
    function openPopUp() {
        setPopUp(true)
    }
    function closePopUp() {
        setPopUp(false)
    }
    const deleteComment = async (comment_id) => {
        try {
            const response = await axios.delete(`${API_URL}/avis/${comment_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-type': 'application/json'
                }
            });
            if (response.status === 200) {
                setShowAlert(true);
                setTitles('Commentaire supprimée avec succès!');
                setType('success    ');
                setMessage('Your Commentaire  supprimée avec successfully.');
                setComment((prev) => prev.filter((a) => a.id !== comment_id));
            } else {
                setShowAlert(true);
                setTitles('Erreur lors de la suppression!');
                setType('error');
                setMessage('Erreur Commentaire  supprimée .');
            }
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
            throw error;
        }
    };
    const handleDelete = async (comment_id) => {
        try {
            await deleteComment(comment_id);
        } catch (error) {
            console.error("Erreur lors de la suppression:", error);
        }
    }
    const handleEdit = (id) => {
        const comments = comment.filter((a) => a.id == id)
        setContent(comments[0].content)
        setRating(comments[0].rating)
        setPopUp(true)
        setEditId(id);
        setIsFormVisible(true);
    };
    const handleContact = () => {
        navigate(`/contactTutors/${detile.profe_id}`)
    }
    useEffect(() => {
        fetchProfesseursById();
    }, []);

    const handleRegister = ($id_annonce) => {
        if ($id_annonce) {
            navigate(`/detileAnnonce/${$id_annonce}`);
        }

    };

    return (
        <> {loading && (
            <Spinner />
        )}
            {showAlert && (
                <Alert
                    type={type}
                    title={titles}
                    message={message}
                    onClose={() => setShowAlert(false)}
                />
            )}
            <MainLayout >
                <div className="container px-4 py-8 max-w-7xl mx-auto  ">
                    <button
                        className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-2 px-4 py-2 mb-8 rounded-lg hover:bg-red-50"
                        aria-label="Go back"
                    >
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            strokeWidth="2"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                        <span onClick={() => navigate('/')} className="hidden sm:inline">Back</span>
                    </button>
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
                                        <span className="ml-1">{Number(detile.average_rating).toFixed(0)}  ({detile.total_ratings} reviews)</span>
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

                                <button onClick={handleContact} className="w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-md flex justify-center items-center mb-3">
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

                    <div className=" py-10 px-4 mt-20">
                        <div className="container mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
                                {annonces.map((item) => (
                                    <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border flex flex-col h-full">
                                        <div className="h-52 overflow-hidden rounded-t-2xl">
                                            <img
                                                src={`http://127.0.0.1:8000/storage/${item.image}`}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                                            />
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <h2 className="text-2xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                                <FontAwesomeIcon icon={faChalkboardTeacher} className="text-red-400" />
                                                {item.title}
                                            </h2>

                                            <p className="text-gray-600 mb-4">{item.description.slice(0, 80)}...</p>

                                            <div className="flex items-center text-sm text-gray-600 mb-2">
                                                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-red-400" />
                                                {item.date}
                                            </div>

                                            <div className="flex items-center text-sm text-gray-600 mb-4">
                                                <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-400" />
                                                {item.location}
                                            </div>

                                            <div className="mb-3">
                                                <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                                    <FontAwesomeIcon icon={faBookOpen} className="mr-2 text-red-400" />
                                                    Subjects:
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                        {item.subjects}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mb-5">
                                                <div className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                                    <FontAwesomeIcon icon={faUsers} className="mr-2 text-red-400" />
                                                    Levels:
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="border border-red-300 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                                                        {item.levels}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-auto">
                                                <button
                                                    onClick={() => handleRegister(item.id_annonce)}
                                                    className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
                                                >
                                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                                    Register Now
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                ))}
                            </div>
                        </div>
                    </div>


                    <div className="mt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center text-gray-800">
                                Reviews
                                <span className="ml-2 text-gray-400 hover:text-gray-600 cursor-help">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </h2>
                            <div className="flex items-center bg-yellow-50 px-3 py-1 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="ml-1 font-medium">{Number(detile.average_rating).toFixed(0)}  <span className="text-gray-500 font-normal">({detile.total_ratings} reviews)</span></span>
                            </div>
                        </div>

                        <div className="space-y-5 overflow-y-auto h-64">
                            {comment.map((item, index) => (

                                <div
                                    key={index}
                                    className="bg-white  rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow duration-300"
                                >
                                    <div className="flex items-center mb-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white font-bold mr-3 shadow-sm">
                                            {(item?.prenom?.charAt(0).toUpperCase()) || (user?.prenom?.charAt(0).toUpperCase())}                                        </div>

                                        <div>
                                            <span className="font-semibold text-gray-800">{(item?.prenom) || (user?.prenom)}</span>
                                            <div className="flex items-center text-yellow-500 text-sm mt-0.5">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                                <span className="ml-1">{item.rating}</span>
                                            </div>
                                        </div>

                                        {item.user_id === user.id && (
                                            <div className="ml-auto flex items-center space-x-2">
                                                <button
                                                    onClick={() => handleEdit(item.id)}
                                                    className="text-blue-500 hover:text-blue-700 transition p-1 rounded-full hover:bg-blue-50"
                                                    title="Edit"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                                    </svg>
                                                </button>

                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-500 hover:text-red-700 transition p-1 rounded-full hover:bg-red-50"
                                                    title="Delete"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    <p className="text-gray-700 leading-relaxed">{item.content}</p>
                                </div>
                            ))}


                        </div>
                        <div className="text-center mt-8">
                            <button
                                onClick={openPopUp}
                                className="flex items-center justify-center mx-auto bg-gradient-to-r from-red-300 to-red-400 text-white px-5 py-2.5 rounded-lg hover:from-red-500 hover:to-red-700 transition duration-300 shadow-sm font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                                Add Review
                            </button>
                        </div>
                        {popUp && (
                            <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
                                <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md transform transition-all duration-300">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-lg font-semibold text-gray-800">Add Your Review</h3>
                                        <button onClick={closePopUp} className="text-gray-400 hover:text-gray-500 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                    <form onSubmit={handleAvis}>
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                                            <div className="flex items-center space-x-1">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <button
                                                        key={star}
                                                        type="button"
                                                        onClick={() => setRating(star)}
                                                        className="focus:outline-none"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${parseInt(rating) >= star ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                    </button>
                                                ))}
                                                <input
                                                    type="hidden"
                                                    value={rating}
                                                    id="rating"
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-5">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
                                            <textarea
                                                value={content}
                                                onChange={(e) => setContent(e.target.value)}
                                                id="review"
                                                rows="4"
                                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                                                placeholder="Share your experience..."
                                            ></textarea>
                                        </div>
                                        <div className="flex justify-end space-x-3">
                                            <button
                                                onClick={closePopUp}
                                                type="button"
                                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className={`px-4 py-2 rounded-lg text-white ${isFormVisible ? 'bg-blue-500 hover:bg-blue-500' : 'bg-red-500 hover:bg-red-500'} transition-colors`}
                                            >
                                                {isFormVisible ? 'Update' : 'Submit'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </MainLayout>
        </>
    );

}

export default detiles;