import React from "react";
import Nav from "./Nav"; 
import Footer from "./Footer"; 
import { useLocation } from 'react-router-dom';
const MainLayout = ({ children , showNavFooter = true  }) => {
    const location = useLocation();
    const isDetailPage = location.pathname.includes('/detilesTutor');
    const iscontactTutorsPage = location.pathname.includes('/contactTutors');
    const login = location.pathname.includes('/login');
    const rejister = location.pathname.includes('/Rejister');
    const favorites = location.pathname.includes('/favorites');
    const Tutors = location.pathname.includes('/Tutors');

  return (
    <div className="layout">
    <Nav /> 

    <div className="content">
      {children} 
    </div>
    {!isDetailPage && !iscontactTutorsPage && !rejister && !login && !favorites && !Tutors &&<Footer />} 
  </div>
  );
};

export default MainLayout;
