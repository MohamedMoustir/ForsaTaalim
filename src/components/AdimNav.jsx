import React, { useEffect } from "react";
import { useState } from "react";
import '../assets/style/style.css'
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { getUser } from "../utils/config";
const AdminNav = ({id_}) => {
const  user = getUser();
  useEffect(()=>{
    if (user) {
      if (user.role == 'etudiant' ||user.role == 'tuteur' ) {
       navigate('/login'); 
    }  
    }
    
  },[])

  const navigate = useNavigate();
  return (
    <div className="sidebar w-56 text-white min-h-[100%]" style={{ fontFamily: 'Open Sans' }}>
      <div className="p-6 flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">
          A
        </div>
        <h1 className="text-xl font-bold">Admin</h1>
      </div>

      <div className="mt-8 px-4">
        <a onClick={() => navigate('/adminDashboard')} className={`cursor-pointer nav-link flex items-center px-4 py-3 text-white mb-2 ${id_ == 1 ? 'active-link':''}`}>
          <i className="fas fa-home mr-3"></i>
          <span>Dashboard</span>
        </a>
        <a onClick={() => navigate('/admin/students')} className={`cursor-pointer nav-link flex items-center px-4 py-3 text-white mb-2 ${id_ == 2 ? 'active-link':''}`}>
          <i className="fas fa-user-graduate mr-3"></i>
          <span>Students</span>
        </a>
        <a onClick={() => navigate('/admin/teachers')} className={`cursor-pointer nav-link flex items-center px-4 py-3 text-white mb-2 ${id_ == 3 ? 'active-link':''}`}>
          <i className="fas fa-chalkboard-teacher mr-3"></i>
          <span>Teachers</span>
        </a>
        <a onClick={() => navigate('/admin/Payments')} className={`cursor-pointer nav-link flex items-center px-4 py-3 text-white mb-2 ${id_ == 4 ? 'active-link':''}`}>
          <i className="fas fa-calendar-alt mr-3"></i>
          <span>Payments</span>
        </a>
        <a onClick={() => navigate('/admin/categories')} className={`cursor-pointer nav-link flex items-center px-4 py-3 text-white mb-2 ${id_ == 5 ? 'active-link':''}`}>
        <i className="fas fa-tags mr-3"></i>
        <span>Categories</span>
        </a>
        <a onClick={()=>navigate('/logout')} className="nav-link flex items-center px-4 py-3 text-white mb-2 hover:bg-opacity-10 hover:bg-white rounded-lg">
        <i className="fas fa-sign-out-alt  mr-3"></i>
        <span>Logout</span>
        </a>
      </div>
      
    </div>
    
  );

}
export default AdminNav;