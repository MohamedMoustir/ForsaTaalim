import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Login from "./Auth/Login";
import Logout from "./Auth/logout.jsx";
import Rejister from "./Auth/Rejister";
import Chat from "./Chats/Chats";
import RejisterPro from "./Auth/RejisterPro";
import Index from "./pages/index";
import '../../forsaTaalim-front/src/assets/js/index';
import Tutors from "./pages/tutors"
import DetilesTutor from "./pages/detilesTutor"
import ContactTutors from "./pages/contactTutors"
import Reservation from "./pages/reservation"
import Profile from "./pages/profile"
import Myfavorites from "./pages/Myfavorites"
import Disponibilites from "./Professeur/Disponibilites"
import Mespaiements from "./pages/Mespaiements"
import Dashboard from "./Professeur/Dashboard";
import Annonce from "./Professeur/Ajoutennonce";
import ReservationEtudient from "./Professeur/Reservation";
import DetileAnnonce from "./pages/DetilesAnnonce.jsx";
import DonePayment from "./pages/DonePayment.jsx";
import Pdf from "./pages/pdf.jsx";
import PdfDociment from "./pages/PdfDociment.jsx";
import ProfilePage from "./Professeur/profileProfesseur.jsx";
import { API_URL, getUser, getToken } from "./utils/config.jsx";
import { useParams } from "react-router-dom";
function App() {

  const [profiles, setprofiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [Detilesprofiles, setDetilesprofiles] = useState([]);
  const [comment, setComment] = useState([]);
  const [annonces, setAnnonces] = useState([]);
  const [payment_By_id, setpayment_By_id] = useState([]);

  const token = getToken();
  const user = getUser();
  const pathParts = window.location.pathname.split('/');
  const id = pathParts[pathParts.length - 1];

  const fetchProfesseurs = async () => {
    try {
      const response = await axios.get(`${API_URL}/Professeur`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (response.data) {
        setLoading(false)
      }
      console.log('Profiles Response:', response.data);
      setprofiles(response.data.AllProfile.data)
    } catch (error) {
      console.log('data not found')
    }
  }
  const fetchProfesseursById = async () => {
    axios.get(`${API_URL}/Professeur/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log('hada', response.data.Profile);
        setDetilesprofiles(response.data.Profile);
        fetchComment(response.data.Profile.profe_id);
        fetchAnnonces(response.data.Profile.profe_id);
        setLoading(false)
      })
  };
  const fetchComment = async (tutor) => {
    axios.get(`${API_URL}/avis/${tutor}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
      .then((response) => {
        console.log('ddddddddddddddddsssss', response.data.comments);

        setComment(response.data.comments);

      })
  };
  const fetchAnnonces = async (profe_id) => {

    axios.get(`${API_URL}/announcment/${profe_id}`, {
      headers: {
        authorization: `bearer ${token}`,
      }
    })
      .then(response => {
        console.log('dDDDDDDDDD', response.data.announcement);
        setAnnonces(response.data.announcement);
      })
      .catch(error => {
        console.log('data not found')

        // console.error("There was an error fetching the announcements:", error);
      });

  }
  const fetchPayments = async () => {
    try {
      const response = await axios.get(`${API_URL}/Reservation/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      setpayment_By_id(response.data.reservation);
      console.log('dd', response.data.reservation);

      if (response) {
        setLoading(false)
      }


    } catch (error) {
      console.log('data not found')
    }

  };


  useEffect(() => {
   
    // if (!check) {
      fetchProfesseurs();
      fetchProfesseursById();
      fetchPayments()
    // }

  }, [])

  return (
    <Router>

      <Routes>

        <Route path="/" element={<Index profiles={profiles} loading={loading} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/RejisterPro" element={<RejisterPro />} />
        <Route path="/Rejister" element={<Rejister />} />
        <Route path="/Chat/:id/room/:chat_user_id" element={<Chat />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/detilesTutor/:id" element={<DetilesTutor detile={Detilesprofiles} loading={loading} comment={comment} annonces={annonces} />} />
        <Route path="/contactTutors/:id" element={<ContactTutors Detilesprofiles={Detilesprofiles} loading={loading} />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Myfavorites />} />
        <Route path="/disponibilites/:id" element={<Disponibilites />} />
        <Route path="/Mespaiements" element={<Mespaiements />} />
        <Route path="/dashboard-tuteur" element={<Dashboard />} />
        <Route path="/dashboard-annonce" element={<Annonce />} />
        <Route path="/dashboard-tuteur/reservation" element={<ReservationEtudient />} />
        <Route path="/detileAnnonce/:id" element={<DetileAnnonce />} />
        <Route path="/donePayment/:id" element={<DonePayment />} />
        {/* <Route path="/pdf/:id" element={<Pdf payment={payment_By_id}  />} /> */}
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/pdfDociment/:id" element={<PdfDociment payment_By_id={payment_By_id} loading={loading} />} />




      </Routes>
    </Router>
  );
}

export default App;
