import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/Auth/Login";
import Rejister from "./components/Auth/Rejister";
import Chat from "./components/Chats/Chats";
import RejisterPro from "./components/Auth/RejisterPro";
import Index from "./components/index";



function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/index"></Link></li>
          <li><Link to="/login">login</Link></li>
          <li><Link to="/RejisterPro">Rejister</Link></li>
          <li><Link to="/Rejister">Rejister</Link></li>
          <li><Link to="/Chat">Chat</Link></li>
        </ul>
      </nav>

      <Routes>
      <Route path="/login" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/RejisterPro" element={<RejisterPro />} />
        <Route path="/Rejister" element={<Rejister />} />
        <Route path="/Chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
