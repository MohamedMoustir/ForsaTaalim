
import React from "react";



return (
    <body class="bg-gray-100">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 w-64 bg-red-400 text-white">
        <div class="flex items-center justify-center h-16 bg-red-500">
            <span class="text-2xl font-bold">Forsa Taalim</span>
        </div>
        <nav class="mt-10">
            <a href="#" class="flex items-center px-6 py-3 hover:bg-red-500 transition">
                <i class="fas fa-user w-5"></i>
                <span class="ml-3">Mon Profil</span>
            </a>
            <a href="#" class="flex items-center px-6 py-3 hover:bg-red-500 transition">
                <i class="fas fa-calendar-alt w-5"></i>
                <span class="ml-3">Mes Réservations</span>
            </a>
            <a href="#" class="flex items-center px-6 py-3 hover:bg-red-500 transition">
                <i class="fas fa-comments w-5"></i>
                <span class="ml-3">Messages</span>
            </a>
            <a href="#" class="flex items-center px-6 py-3 hover:bg-red-500 transition">
                <i class="fas fa-chart-line w-5"></i>
                <span class="ml-3">Statistiques</span>
            </a>
            <a href="#" class="flex items-center px-6 py-3 hover:bg-red-500 transition">
                <i class="fas fa-cog w-5"></i>
                <span class="ml-3">Paramètres</span>
            </a>
        </nav>
    </div>

    <div class="ml-64 p-8">
        <!-- Header -->
        <div class="bg-white rounded-lg shadow-sm mb-8 p-6 flex items-center justify-between">
            <h1 class="text-2xl font-bold text-gray-800">Mon Profil Professeur</h1>
            <button class="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition">
                <i class="fas fa-edit mr-2"></i>Modifier
            </button>
        </div>

        <!-- Profile Grid -->
        <div class="grid grid-cols-12 gap-6">
            <!-- Stats Cards -->
            <div class="col-span-3">
                <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-red-400">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-red-100 text-red-500">
                            <i class="fas fa-users text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-gray-500 text-sm">Étudiants</p>
                            <p class="text-2xl font-bold">156</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-span-3">
                <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-400">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-green-100 text-green-500">
                            <i class="fas fa-star text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-gray-500 text-sm">Notation</p>
                            <p class="text-2xl font-bold">4.8/5</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-span-3">
                <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-400">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-blue-100 text-blue-500">
                            <i class="fas fa-clock text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-gray-500 text-sm">Heures enseignées</p>
                            <p class="text-2xl font-bold">524h</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="col-span-3">
                <div class="bg-white rounded-lg shadow-sm p-6 border-l-4 border-yellow-400">
                    <div class="flex items-center">
                        <div class="p-3 rounded-full bg-yellow-100 text-yellow-500">
                            <i class="fas fa-euro-sign text-xl"></i>
                        </div>
                        <div class="ml-4">
                            <p class="text-gray-500 text-sm">Tarif horaire</p>
                            <p class="text-2xl font-bold">25€</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Main Profile Section -->
            <div class="col-span-8">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <div class="flex items-start">
                        <img src="/api/placeholder/120/120" alt="Photo de profil" class="w-32 h-32 rounded-full border-4 border-red-400">
                        <div class="ml-6 flex-1">
                            <h2 class="text-3xl font-bold text-gray-800">Nom Prénom</h2>
                            <p class="text-gray-600 mt-1">professeur@email.com</p>
                            <div class="mt-4 grid grid-cols-3 gap-4">
                                <div>
                                    <p class="text-gray-500 text-sm">Âge</p>
                                    <p class="font-semibold">25 ans</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Téléphone</p>
                                    <p class="font-semibold">+212 6 00 00 00 00</p>
                                </div>
                                <div>
                                    <p class="text-gray-500 text-sm">Localisation</p>
                                    <p class="font-semibold">Casablanca, Maroc</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="mt-8">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Biographie</h3>
                        <p class="text-gray-600 leading-relaxed">
                            Passionné par l'enseignement depuis plus de 10 ans, je me spécialise dans l'accompagnement personnalisé des élèves. Mon approche pédagogique s'adapte à chaque profil d'apprenant pour garantir une progression optimale.
                        </p>
                    </div>
                    
                    <div class="mt-8">
                        <h3 class="text-xl font-bold text-gray-800 mb-4">Matières enseignées</h3>
                        <div class="flex flex-wrap gap-2">
                            <span class="px-4 py-2 bg-red-100 text-red-700 rounded-full">Mathématiques</span>
                            <span class="px-4 py-2 bg-red-100 text-red-700 rounded-full">Physique</span>
                            <span class="px-4 py-2 bg-red-100 text-red-700 rounded-full">Chimie</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Sidebar -->
            <div class="col-span-4">
                <!-- Diplômes -->
                <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Diplômes</h3>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div class="bg-red-100 p-2 rounded-full">
                                <i class="fas fa-graduation-cap text-red-500"></i>
                            </div>
                            <div class="ml-3">
                                <p class="font-semibold">Master en Sciences de l'Éducation</p>
                                <p class="text-sm text-gray-500">Université Hassan II - 2018</p>
                            </div>
                        </div>
                     
                    </div>
                </div>
                
                <!-- Expériences -->
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Expériences</h3>
                    <div class="space-y-4">
                        <div class="flex items-start">
                            <div class="bg-red-100 p-2 rounded-full">
                                <i class="fas fa-briefcase text-red-500"></i>
                            </div>
                            <div class="ml-3">
                                <p class="font-semibold">Professeur de mathématiques</p>
                                <p class="text-sm text-gray-500">Lycée International - 2019 à aujourd'hui</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <!-- Video Section -->
            <div class="col-span-12">
                <div class="bg-white rounded-lg shadow-sm p-6">
                    <h3 class="text-xl font-bold text-gray-800 mb-4">Présentation vidéo</h3>
                    <div class="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
                        <div class="text-center">
                            <i class="fas fa-video text-6xl text-gray-400 mb-4"></i>
                            <p class="text-gray-600">Votre vidéo de présentation apparaîtra ici</p>
                            <button class="mt-4 bg-red-400 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition">
                                Télécharger une vidéo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


</body>
)