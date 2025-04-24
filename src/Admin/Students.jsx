

import React from "react";

const Students = () => {
    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="container mx-auto p-4 max-w-7xl">
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold text-indigo-900">Students</h1>
                        <div className="flex items-center gap-4">
                            <button className="text-gray-500 hover:text-gray-700">
                                <i className="fa-regular fa-bell text-xl"></i>
                            </button>
                            <button className="text-gray-500 hover:text-gray-700">
                                <i className="fa-solid fa-gear text-xl"></i>
                            </button>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <p className="text-sm font-medium text-indigo-900">Nobita A.</p>
                                    <p className="text-xs text-gray-500">Admin</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-purple-200"></div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center mb-6">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64"
                            />
                            <i className="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                        </div>
                        <div className="flex gap-3">
                            <div className="relative">
                                <button className="flex items-center justify-between gap-2 px-4 py-2 border border-indigo-200 rounded-lg text-indigo-600 bg-white w-32">
                                    <span>Newest</span>
                                    <i className="fas fa-chevron-down"></i>
                                </button>
                            </div>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">
                                <i className="fas fa-plus"></i>
                                <span>New Student</span>
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="p-4 text-left w-12">
                                        <input type="checkbox" className="rounded" />
                                    </th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Name</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">ID</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Date</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Parent Name</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">City</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Contact</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Grade</th>
                                    <th className="p-4 text-left text-sm font-medium text-gray-600">Action</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr className="border-l-4 border-indigo-500 bg-indigo-50">
                                    <td className="p-4">
                                        <input type="checkbox" className="rounded" defaultChecked />
                                    </td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-purple-200"></div>
                                            <span className="font-medium">Samanta William</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-600">#123456789</td>
                                    <td className="p-4 text-gray-600">March 25, 2021</td>
                                    <td className="p-4 text-gray-600">Maria William</td>
                                    <td className="p-4 text-gray-600">Jakarta</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                                <i className="fas fa-phone-alt"></i>
                                            </button>
                                            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                                <i className="fas fa-envelope"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm">VII A</span>
                                    </td>
                                    <td className="p-4">
                                        <button className="text-gray-500">
                                            <i className="fas fa-ellipsis-h"></i>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};




export default Students;