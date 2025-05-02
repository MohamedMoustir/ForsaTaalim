import React, { useEffect, useRef, useState } from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import '../assets/style/style.css'
import { useNavigate } from "react-router-dom";
import { API_URL, getToken, getUser } from '../utils/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
dayjs.extend(relativeTime);
dayjs.locale("En");
import Pusher from "pusher-js";
import "@fontsource/open-sans/500.css";
import Alert from "./Alert";


export const Nav = ({ id_ }) => {
  const [isUserAuth, setUserAuth] = useState(false);
  const [isMenuHidden, setIsMenuHidden] = useState(true);
  const navigate = useNavigate()
  const token = getToken();
  const user = getUser();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [type, setType] = useState('');
  const [titles, setTitles] = useState('');
  const [message, setMessage] = useState('');

  function BecomeTutor() {
    navigate('/Rejister')
  }
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
      setShowAlert(true);
      setTitles('Annonce supprimée avec succès !');
      setType('success');
      setMessage('Annonce supprimée avec succès .');
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
        console.log('notification', response.data.notification);
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
  function handleClickFlase() {
    setIsMenuHidden(true);
  }

  function handleClickHome() {
    navigate('/')
  }
  useEffect(() => {
    handleAfficheNotifications();
    if (user) {
      if (user.role == 'tuteur') {
        navigate('/login');
      }
    }
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
    // Unmounting 
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [notificationCount])

  const isUserActive = !isUserAuth ||  user?.isActive == false;
  const isUserVerified = isUserAuth || user?.isActive === true;
  
  
  return (
    <nav className="navbar  text-white " style={{ fontFamily: 'Open Sans' }}>
      {showAlert && (
        <Alert
          type={type}
          title={titles}
          message={message}
          onClose={() => setShowAlert(false)}
        />
      )}

      { isUserActive &&(
        <div className="px-6 py-4 flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto space-y-4 md:space-y-0">
          <div className="text-red-400 text-3xl font-bold tracking-tight drop-shadow-sm">
            ForsaTaalim
          </div>

          <div className="flex gap-4 md:gap-6 items-center">
            <a href="#" className="bg-red-400 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm transition-all">
              ?
            </a>

            <a
              onClick={BecomeTutor}
              className={`${id_ === 2 ? 'bg-blue-500 text-white' : 'bg-white/10 text-black'
                } cursor-pointer px-6 py-2.5 rounded-full border border-black transition-all backdrop-blur-sm`}
            >
              Register
            </a>

            <a
              onClick={GoToLologin}
              className={`${id_ !== 1 ? 'bg-blue-500' : 'bg-white/10'
                } cursor-pointer text-white px-6 py-2.5 rounded-full transition-all font-medium shadow-md`}
            >
              Log In
            </a>
          </div>
        </div>

      )}

      {isUserVerified && (
        <div className="px-6 py-4 flex justify-between items-center max-w-7xl mx-auto relative">
          <div className="text-3xl font-bold tracking-tight text-red-400 drop-shadow-sm">
            ForsaTaalim
          </div>

          <div className="flex items-center space-x-5">
            <div className="relative">
              <button
                className="p-2 text-black transition-colors"
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
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-red-400 rounded-full transform translate-x-1/2 -translate-y-1/2 ring-2 ring-indigo-600">
                    {notificationCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl z-50 overflow-hidden border border-purple-100">
                  <div className="p-3  border-b border-red-100">
                    <h3 className="font-semibold text-purple-800">Notifications</h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notif, index) => (
                        <div key={index} className="flex items-start p-3 hover:bg-gray-50 border-b border-gray-100">
                          <div className="relative mr-3">
                            <img src={`http://127.0.0.1:8000/storage/${notif.photo}`} alt="User" className="w-12 h-12 rounded-full object-cover shadow-sm" />
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-gray-400 rounded-full border-2 border-white"></span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-gray-800">{notif.content}</p>
                            <p className="text-xs text-gray-500 mt-1">{dayjs(notif.created_at).fromNow()}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteNotifications(notif.id)}
                            className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="p-6 text-center text-gray-500">
                        <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1" />
                        </svg>
                        No notifications yet
                      </div>
                    )}
                  </div>
                  <div className="bg-red-to-r bg-red-500 to-red-500 p-2 text-center">
                    <button className="text-white text-sm font-medium flex items-center justify-center w-full transition-transform hover:scale-105" onClick={() => setShowNotifications(false)}>
                      <FontAwesomeIcon icon={faTimes} className="mr-1" />
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => navigate('/favorites')} className="p-2 text-black transition-colors">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>

            {isMenuHidden ? (
              <button
                onClick={handleClick}
                className="p-2 text-black  transition-colors"
                aria-controls="navbar-hamburger"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleClickFlase}
                className="p-2 text-black transition-colors"
                aria-label="Close menu"
              >
                <span className="sr-only">Close menu</span>
                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}

            <button
              onClick={hanleProfile}
              className="bg-red-400 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold shadow-md hover:shadow-lg transition-all hover:scale-105"
            >
              {user.name.charAt(0).toUpperCase()}
            </button>
          </div>

          <ul
            className={`${isMenuHidden ? 'hidden' : 'block'} 
                  absolute right-16 top-16 w-52 bg-white rounded-xl shadow-xl z-50 overflow-hidden transform transition-transform duration-200 ease-out`}
          >
            <li>
              <a
                href="#"
                className="block py-3.5 px-5 text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-colors font-medium"
                aria-current="page"
              >
                My Dashboard
              </a>
            </li>
            <li>
              <a
                onClick={handleClickHome}
                className="block cursor-pointer py-3.5 px-5 text-gray-700 hover:bg-purple-50 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </a>
            </li>
            <li>
              <a
                onClick={hanleProfile}
                className="block cursor-pointer py-3.5 px-5 text-gray-700 hover:bg-purple-50 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                My Profile
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate('/logout')}
                className="block cursor-pointer py-3.5 px-5 text-gray-700 hover:bg-red-50 transition-colors flex items-center"
              >
                <svg className="w-5 h-5 mr-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Log Out
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};


