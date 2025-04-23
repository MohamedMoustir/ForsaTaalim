
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
  Funnel,
  FunnelChart,
  LabelList
} from "recharts";
import axios from "axios";
import { API_URL, getToken, getUser } from "../utils/config";
const AdminDashboard = () => {

  const user = getUser();
  const token = getToken();
  const [error, setError] = useState("");
  const [datalist, setdatalist] = useState("");

  const reportsForsataalim = async () => {
    try {
      const response = await axios.get(`${API_URL}/reports/forsataalim`, {
        headers: {
          authorization: `Bearer ${token}`,
          'content-Type': 'aplication/json'
        }
      })
      const data = response.data;
      setdatalist(data);

    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    reportsForsataalim();
  }, []);

  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
  ];
  const datas = [
    {
      "value": 100,
      "name": "展现",
      "fill": "#8884d8"
    },
    {
      "value": 80,
      "name": "点击",
      "fill": "#83a6ed"
    },
    {
      "value": 50,
      "name": "访问",
      "fill": "#8dd1e1"
    },
    {
      "value": 40,
      "name": "咨询",
      "fill": "#82ca9d"
    },
    {
      "value": 26,
      "name": "订单",
      "fill": "#a4de6c"
    }
  ]
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

            <ResponsiveContainer>
              <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>

          </div>
          <div className="flex relative w-full h-64 mt-14 -ml-4">
            <div>
              <ResponsiveContainer width={600} height="80%">
                <AreaChart data={data}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                  <ReferenceLine y={4000} label="Max" stroke="red" strokeDasharray="3 3" />
                  <Area type="monotone" dataKey="uv" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div>
              <FunnelChart width={600} height={250}>
                <Tooltip />
                <Funnel
                  dataKey="value"
                  data={datas}
                  isAnimationActive
                >
                  <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
                </Funnel>
              </FunnelChart>
            </div>
          </div>
        </div>
      </div>
    </div>

  );

}
export default AdminDashboard;
