
import React, { useEffect, useRef, useState } from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import image from '../../../forsaTaalim/resources/image/image 15.png';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000/api';
const token = localStorage.getItem('token');
const user = localStorage.getItem('user');
const parsedToken = JSON.parse(user);


const index = () => {
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const [profiles, setprofiles] = useState([]);
    const [isUserAuth, setUserAuth] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${API_URL}/Professeur`, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                setprofiles(response.data.AllProfile.data);
            })

        // if (!token) {
        //     navigate("/login");
        // } else if (parsedToken && parsedToken.role === "tuteur") {
        //     navigate("/login");
        // }

        if (token) {
            setUserAuth(true);
        }

    }, [token, user, navigate]);

    function BecomeTutor() {
        navigate('/RejisterPro')
    }
    function handleClick() {
        setIsMenuHidden(false);
    };
    function handleClickFlase() {
        setIsMenuHidden(true);
    }
    function handleMoreTuter(){
        navigate('/Tutors');
    }
    return (

        <div className="bg-[#FFF1F1]">
            {!isUserAuth && (
                <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto ">
                    <div className="text-2xl font-bold text-pink-500">
                        ForsaTaalim
                    </div>
                    <div className="flex gap-4 items-center">
                        <a href="#" className="text-gray-600 rounded-full bg-slate-50 w-10 py-2 text-center  hover:text-gray-800">?</a>
                        <a onClick={BecomeTutor} className="bg-white cursor-pointer px-4 py-2 rounded-full hover:bg-gray-50">Become a Tutor</a>
                        <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 ">Log In</a>
                    </div>
                </nav>
            )}
            {isUserAuth && (

                <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto">
                    <div className="text-2xl font-bold text-pink-500">
                        ForsaTaalim
                    </div>
                    <div className="flex gap-4 items-center ">
                        <a href="#"
                            className="bg-red-400 border border-red-400 text-white px-[10px] py-[10px] rounded-full hover:bg-red-400 rounded-full text-1xl absolute right-[100px]">M</a>
                    </div>
                    {isMenuHidden && (
                        <button id="" onClick={handleClick} data-collapse-toggle="navbar-hamburger" type="button"
                            className=" hamburger inline-flex itemsenter justify-center p-2 w-12 h-12 text-sm text-gray-500 rounded-lg absolute right-[180px] "
                            aria-controls="navbar-hamburger" aria-expanded="false" >
                            <span className="sr-only">Open main menu</span>
                            <svg className="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15" />
                            </svg>
                        </button>
                    )}
                    {!isMenuHidden && (
                        <button
                            id="close-btn"
                            onClick={handleClickFlase}
                            type="button"
                            className="inline-flex items-center justify-center p-2 w-12 h-12 text-sm text-gray-500 rounded-lg absolute right-[180px] top-2"
                            aria-label="Close menu"
                        >
                            <span className="sr-only">Close menu</span>
                            <svg
                                className="w-[110px] h-[110px] "
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                    )}


                    <ul
                        className={`menu ${isMenuHidden ? 'hidden' : ''} 
                        flex flex-col font-medium mt-4 w-[200px] bg-white shadow-sm dark:bg-red-400 dark:border-red-400 text-center absolute right-[8%] bottom-[65%] 
                        rounded-lg border border-gray-200 dark:border-gray-600`}
                        style={{ zIndex: 1 }}>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-white bg-red-400 dark:bg-blue-600 rounded-t-lg hover:bg-red-500 dark:hover:bg-blue-700 transition-colors"
                                aria-current="page"
                            >
                                My Dashboard

                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="p1"
                            >
                                Priority
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="triparTiter"
                            >
                                My Profile
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="block py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="triparDate_limite"
                            >
                                Log Out
                            </a>
                        </li>
                    </ul>

                    <button className="absolute top-4 right-[225px] p-1 rounded-full bg-white/80 hover:bg-white" />
                    <svg className="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                        </path>
                    </svg>

                </nav>
            )}
            <section className="container mx-auto mt-24 lg:mt-0 px-8  py-12 ">
                <div className="flex flex-col md:flex-row items-center justify-around gap-20 p-16">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl text-center lg:text-left md:text-5xl font-bold mb-6">
                            Unlock Your Potential with Byway
                        </h1>
                        <p className="text-gray-600 mb-8 text-center max-w-[100%] lg:text-left">
                            Welcome to Byway, where learning knows no bounds. We believe that education is the key to personal
                            and professional growth, and we're here to guide you on your journey to success. Whether you're a
                            student, professional, or lifelong learner, our cutting-edge Learning Management System is designed
                            to elevate your learning experience.
                        </p>
                        <button
                            className="bg-pink-500 relative  ml-10 mr-10 lg:m-0 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition">
                            Start your instructor journey
                        </button>
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
                {/* </div> */}
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

                        {

                            profiles.map((prof, index) => {
                                return (
                                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
                                    <div className="relative h-48 bg-gray-200">
                                        <img
                                            src={`http://127.0.0.1:8000/storage/${prof.photo}`}
                                            alt={prof.prenom}
                                            className="w-full h-full object-cover cursor-pointer"
                                        />
                                        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-all">
                                            <svg
                                                className="w-5 h-5 text-gray-600 hover:text-red-500"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-center mb-3">
                                            <h2 className="text-xl font-semibold text-gray-800">{prof.prenom}</h2>
                                            <p className="text-sm text-gray-600">{prof.location}</p>
                                        </div>
                                
                                        <p className="text-sm text-gray-600 mb-3">
                                            Matière: <span className="font-semibold">{prof.nom_matiere}</span>
                                        </p>
                                        
                                        <div className="flex items-center mb-3">
                                            <div className="flex items-center">
                                                <span className="text-yellow-400">★</span>
                                                <span className="ml-1">{prof.total_ratings}</span>
                                                <span className="text-gray-500 text-sm ml-1">({prof.total_ratings} reviews)</span>
                                            </div>
                                            <span className="ml-4 text-blue-600 text-sm font-medium">Ambassador</span>
                                        </div>
                                
                                        <p className="text-gray-700 text-sm mb-4">{prof.biographie}</p>
                                
                                        <div className="flex items-center justify-between">
                                            <div className="text-gray-900">
                                                <span className="font-semibold">${prof.tarifHoraire}</span>
                                                <span className="text-sm">/h</span>
                                            </div>
                                            <span className="text-red-500 text-sm font-medium">1st lesson free</span>
                                        </div>
                                    </div>
                                </div>
                                
                                )
                            })
                        }

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 ">
                        <div className="flex bg-white border p-2 rounded-md  items-start gap-4">
                            <div className="flex-shrink-0">
                                <img src="../image/images (8).jpg" alt="Irina"
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer " />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                    <h3 className="font-semibold">Irina</h3>
                                    <span className="text-sm text-gray-500">Mathematics tutor</span>
                                </div>
                                <div className="flex text-yellow-400 mb-2">★★★★★</div>
                                <p className="text-sm text-gray-700 mb-2">
                                    I explain topics thoroughly and clearly cares about the student's understanding of the
                                    material.
                                </p>
                                <p className="text-xs text-gray-500">10 hours ago</p>
                            </div>
                        </div>
                        <div className="flex bg-white border p-2 rounded-md   items-start gap-4">
                            <div className="flex-shrink-0">
                                <img src="../image/images (8).jpg" alt="Irina"
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer " />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                    <h3 className="font-semibold">Irina</h3>
                                    <span className="text-sm text-gray-500">Mathematics tutor</span>
                                </div>
                                <div className="flex text-yellow-400 mb-2">★★★★★</div>
                                <p className="text-sm text-gray-700 mb-2">
                                    I explain topics thoroughly and clearly cares about the student's understanding of the
                                    material.
                                </p>
                                <p className="text-xs text-gray-500">10 hours ago</p>
                            </div>
                        </div>
                        <div className="flex bg-white border p-2 rounded-md   items-start gap-4">
                            <div className="flex-shrink-0">
                                <img src="../image/images (8).jpg" alt="Irina"
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer " />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                    <h3 className="font-semibold">Irina</h3>
                                    <span className="text-sm text-gray-500">Mathematics tutor</span>
                                </div>
                                <div className="flex text-yellow-400 mb-2">★★★★★</div>
                                <p className="text-sm text-gray-700 mb-2">
                                    I explain topics thoroughly and clearly cares about the student's understanding of the
                                    material.
                                </p>
                                <p className="text-xs text-gray-500">10 hours ago</p>
                            </div>
                        </div>
                        <div className="flex bg-white border p-2 rounded-md   items-start gap-4">
                            <div className="flex-shrink-0">
                                <img src="../image/images (8).jpg" alt="Irina"
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer " />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                    <h3 className="font-semibold">Irina</h3>
                                    <span className="text-sm text-gray-500">Mathematics tutor</span>
                                </div>
                                <div className="flex text-yellow-400 mb-2">★★★★★</div>
                                <p className="text-sm text-gray-700 mb-2">
                                    I explain topics thoroughly and clearly cares about the student's understanding of the
                                    material.
                                </p>
                                <p className="text-xs text-gray-500">10 hours ago</p>
                            </div>
                        </div>
                        <div className="flex bg-white border p-2 rounded-md   items-start gap-4">
                            <div className="flex-shrink-0">
                                <img src="../image/images (8).jpg" alt="Irina"
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer " />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                    <h3 className="font-semibold">Irina</h3>
                                    <span className="text-sm text-gray-500">Mathematics tutor</span>
                                </div>
                                <div className="flex text-yellow-400 mb-2">★★★★★</div>
                                <p className="text-sm text-gray-700 mb-2">
                                    I explain topics thoroughly and clearly cares about the student's understanding of the
                                    material.
                                </p>
                                <p className="text-xs text-gray-500">10 hours ago</p>
                            </div>
                        </div>
                        <div className="flex bg-white border p-2 rounded-md   items-start gap-4">
                            <div className="flex-shrink-0">
                                <img src="../image/images (8).jpg" alt="Irina"
                                    className="w-10 h-10 rounded-full object-cover cursor-pointer " />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-1 mb-1">
                                    <h3 className="font-semibold">Irina</h3>
                                    <span className="text-sm text-gray-500">Mathematics tutor</span>
                                </div>
                                <div className="flex text-yellow-400 mb-2">★★★★★</div>
                                <p className="text-sm text-gray-700 mb-2">
                                    I explain topics thoroughly and clearly cares about the student's understanding of the
                                    material.
                                </p>
                                <p className="text-xs text-gray-500">10 hours ago</p>
                            </div>
                        </div>



                    </div>

                </div>


                <div className="bg-[#002B4D] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
                        <div className="absolute w-32 h-32 border border-white/20 rounded-full -top-16 -right-16"></div>
                        <div className="absolute w-48 h-48 border border-white/20 rounded-full top-32 -right-24"></div>
                        <div className="absolute w-full h-full">
                            {/* // style="background-image: linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent); background-size: 15px 15px;"> */}
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto px-6 py-16">
                        <div className="flex flex-wrap items-center">
                            <div className="w-full lg:w-1/2 pr-8">
                                <div className="flex gap-4">
                                    <div className="rounded-3xl overflow-hidden">
                                        <img src="../image/about-img-3.png.png" alt="Students"
                                            className="w-full h-full object-cover cursor-pointer " />
                                    </div>
                                    <div className="absolute  rounded-3xl overflow-hidden ml-16 -mt-10 left-[110px]">
                                        <img src="../image/about-img-6.png.png" alt="More students"
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
                                <button
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

                <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg">
                        <div className="faq-item w-full flex items-center justify-between p-4 hover:bg-red-50">
                            <span className="font-medium">What is the average price of Mathematics lessons?</span>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <p className="faq-content hidden bg-blue-50 p-5">Lorem ipsum dolor sit amet...</p>
                    </div>

                    <div className="border border-gray-200 rounded-lg">
                        <div className="faq-item w-full flex items-center justify-between p-4 hover:bg-gray-50">
                            <span className="font-medium">How long does it take to master Mathematics?</span>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                        <p className="faq-content hidden bg-blue-50 p-5">Lorem ipsum dolor sit amet...</p>
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
                        <button 
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

            {/* <body className="bg-gray-100">
    
                <!-- Footer Section --> */}
            <footer className="bg-blue-900  text-white py-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                    <div>
                        <h2 className="text-xl font-bold mb-3">FORSATAALIM</h2>
                        <p className="text-gray-300">Edumodo is perfectly suitable for school, college, and university
                            websites with
                            an online education system.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-3">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:underline">Online Documentation</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">How to Start a Course</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Create a Support Ticket</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Our Refund Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-3">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:underline">Upcoming Events</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Terms and Conditions</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Become a Teacher</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-3">Recent Posts</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="flex items-center space-x-3">
                                    <img src="../image/Frame 42731904.png" alt="Post Image"
                                        className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="text-gray-300 font-semibold">Complete Blender Creator: Learn</p>
                                        <p className="text-sm text-gray-400">January 22, 2025</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center space-x-3">
                                    <img src="../image/Frame 427319048.png" alt="Post Image"
                                        className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="text-gray-300 font-semibold">Traditional Elementary Education News</p>
                                        <p className="text-sm text-gray-400">January 22, 2025</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-6">
                    <div
                        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-sm text-gray-400">
                        <p>Copyright © ForsaTaalim 2025 | moustir</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className="hover:text-gray-200"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="hover:text-gray-200"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-gray-200"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-gray-200"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </footer>

        </div>
    );
};
export default index;
