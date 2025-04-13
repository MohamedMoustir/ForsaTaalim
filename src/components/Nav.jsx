import React, { useEffect, useRef, useState } from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import { useNavigate } from "react-router-dom";
const token = localStorage.getItem('token');
const Nav = () => {
    const [isUserAuth, setUserAuth] = useState(false);
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const navigate = useNavigate()

    function BecomeTutor() {
        navigate('/Rejister')
    }
    
    function GoToLologin() {
        navigate('/login')
    }
    useEffect(() => {
        if (token) {
            setUserAuth(true);
        }
    })
    function handleClick() {
        setIsMenuHidden(false);
    };
    function hanleProfile(){
        navigate('/profile');
    }
    const hanleLogout = async (e) => {
        try {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            const response = await axios.post(`${API_URL}/auth/logout`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

           
            navigate('/login')
        } catch (err) {

        }
    }
    function handleClickFlase() {
        setIsMenuHidden(true);
    }
    function handleClickGoTofavorites(){
        navigate('/favorites')
    }
    function handleClickHome(){
        navigate('/')
    }
    return (
        <nav className="navbar">
            {!isUserAuth && (
                <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto ">
                    <div className="text-2xl font-bold text-pink-500">
                        ForsaTaalim
                    </div>
                    <div className="flex gap-4 items-center">
                        <a href="#" className="text-gray-600 rounded-full bg-slate-50 w-10 py-2 text-center  hover:text-gray-800">?</a>
                        <a onClick={BecomeTutor} className="bg-white cursor-pointer px-4 py-2 rounded-full hover:bg-gray-50">Rejister</a>
                        <a onClick={GoToLologin} className="bg-blue-600 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-blue-700 ">Log In</a>
                    </div>
                </nav>
            )}
            {isUserAuth && (

                <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto">
                    <div className="text-2xl font-bold text-pink-500">
                        ForsaTaalim
                    </div>
                    <div className="flex gap-4 items-center ">
                        <a onClick={hanleProfile}
                            className="bg-red-400 border cursor-pointer border-red-400 text-white px-[10px] py-[10px] rounded-full hover:bg-red-400 rounded-full text-1xl absolute right-[100px]">M</a>
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
                               onClick={handleClickHome}
                                className="block cursor-pointer py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="p1"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={hanleProfile}
                                className="block cursor-pointer py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="triparTiter"
                            >
                                My Profile
                            </a>
                        </li>
                        <li>
                            <a
                                onClick={hanleLogout}
                                className="block cursor-pointer py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="triparDate_limite"
                            >
                                Log Out
                            </a>
                        </li>
                    </ul>

                    <button className="absolute top-4 right-[225px] p-1 rounded-full bg-white/80 hover:bg-white" />
                    <svg onClick={handleClickGoTofavorites}  className="w-8 h-8 text-gray-600 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path
                            d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z">
                        </path>
                    </svg>

                </nav>
            )}

        </nav>
    );
};

export default Nav;
