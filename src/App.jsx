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
import AdminDashboard from "./Admin/Dashboard.jsx"
import Students from "./Admin/Students.jsx";
import Teachers from "./Admin/Teachers.jsx"
import Categories from "./Admin/Categories.jsx";
import ResetPassword from "./Auth/ResetPassword.jsx";
function App() {

  const [profiles, setprofiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState([]);



  const { id } = useParams();
  const token = getToken();
  const user = getUser();

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
  
  const getTopAvies = async () => {
    try {
      const response = await axios.get(`${API_URL}/avies/index`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      if (response.data) {
        setLoading(false)
      }
      console.log('hhhh', response.data.comments);
      setComment(response.data.comments)
    } catch (error) {
      console.log('data not found')
    }
  }
  
  useEffect(() => {
    fetchProfesseurs();
    getTopAvies()
  }, []);

  return (
    <Router>

      <Routes>

        <Route path="/" element={<Index profiles={profiles} loading={loading} comment={comment} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/reset-password" element={<ResetPassword  />} />
        <Route path="/RejisterPro" element={<RejisterPro />} />
        <Route path="/Rejister" element={<Rejister />} />
        <Route path="/Chat/:id/room/:chat_user_id" element={<Chat />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/detilesTutor/:id" element={<DetilesTutor />} />
        <Route path="/contactTutors/:id" element={<ContactTutors  />} />
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
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/pdfDociment/:id" element={<PdfDociment  />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<Students />} />
        <Route path="/admin/teachers" element={<Teachers />} />
        <Route path="/admin/categories" element={<Categories />} />


      </Routes>
    </Router>
  );
}

export default App;
