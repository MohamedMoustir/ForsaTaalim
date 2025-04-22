import React from "react";
import { useState } from "react";
import '../assets/style/style.css'
const AdminDashboard = () => {

    return (
        <div className="sidebar w-56 text-white min-h-screen">
          <div className="p-6 flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center font-bold text-white">
              A
            </div>
            <h1 className="text-xl font-bold">Admin</h1>
          </div>
      
          <div className="mt-8 px-4">
            <a href="#" className="nav-link flex items-center px-4 py-3 text-white mb-2 active-link">
              <i className="fas fa-home mr-3"></i>
              <span>Dashboard</span>
            </a>
            <a href="#" className="nav-link flex items-center px-4 py-3 text-white mb-2 hover:bg-opacity-10 hover:bg-white rounded-lg">
              <i className="fas fa-user-graduate mr-3"></i>
              <span>Students</span>
            </a>
            <a href="#" className="nav-link flex items-center px-4 py-3 text-white mb-2 hover:bg-opacity-10 hover:bg-white rounded-lg">
              <i className="fas fa-chalkboard-teacher mr-3"></i>
              <span>Teachers</span>
            </a>
            <a href="#" className="nav-link flex items-center px-4 py-3 text-white mb-2 hover:bg-opacity-10 hover:bg-white rounded-lg">
              <i className="fas fa-calendar-alt mr-3"></i>
              <span>Event</span>
            </a>
            <a href="#" className="nav-link flex items-center px-4 py-3 text-white mb-2 hover:bg-opacity-10 hover:bg-white rounded-lg">
              <i className="fas fa-money-bill-wave mr-3"></i>
              <span>Finance</span>
            </a>
            <a href="#" className="nav-link flex items-center px-4 py-3 text-white mb-2 hover:bg-opacity-10 hover:bg-white rounded-lg">
              <i className="fas fa-user mr-3"></i>
              <span>User</span>
            </a>
          </div>
        </div>
      );
      
}
export default AdminDashboard;