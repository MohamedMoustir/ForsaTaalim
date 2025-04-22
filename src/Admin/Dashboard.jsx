
import React from "react";
import { useEffect } from "react";
import AdminNav from "../components/AdimNav";

const AdminDashboard = () => {

    return (
        <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-64 bg-white shadow-md">
          <AdminNav />
        </div>
      
        <div className="flex-1 p-4 sm:p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div className="relative w-full sm:w-auto">
              <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
              <input
                type="text"
                placeholder="Search here..."
                className="search-input pl-10 pr-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm w-full sm:w-64 focus:outline-none"
              />
            </div>
          </div>
      
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="stat-card flex items-center space-x-4">
          <div className="stat-icon students-icon">
            <i className="fas fa-users"></i>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 font-medium">Students</h3>
            <p className="text-2xl font-bold text-gray-800">932</p>
          </div>
        </div>

        <div className="stat-card flex items-center space-x-4">
          <div className="stat-icon teachers-icon">
            <i className="fas fa-chalkboard-teacher"></i>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 font-medium">Teachers</h3>
            <p className="text-2xl font-bold text-gray-800">754</p>
          </div>
        </div>

        <div className="stat-card flex items-center space-x-4">
          <div className="stat-icon events-icon">
            <i className="fas fa-calendar-alt"></i>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 font-medium">Events</h3>
            <p className="text-2xl font-bold text-gray-800">40</p>
          </div>
        </div>

        <div className="stat-card flex items-center space-x-4">
          <div className="stat-icon finance-icon">
            <i className="fas fa-money-bill-wave"></i>
          </div>
          <div>
            <h3 className="text-sm text-gray-500 font-medium">Finance</h3>
            <p className="text-2xl font-bold text-gray-800">32k</p>
          </div>
        </div>
      </div>
    </div>
       
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
              <h2 className="text-lg font-semibold text-gray-800">School Performance</h2>
              <div className="flex space-x-6 items-center">
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></span>
                  <span className="text-sm text-gray-600">This Week</span>
                  <span className="ml-2 text-sm font-semibold">1.245</span>
                </div>
                <div className="flex items-center">
                  <span className="h-3 w-3 rounded-full bg-red-400 mr-2"></span>
                  <span className="text-sm text-gray-600">Last Week</span>
                  <span className="ml-2 text-sm font-semibold">1.356</span>
                </div>
              </div>
            </div>
      
            <div className="relative w-full h-64">
              <div className="chart-container">
                <div className="chart-grid"></div>
                <div className="chart-area-yellow"></div>
                <div className="chart-area-red"></div>
                <div className="chart-line-yellow"></div>
                <div className="chart-line-red"></div>
                <div className="pulse" style={{ left: '58%', top: '40%' }}></div>
              </div>
      
              
            </div>
          </div>
        </div>
      </div>
      
      );
      
}
export default AdminDashboard;
