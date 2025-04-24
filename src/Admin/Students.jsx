

import React from "react";

const Students = () => {


    return (
<body class="bg-gray-50">
    <div class="container mx-auto p-4 max-w-7xl">
        <div class="bg-white rounded-lg shadow-sm p-6">
            <div class="flex justify-between items-center mb-6">
                <h1 class="text-2xl font-bold text-indigo-900">Students</h1>
                <div class="flex items-center gap-4">
                    <button class="text-gray-500 hover:text-gray-700">
                        <i class="fa-regular fa-bell text-xl"></i>
                    </button>
                    <button class="text-gray-500 hover:text-gray-700">
                        <i class="fa-solid fa-gear text-xl"></i>
                    </button>
                    <div class="flex items-center gap-2">
                        <div class="text-right">
                            <p class="text-sm font-medium text-indigo-900">Nobita A.</p>
                            <p class="text-xs text-gray-500">Admin</p>
                        </div>
                        <div class="w-10 h-10 rounded-full bg-purple-200"></div>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center mb-6">
                <div class="relative">
                    <input type="text" placeholder="Search here..." class="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 w-64">
                    <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
                </div>
                <div class="flex gap-3">
                    <div class="relative">
                        <button class="flex items-center justify-between gap-2 px-4 py-2 border border-indigo-200 rounded-lg text-indigo-600 bg-white w-32">
                            <span>Newest</span>
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    <button class="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg">
                        <i class="fas fa-plus"></i>
                        <span>New Student</span>
                    </button>
                </div>
            </div>

            <div class="overflow-x-auto">
                <table class="w-full border-collapse">
                    <thead>
                        <tr class="border-b border-gray-200">
                            <th class="p-4 text-left w-12">
                                <input type="checkbox" class="rounded">
                            </th>
                            <th class="p-4 text-left text-sm font-medium text-gray-600">Name</th>
                            <th class="p-4 text-left text-sm font-medium text-gray-600">ID</th>
                            <th class="p-4 text-left text-sm font-medium text-gray-600">Date</th>
                            <th class="p-4 text-left text-sm font-medium text-gray-600">Parent Name</th>
                            <th class="p-4 text-left text-sm font-medium text-gray-600">City</th>
                            <th class="p-4 text-left text-sm font-medium text-gray-600">Contact</th>
                            <th class="p-4 text-left text-sm font-medium text-gray-600">Grade</th>
                            <th class="p-4 text-left text-sm font-medium text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="border-l-4 border-indigo-500 bg-indigo-50">
                            <td class="p-4">
                                <input type="checkbox" class="rounded" checked>
                            </td>
                            <td class="p-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-purple-200"></div>
                                    <span class="font-medium">Samanta William</span>
                                </div>
                            </td>
                            <td class="p-4 text-gray-600">#123456789</td>
                            <td class="p-4 text-gray-600">March 25, 2021</td>
                            <td class="p-4 text-gray-600">Maria William</td>
                            <td class="p-4 text-gray-600">Jakarta</td>
                            <td class="p-4">
                                <div class="flex gap-2">
                                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                        <i class="fas fa-phone-alt"></i>
                                    </button>
                                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                        <i class="fas fa-envelope"></i>
                                    </button>
                                </div>
                            </td>
                            <td class="p-4">
                                <span class="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm">VII A</span>
                            </td>
                            <td class="p-4">
                                <button class="text-gray-500">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="p-4">
                                <input type="checkbox" class="rounded">
                            </td>
                            <td class="p-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-purple-200"></div>
                                    <span class="font-medium">Tony Soap</span>
                                </div>
                            </td>
                            <td class="p-4 text-gray-600">#123456789</td>
                            <td class="p-4 text-gray-600">March 25, 2021</td>
                            <td class="p-4 text-gray-600">James Soap</td>
                            <td class="p-4 text-gray-600">Jakarta</td>
                            <td class="p-4">
                                <div class="flex gap-2">
                                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                        <i class="fas fa-phone-alt"></i>
                                    </button>
                                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                        <i class="fas fa-envelope"></i>
                                    </button>
                                </div>
                            </td>
                            <td class="p-4">
                                <span class="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm">VII B</span>
                            </td>
                            <td class="p-4">
                                <button class="text-gray-500">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                            </td>
                        </tr>
                        <tr class="border-l-4 border-indigo-500 bg-indigo-50">
                            <td class="p-4">
                                <input type="checkbox" class="rounded" checked>
                            </td>
                            <td class="p-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-purple-200"></div>
                                    <span class="font-medium">Karen Hope</span>
                                </div>
                            </td>
                            <td class="p-4 text-gray-600">#123456789</td>
                            <td class="p-4 text-gray-600">March 25, 2021</td>
                            <td class="p-4 text-gray-600">Justin Hope</td>
                            <td class="p-4 text-gray-600">Jakarta</td>
                            <td class="p-4">
                                <div class="flex gap-2">
                                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                        <i class="fas fa-phone-alt"></i>
                                    </button>
                                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                        <i class="fas fa-envelope"></i>
                                    </button>
                                </div>
                            </td>
                            <td class="p-4">
                                <span class="px-3 py-1 bg-indigo-600 text-white rounded-lg text-sm">VII C</span>
                            </td>
                            <td class="p-4">
                                <button class="text-gray-500">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                            </td>
                        </tr>
                        <tr>
                            <td class="p-4">
                                <input type="checkbox" class="rounded">
                            </td>
                            <td class="p-4">
                                <div class="flex items-center gap-3">
                                    <div class="w-8 h-8 rounded-full bg-purple-200"></div>
                                    <span class="font-medium">Jordan Nico</span>
                                </div>
                            </td>
                            <td class="p-4 text-gray-600">#123456789</td>
                            <td class="p-4 text-gray-600">March 25, 2021</td>
                            <td class="p-4 text-gray-600">Armando Nico</td>
                            <td class="p-4 text-gray-600">Jakarta</td>
                            <td class="p-4">
                                <div class="flex gap-2">
                                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                        <i class="fas fa-phone-alt"></i>
                                    </button>
                                    <button class="w-8 h-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-500">
                                        <i class="fas fa-envelope"></i>
                                    </button>
                                </div>
                            </td>
                            <td class="p-4">
                                <span class="px-3 py-1 bg-orange-500 text-white rounded-lg text-sm">VII B</span>
                            </td>
                            <td class="p-4">
                                <button class="text-gray-500">
                                    <i class="fas fa-ellipsis-h"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</body>

    );
}

export default Students;