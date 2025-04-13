import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./Auth/Login";
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
function App() {
  return (
    <Router>
      {/* <nav className="flex">
        <ul>
          <li><Link to="/index"></Link></li>
          <li><Link to="/login">login</Link></li>
          <li><Link to="/RejisterPro">Rejister</Link></li>
          <li><Link to="/Rejister">Rejister</Link></li>
          <li><Link to="/Chat">Chat</Link></li>
        </ul>
      </nav> */}

      <Routes>

      <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RejisterPro" element={<RejisterPro />} />
        <Route path="/Rejister" element={<Rejister />} />
        <Route path="/Chat/:id" element={<Chat />} />
        <Route path="/tutors" element={<Tutors />} />
        <Route path="/detilesTutor/:id" element={<DetilesTutor />} />
        <Route path="/contactTutors/:id" element={<ContactTutors />} />
        <Route path="/reservation/:id" element={<Reservation />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorites" element={<Myfavorites />} />
        <Route path="/disponibilites/:id" element={<Disponibilites />} />


      </Routes>
    </Router>
  );
}

export default App;
