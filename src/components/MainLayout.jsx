import React, { useEffect } from "react";
import { Nav } from "./Nav";
import Footer from "./Footer";
import { useLocation, useNavigate } from 'react-router-dom';
import { getUser, getToken } from "../utils/config";

const MainLayout = ({ children, showNavFooter = true, length }) => {
  const location = useLocation();
  const hideFooterPages = [
    '/detilesTutor',
    '/contactTutors',
    '/Rejister',
    '/login',
    '/favorites',
    '/Tutors',
    '/reservation',
    '/ResetPassword'
  ];
  
  const shouldShowFooter = !hideFooterPages.some(path => location.pathname.includes(path));
  const token = getToken();
  const user = getUser();
  const navigate = useNavigate();
  return (
    <div className="layout" style={{ fontFamily: 'Open Sans' }}>
      <Nav total={length} />

      <div className="content" style={{ fontFamily: 'Open Sans' }}>
        {children}
      </div>
      {shouldShowFooter && <Footer />}
    </div>
  );
};

export default MainLayout;
