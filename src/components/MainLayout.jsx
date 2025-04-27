import React, { useEffect } from "react";
import { Nav } from "./Nav";
import Footer from "./Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser, getToken } from "../utils/config";
const MainLayout = ({ children, showNavFooter = true, length }) => {
  const location = useLocation();
  const isDetailPage = location.pathname.includes('/detilesTutor');
  const iscontactTutorsPage = location.pathname.includes('/contactTutors');
  const login = location.pathname.includes('/login');
  const rejister = location.pathname.includes('/Rejister');
  const favorites = location.pathname.includes('/favorites');
  const Tutors = location.pathname.includes('/Tutors');
  const Resiravtioon = location.pathname.includes('/reservation');
  const ResetPassword = location.pathname.includes('/ResetPassword');
  const token = getToken();
  const user = getUser();
  const navigate = useNavigate();
  return (
    <div className="layout" style={{ fontFamily: 'Open Sans' }}>
      <Nav total={length} />

      <div className="content" style={{ fontFamily: 'Open Sans' }}>
        {children}
      </div>
      {!isDetailPage && !iscontactTutorsPage && !rejister && !login && !favorites && !Tutors && !Resiravtioon && ResetPassword && <Footer />}
    </div>
  );
};

export default MainLayout;
