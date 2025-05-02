
import React, { useEffect, useRef, useState } from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import image from '../../../forsaTaalim/resources/image/image 15.png';
import image1 from '../../../forsaTaalim/resources/image/about-img-3.png.png';
import image2 from '../../../forsaTaalim/resources/image/about-img-6.png.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MainLayout from "../components/MainLayout.jsX";
import { API_URL, getToken, getUser } from '../utils/config';
import Alert from "../components/Alert";
import Spinner from "../components/Spinner";
const token = getToken();
const user = getUser();
const index = ({ profiles, loading, comment }) => {

    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    function handleMoreTuter() {
        navigate('/Tutors');
    }
    const handleClickProfessor = (id) => {
        window.location.href = `/detilesTutor/${id}`
    };

    useEffect(() => {
        const alertState = sessionStorage.getItem('alertShown');
        if (alertState) {
            setShowAlert(true);
        }
        setTimeout(() => {
            sessionStorage.removeItem('alertShown')
            setShowAlert(false);
        }, 3000)
        if (!showAlert) {
            sessionStorage.removeItem('alertShown')
        }
    }, [showAlert]);

    return (
        <>
            {loading && (
                <Spinner />
            )}
            <MainLayout>
                {showAlert && (
                    <Alert
                        type="success"
                        title="Login Successful"
                        message="You can now log in and start using all the features."
                        onClose={() => setShowAlert(false)}
                    />
                )}

                <div className="bg-[#FFF1F1] font-custom"  >

                    <section className="container mx-auto mt-24 lg:mt-0 px-8  py-12 ">
                        <div className="flex flex-col md:flex-row items-center justify-around gap-20 p-16">
                            <div className="md:w-1/2">
                                <h1 className="text-4xl text-center lg:text-left md:text-5xl font-bold mb-6">
                                    Unlock Your Potential with ForsaTaalim
                                </h1>
                                <p className="text-gray-600 mb-8 text-center max-w-[100%] lg:text-left">
                                    Welcome to ForsaTaalim, where learning knows no bounds. We believe that education is the key to personal
                                    and professional growth, and we're here to guide you on your journey to success. Whether you're a
                                    student, professional, or lifelong learner, our cutting-edge Learning Management System is designed
                                    to elevate your learning experience.
                                </p>
                                {user ? (
                                    <button onClick={() => navigate('/Rejister')}
                                        className="bg-pink-500 relative  ml-10 mr-10 lg:m-0 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition">
                                        See more tutors
                                    </button>
                                ) : (
                                    <button onClick={() => navigate('/Rejister')}
                                        className="bg-pink-500 relative  ml-10 mr-10 lg:m-0 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition">
                                        Start your instructor journey
                                    </button>
                                )}

                            </div>
                            <div className="md:w-1/2 relative ">
                                <div className="rounded-lg p-6 relative">
                                    <img src={image} alt="Instructor"
                                        className="rounded-lg min-w-[60%]  border border-red-200 border-r-8  hidden md:block" />
                                    <div className="absolute top-4 md:left-64   bg-white p-4 rounded-lg shadow-lg hidden md:block">
                                        <div className="flex items-center gap-2 ">
                                            <div className="relative w-[200px] h-16 -top-10">
                                                <svg className="w-[200px] h-[122px]" viewBox="0 0 100 100">
                                                    <path d="M10,80 A40,40 0 0,1 90,80" stroke="#E6EFFD" strokeWidth="20" fill="none">
                                                    </path>
                                                    <path d="M10,80 A40,40 0 0,1 90,80" stroke="#EC4899" strokeWidth="20" fill="none"
                                                        strokeDasharray="126" strokeDashoffset="16" transform="rotate(-1, 50, 50)">
                                                    </path>

                                                    <circle cx="50" cy="60" r="4" fill="#3B82F6"></circle>
                                                </svg>

                                                <div className="absolute inset-0 top-24 flex items-center justify-center">
                                                    <span className="text-lg font-bold text-pink-500">87.6%</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-center mt-2 text-gray-600">Completion rate <br /> of our Courses</p>

                                    </div>

                                    <div className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2 bg-pink-100 rounded-full">
                                                <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor"
                                                    viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            <div className="">
                                                <p className="text-sm text-gray-600">Number of courses sold</p>
                                                <p className="text-xl font-bold">100,000+</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute right-90 top-1/3 transform -translate-y-1/2 hidden md:block">
                                    <div className="grid grid-cols-3 gap-2">
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                        <div className="w-2 h-2 bg-pink-300 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-gray-50">
                        <div className="max-w-6xl mx-auto p-6">
                            <div className="flex items-center text-sm text-gray-500 mb-6">
                                <span>ForsaTaalim</span>
                                <span className="mx-2">›</span>
                                <span>Academic tutoring</span>
                                <span className="mx-2">›</span>
                                <span>Private Mathematics tutors</span>
                            </div>

                            <h1 className="text-2xl font-bold mb-8">
                                Get personalized support with the help of one of our expert math tutors
                            </h1>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {profiles.map((prof, index) => (
                                    <div
                                        key={index}
                                        className="bg-white rounded-2xl shadow-md overflow-hidden transform hover:scale-12 hover:shadow-2xl transition-all duration-300 ease-in-out animate-fade-up"
                                    >
                                        <div className="relative h-48 bg-gray-200 overflow-hidden">
                                            <img
                                                onClick={() => handleClickProfessor(prof.id)}
                                                src={`http://127.0.0.1:8000/storage/${prof.photo}`}
                                                alt={prof.prenom}
                                                className="w-full h-full object-cover cursor-pointer transition-transform duration-500 hover:scale-110"
                                            />
                                        </div>

                                        <div className="p-5">
                                            <div className="flex justify-between items-center mb-3">
                                                <h2 className="text-xl font-bold text-gray-800">{prof.prenom}</h2>
                                                <p className="text-sm text-gray-500">{prof.location}</p>
                                            </div>

                                            <p className="text-sm text-gray-600 mb-3">
                                                Matière: <span className="font-semibold text-indigo-600">{prof.nom_matiere}</span>
                                            </p>

                                            <div className="flex items-center mb-3">
                                                <div className="flex items-center text-yellow-400">
                                                    <span>★</span>
                                                    <span className="ml-1 text-gray-800">{Number(prof.average_rating).toFixed(0)}</span>
                                                    <span className="text-gray-500 text-xs ml-1">({prof.total_ratings} avis)</span>
                                                </div>
                                                <span className="ml-4 text-blue-500 text-xs font-semibold">Ambassador</span>
                                            </div>

                                            <p className="text-gray-700 text-sm mb-4">{prof.biographie.slice(0,70)} ...</p>

                                            <div className="flex items-center justify-between">
                                                <div className="text-gray-900">
                                                    <span className="font-bold">${prof.tarifHoraire}</span>
                                                    <span className="text-sm text-gray-600">/h</span>
                                                </div>
                                                <span className="text-red-500 text-xs font-medium">1er cours offert</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div onClick={handleMoreTuter} className="flex items-center justify-around">
                            <span
                                className="text-red-500 cursor-pointer text-sm bg-red-400 text-white p-4 w-48 text-center mt-4 rounded-3xl">See more tutors</span>
                        </div>
                    </section>

                    <section className="bg-gray-50 ">
                        <div className="max-w-6xl mx-auto p-6 mb-20">
                            <h1 className="text-xl font-bold mb-8">
                                Learn with a math tutor that tailors classNamees to your unique needs
                            </h1>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10  ">
                                {comment.map((comm, index) => {
                                    return (
                                        <div key={index} className="flex  hover:scale-12 hover:shadow-24 transition-all bg-white border p-2 rounded-md  items-start gap-4">
                                            <div className="flex-shrink-0">
                                                <img src={`http://127.0.0.1:8000/storage/${comm.photo}`} alt={comm.prenom}
                                                    className="w-10 h-10 rounded-full object-cover cursor-pointer " />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-1 mb-1">
                                                    <h3 className="font-semibold">{comm.prenom}</h3>
                                                    <span className="text-sm text-gray-500">{comm.nom}</span>
                                                </div>
                                                <div className="flex text-yellow-400 mb-2">{'★'.repeat(comm.rating)}</div>
                                                <p className="text-sm text-gray-700 mb-2">
                                                    {comm.content}
                                                </p>
                                                <p className="text-xs text-gray-500">{new Date(comm.created_at).toLocaleDateString('EG', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}</p>
                                            </div>
                                        </div>
                                    )
                                }

                                )}

                            </div>

                        </div>


                        <div className="bg-[#002B4D] relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                                <div className="absolute w-32 h-32 border border-white/20 rounded-full -top-16 -right-16"></div>
                                <div className="absolute w-48 h-48 border border-white/20 rounded-full top-32 -right-24"></div>
                                <div className="absolute w-full h-full">
                                </div>
                            </div>

                            <div className="max-w-6xl mx-auto px-6 py-16">
                                <div className="flex flex-wrap items-center">
                                    <div className="w-full lg:w-1/2 pr-8">
                                        <div className="flex gap-4">
                                            <div className="rounded-3xl overflow-hidden">
                                                <img src={image1} alt="Students"
                                                    className="w-full h-full object-cover cursor-pointer " />
                                            </div>
                                            <div className="absolute  rounded-3xl overflow-hidden ml-16 -mt-10 left-[110px]">
                                                <img src={image2} alt="More students"
                                                    className="w-full h-full object-cover cursor-pointer " />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full lg:w-1/2 text-white mt-8 lg:mt-0">
                                        <span className="text-orange-500 font-medium mb-2 block">ADMISSION</span>
                                        <h1 className="text-4xl font-bold mb-4">Admission Open For Spring 2020. Complete Registration Now.
                                        </h1>
                                        <p className="text-gray-300 mb-8">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                            odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh.
                                        </p>
                                        <button onClick={() => navigate('/login')}
                                            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2">
                                            Apply For Admission
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="max-w-6xl mx-auto px-6 py-16">
                        <h2 className="text-2xl font-bold mb-8">FAQ</h2>

                        <div className="space-y-6">

                            <div className="border rounded-xl overflow-hidden shadow-md bg-green-50 hover:bg-green-100 transition-all duration-300">
                                <button className="w-full flex flex-col items-start p-5 text-left group">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-lg font-semibold text-green-800 group-hover:text-green-900 transition-colors duration-300">
                                            How do I find the best tutor for my needs?
                                        </span>
                                        <svg className="w-6 h-6 text-green-700 group-hover:text-green-900 transition-transform duration-300 transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="px-5 py-4 hidden group-hover:block transition-all duration-300">
                                        <p className="text-green-700 text-sm">
                                            You can browse tutors based on their ratings, reviews, and subject expertise to find the perfect match!
                                        </p>
                                    </div>
                                </button>
                            </div>

                            <div className="border rounded-xl overflow-hidden shadow-md bg-indigo-50 hover:bg-indigo-100 transition-all duration-300">
                                <button className="w-full flex flex-col items-start p-5 text-left group">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-lg font-semibold text-indigo-800 group-hover:text-indigo-900 transition-colors duration-300">
                                            Are online lessons as effective as in-person ones?
                                        </span>
                                        <svg className="w-6 h-6 text-indigo-700 group-hover:text-indigo-900 transition-transform duration-300 transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="px-5 py-4 hidden group-hover:block transition-all duration-300">
                                        <p className="text-indigo-700 text-sm">
                                            Yes! With the right tutor, online lessons can be just as interactive and effective as face-to-face teaching.
                                        </p>
                                    </div>
                                </button>
                            </div>

                            <div className="border rounded-xl overflow-hidden shadow-md bg-yellow-50 hover:bg-yellow-100 transition-all duration-300">
                                <button className="w-full flex flex-col items-start p-5 text-left group">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-lg font-semibold text-yellow-800 group-hover:text-yellow-900 transition-colors duration-300">
                                            How do I pay for lessons?
                                        </span>
                                        <svg className="w-6 h-6 text-yellow-700 group-hover:text-yellow-900 transition-transform duration-300 transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="px-5 py-4 hidden group-hover:block transition-all duration-300">
                                        <p className="text-yellow-700 text-sm">
                                            Payments are made securely through our platform via credit card, PayPal, or other accepted methods.
                                        </p>
                                    </div>
                                </button>
                            </div>

                            <div className="border rounded-xl overflow-hidden shadow-md bg-pink-50 hover:bg-pink-100 transition-all duration-300">
                                <button className="w-full flex flex-col items-start p-5 text-left group">
                                    <div className="flex items-center justify-between w-full">
                                        <span className="text-lg font-semibold text-pink-800 group-hover:text-pink-900 transition-colors duration-300">
                                            Can I change tutors if I'm not satisfied?
                                        </span>
                                        <svg className="w-6 h-6 text-pink-700 group-hover:text-pink-900 transition-transform duration-300 transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                    <div className="px-5 py-4 hidden group-hover:block transition-all duration-300">
                                        <p className="text-pink-700 text-sm">
                                            Absolutely! If you feel the tutor isn't a good fit, you can easily switch to another one that better suits your needs.
                                        </p>
                                    </div>
                                </button>
                            </div>

                        </div>

                    </div>
                    <section className="bg-gray-50">
                        <div className="max-w-6xl mx-auto px-6 py-12">
                            <div className="mt-12 bg-blue-50 rounded-xl p-8 text-center">
                                <h2 className="text-xl font-bold mb-2">
                                    Experience a new way to learn with Math lessons – interactive, enjoyable, and effective
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Join us and conquer math, one equation at a time, with a private math className
                                </p>
                                <button onClick={() => navigate('/login')}
                                    className="inline-flex items-center gap-2 bg-red-400 text-white px-6 py-3 rounded-lg hover:bg-red-500 transition-colors">
                                    See more tutors
                                    <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </MainLayout>
        </>
    );
};
export default index;
