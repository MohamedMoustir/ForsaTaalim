
import React, { useState } from "react";
import { useEffect } from "react";
import AdminNav from "../components/AdimNav";
import ReactDOM from "react-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  ReferenceLine,
  Area,
  Pie,
  PieChart
} from "recharts";

import axios from "axios";
import { API_URL, getToken, getUser } from "../utils/config";
const AdminDashboard = () => {

  const user = getUser();
  const token = getToken();
  const [error, setError] = useState("");
  const [datalist, setdatalist] = useState("");
  const [activite, setActivite] = useState("");
  const [perfData, setPerfData] = useState([]);


  const reportsForsataalim = async () => {
    try {
      const response = await axios.get(`${API_URL}/reports/forsataalim`, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-Type': 'aplication/json'
        }
      })
      const data = response.data;
      console.log(data);

      setdatalist(data);

    } catch (error) {
      console.error(error);
    }
  }
  const Activitehebdomadaire = async () => {
    try {
      const response = await axios.get(`${API_URL}/reports/performance`, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-Type': 'aplication/json'
        }
      })
      const data = response.data;
      console.log(data);
      setActivite(data);

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    reportsForsataalim();
    Activitehebdomadaire();
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/performance`)
      .then((res) => res.json())
      .then((data) => {
        setPerfData([
          { name: "Temps de chargement", value: data.load_time }
        ]);
      });
  }, []);

  const datas = [
    { name: "Visites", value: activite['visits'] || 0, fill: "#8884d8" },
    { name: "Inscriptions", value: activite['inscriptions'] || 0, fill: "#83a6ed" },
    { name: "Cours", value: activite['cours'] || 0, fill: "#8dd1e1" }
  ];

  const datalis = [
    { name: "Étudiants", value: datalist['totaletudiant'] },
    { name: "Tuteurs", value: datalist['totaltuteur'] },
    { name: "Réservations", value: datalist['totalBookings'] },
    { name: "Avis", value: datalist['totalReviews'] },
  ];


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
                <p className="text-2xl font-bold text-gray-800">{datalist['totaletudiant']}</p>
              </div>
            </div>

            <div className="stat-card flex items-center space-x-4">
              <div className="stat-icon teachers-icon">
                <i className="fas fa-chalkboard-teacher"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 font-medium">Teachers</h3>
                <p className="text-2xl font-bold text-gray-800">{datalist['totaltuteur']}</p>
              </div>
            </div>

            <div className="stat-card flex items-center space-x-4">
              <div className="stat-icon events-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 font-medium">Reservations</h3>
                <p className="text-2xl font-bold text-gray-800">{datalist['totalBookings']}</p>
              </div>
            </div>

            <div className="stat-card flex items-center space-x-4">
              <div className="stat-icon finance-icon">
                <i className="fas fa-money-bill-wave"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 font-medium">Reviews</h3>
                <p className="text-2xl font-bold text-gray-800">{datalist['totalReviews']}</p>
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

          <div className="relative w-full h-64 mt-14 -ml-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={datalis}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-col md:flex-row gap-6 justify-around items-center w-full mt-14">
            <div className="w-full md:w-1/2 flex justify-center h-72">
              <PieChart width={300} height={300}>
                <Pie
                  data={datas}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={perfData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis unit=" ms" />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>
      </div>
    </div>

  );

}
export default AdminDashboard;
