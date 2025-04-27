
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
    <div className="flex flex-col md:flex-row min-h-screen font-sans bg-gray-100">
      <aside className="w-full md:w-64 bg-white shadow-lg z-10">
        <AdminNav id_={1} />
      </aside>

      <main className="flex-1 p-4 sm:p-6 overflow-auto">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-6">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <div className="relative w-full sm:w-auto">
            <i className="fas fa-search absolute left-4 top-3 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search here..."
              className="pl-12 pr-4 py-2 w-full sm:w-64 rounded-full border border-gray-300 bg-white focus:border-blue-400 focus:ring focus:ring-blue-100 shadow-md transition-all duration-300"
            />
          </div>
        </header>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <i className="fas fa-users text-xl"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Students</h3>
                <p className="text-2xl font-bold">{datalist['totaletudiant']}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <i className="fas fa-chalkboard-teacher text-xl"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Teachers</h3>
                <p className="text-2xl font-bold">{datalist['totaltuteur']}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                <i className="fas fa-calendar-alt text-xl"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Reservations</h3>
                <p className="text-2xl font-bold">{datalist['totalBookings']}</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <i className="fas fa-money-bill-wave text-xl"></i>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Reviews</h3>
                <p className="text-2xl font-bold">{datalist['totalReviews']}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-2xl shadow p-6 mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-6">
            <h2 className="text-xl font-semibold text-gray-700">School Performance</h2>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></span>
                <span className="text-sm text-gray-600">This Week</span>
                <span className="ml-2 text-sm font-semibold">1,245</span>
              </div>
              <div className="flex items-center">
                <span className="h-3 w-3 rounded-full bg-red-400 mr-2"></span>
                <span className="text-sm text-gray-600">Last Week</span>
                <span className="ml-2 text-sm font-semibold">1,356</span>
              </div>
            </div>
          </div>

          <div className="relative w-full h-72 mb-10">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={datalis}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="value" stroke="#6366F1" fill="#C7D2FE" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex justify-center w-full lg:w-1/2">
              <PieChart width={300} height={300}>
                <Pie
                  data={datas}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#6366F1"
                  dataKey="value"
                  label
                />
                <Tooltip />
              </PieChart>
            </div>

            <div className="flex-grow">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={perfData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis unit=" ms" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#6366F1" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </main>
    </div>
  );


}
export default AdminDashboard;
