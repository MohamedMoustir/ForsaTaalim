import React, { useEffect, useRef, useState } from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import '../assets/style/style.css'
import { useNavigate } from "react-router-dom";
import { API_URL, getToken, getUser } from '../utils/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
dayjs.extend(relativeTime);
dayjs.locale("En");
import Pusher from "pusher-js";

const Nav = () => {
    const [isUserAuth, setUserAuth] = useState(false);
    const [isMenuHidden, setIsMenuHidden] = useState(true);
    const navigate = useNavigate()
    const token = getToken();
    const user = getUser();
    const [showNotifications, setShowNotifications] = useState(false);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([]);

    function BecomeTutor() {
        navigate('/Rejister')
    }
    const handleNotificationsClick = () => {

    };

    const handleDeleteNotifications = async (id) => {

        try {
            await fetch(`${API_URL}/notification/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            setNotifications((prevAnnonces) => prevAnnonces.filter(a => a.id != id));
            setNotificationCount(notifications.length)
            alert("Annonce supprimée avec succès !");
        } catch (error) {
            console.error("Erreur lors de la suppression :", error);
        }
    };


    const handleAfficheNotifications = () => {

        axios.get(`${API_URL}/notification`, {
            headers: {
                authorization: `bearer ${token}`,
            }
        })
            .then(response => {
                console.log(response.data.notification);
                setNotifications(response.data.notification);
                setNotificationCount(response.data.notification.length)
            })
            .catch(error => {
                if (error.response) {
                    console.error("Erreur côté serveur:", error.response.data);
                } else if (error.request) {
                    console.error("Pas de réponse du serveur:", error.request);
                } else {
                    console.error("Erreur inconnue:", error.message);
                }
            });



    };

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
    function hanleProfile() {
        navigate('/profile');
    }
    const handleLogout = async (e) => {

        e.preventDefault();
        try {
            const response = await axios.post(`${API_URL}/auth/logout`, {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    }
                }
            );

            if (response) {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("token");
                navigate('/login')
            }

        } catch (err) {

        }
    }
    function handleClickFlase() {
        setIsMenuHidden(true);
    }
    function handleClickGoTofavorites() {
        navigate('/favorites')
    }
    function handleClickHome() {
        navigate('/')
    }
    useEffect(() => {
        handleAfficheNotifications()
    }, []);

    useEffect(() => {
        Pusher.logToConsole = true;
        const pusher = new Pusher('622537c1842edf6db17e', {
            cluster: 'eu'
        });

        const channel = pusher.subscribe('forsaTaalm-notifications');
        channel.bind('notification', function (data) {
            setNotifications(prevMessages => [...prevMessages, data]);
            console.log(data);

        });
        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [notificationCount])

    
      

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

                <nav className="px-4 py-4 flex justify-between items-center max-w-7xl mx-auto ">
                    <div className="text-2xl font-bold text-pink-500">
                        ForsaTaalim
                    </div>
                    <div className="flex gap-4 items-center ">
                        <a onClick={hanleProfile}
                            className="bg-red-400 border cursor-pointer border-red-400 text-white px-[10px] py-[10px] rounded-full hover:bg-red-400 rounded-full text-1xl absolute right-[100px]">{user.name.charAt(0).toUpperCase()}</a>
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
                        <li >
                            <a
                                type="button"
                                onClick={handleLogout}
                                className="block cursor-pointer py-2 px-3 text-gray-900 hover:bg-red-50 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white transition-colors"
                                id="triparDate_limite"
                            >
                                Log Out
                            </a>
                        </li>

                    </ul>
                    <div className="relative">
                        <button
                            className="relative ml-[820px] p-2  text-gray-600 hover:text-gray-800"
                            aria-label="Notifications"
                            onClick={() => setShowNotifications(!showNotifications)}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1"
                                />
                            </svg>

                            {notificationCount > 0 && (
                                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-400 rounded-full transform translate-x-1/2 -translate-y-1/2">
                                    {notificationCount}
                                </span>
                            )}
                        </button>

                        {showNotifications && (
                             
                            <div class="notifications-container absolute  left-[80%] mt-4 " style={{ zIndex: 1 }}>
                                <div class="notifications-list h-[200px] overflow-y-auto">
                                    {notifications.map((notif, index) => {
                                        
                                        return (
                                            <div class="notification-item">
                                                <div class="avatar-container">
                                                    <img src={`http://127.0.0.1:8000/storage/${notif.photo}`} alt="Jese Leos" class="avatar" />
                                                    <span class="status-indicator status-gray"></span>
                                                </div>
                                                <div class="notification-content">
                                                    <div class="notification-text">
                                                        <div class="notification-message">
                                                            <span class="regular-text">{notif.content}</span>
                                                        </div>
                                                        <div class="delete-button" onClick={() => handleDeleteNotifications(notif.id)}>
                                                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div class="timestamp"> {dayjs(notif.created_at).fromNow()}</div>
                                                </div>
                                            </div>
                                        )
                                    })}

                                </div>
                                <div class="footer">
                                    <button class="view-all">
                                        <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                            <path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd"></path>
                                        </svg>
                                        Voir tous
                                    </button>
                                </div>
                            </div>

                        )}
                    </div>
                    <button className="absolute top-4 right-[225px] p-1 rounded-full bg-white/80 hover:bg-white" />
                    <svg onClick={handleClickGoTofavorites} className="w-8 h-8 text-gray-600 cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
