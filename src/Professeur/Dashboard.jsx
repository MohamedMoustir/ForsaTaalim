import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChartPie,
  faBullhorn,
  faComments,
  faDollarSign,
  faCog,
  faArrowLeft,
  faArrowUp,
  faArrowDown,
  faUsers,
  faEnvelope,
  faChartBar,
  faDownload,
  faPlus,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import DashboardNav from "../components/dashboardNav"

const Dashboard = () => {
  return (
    <div className="bg-gray-100">
      <div className="flex h-screen">
       <DashboardNav></DashboardNav>

        <div className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold">Welcome back!</h1>
                <p className="text-gray-600">Here's what's happening today.</p>
              </div>
              <div className="flex space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-md flex items-center space-x-2">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Export</span>
                </button>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-md flex items-center space-x-2">
                  <FontAwesomeIcon icon={faPlus} />
                  <span>New Report</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <FontAwesomeIcon icon={faDollarSign} />
                  </div>
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="ml-auto text-green-500 flex items-center">
                    <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
                    4.5%
                  </span>
                </div>
                <div className="text-3xl font-bold">$24,780</div>
                <div className="text-sm text-gray-500 mt-2">Last 30 days</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mr-3">
                    <FontAwesomeIcon icon={faUsers} />
                  </div>
                  <span className="text-gray-600">Total Users</span>
                  <span className="ml-auto text-green-500 flex items-center">
                    <FontAwesomeIcon icon={faArrowUp} className="mr-1" />
                    12.2%
                  </span>
                </div>
                <div className="text-3xl font-bold">487</div>
                <div className="text-sm text-gray-500 mt-2">Last 30 days</div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 mr-3">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <span className="text-gray-600">Messages</span>
                  <span className="ml-auto text-red-500 flex items-center">
                    <FontAwesomeIcon icon={faArrowDown} className="mr-1" />
                    1.8%
                  </span>
                </div>
                <div className="text-3xl font-bold">1,324</div>
                <div className="text-sm text-gray-500 mt-2">Last 30 days</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faChartBar} className="text-indigo-600 mr-2" />
                  <h2 className="text-lg font-semibold">Revenue Overview</h2>
                </div>
                <div className="flex space-x-4">
                  <button className="text-sm text-gray-600 hover:text-indigo-600">Weekly</button>
                  <button className="text-sm text-indigo-600 border-b-2 border-indigo-600">Monthly</button>
                  <button className="text-sm text-gray-600 hover:text-indigo-600">Yearly</button>
                </div>
              </div>
              <div className="h-64">
                <canvas id="revenueChart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
