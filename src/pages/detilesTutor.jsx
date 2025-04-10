import React, { useEffect, useRef, useState } from "react";


const  detiles = ()=>{




    return (

        <div class="container mx-auto px-4 py-8 ">
       
        <div class="flex flex-wrap gap-2 mb-6">
            <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs flex items-center">
                <i class="fa fa-plus mr-1"></i> Mathematics
            </span>
            <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs flex items-center">
                <i class="fa fa-plus mr-1"></i> Physics
            </span>
            <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs flex items-center">
                <i class="fa fa-plus mr-1"></i> Other sciences
            </span>
            <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs flex items-center">
                <i class="fa fa-plus mr-1"></i> Information Technology
            </span>
            <span class="bg-red-100 text-red-500 px-3 py-1 rounded-full text-xs flex items-center">
                <i class="fa fa-plus mr-1"></i> Chemical Engineering
            </span>
        </div>

        <div class="flex flex-col md:flex-row gap-8">
            <div class="flex-1">
                <h1 class="text-2xl md:text-3xl font-bold mb-2">Expert Online Math Tutor - Personalized, Engaging Lessons by a Seasoned Educator. Conquer Math from the Comfort of Home!</h1>
                
                <div class="mt-6">
                    <h3 class="font-semibold mb-2">Lesson location</h3>
                    <div class="inline-flex items-center bg-gray-100 rounded-full px-4 py-1">
                        <i class="fa fa-laptop mr-2"></i>
                        <span>online</span>
                    </div>
                </div>
                
                <div class="bg-blue-50 rounded-lg p-4 mt-6">
                    <div class="flex items-center mb-2">
                        <i class="fas fa-award text-blue-500 mr-2"></i>
                        <span class="text-blue-600 font-medium">Ambassador</span>
                    </div>
                    <p class="text-sm text-gray-700">
                        One of our best tutors. Quality profile, experience in their field, verified qualifications and a great response time. Davayne will be happy to arrange your first Mathematics lesson.
                    </p>
                </div>
                
                <div class="mt-6">
                    <h2 class="text-xl font-bold mb-4">About Davayne</h2>
                    <div class="space-y-4 text-gray-700">
                        <p>I am a full-time teacher at a private institution. I teach math, technical drawing, English language, information technology and human and social biology. It is outstanding work, and I want to expand into teaching online. See you in class.</p>
                        
                    </div>
                </div>
            </div>
            
            <div class="w-full md:w-80">
                <div class="bg-white rounded-lg shadow-md p-6 sticky top-4">
                    <div class="flex justify-end mb-2">
                        <button class="text-gray-400">
                            <i class="far fa-heart"></i>
                        </button>
                        <button class="text-gray-400 ml-2">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                    
                    <div class="flex flex-col items-center">
                        <img src="/api/placeholder/120/120" alt="Davayne" class="w-24 h-24 rounded-full object-cover mb-2">
                        <h3 class="font-bold text-lg">Davayne</h3>
                        <div class="flex items-center text-sm mb-4">
                            <i class="fas fa-star text-yellow-400"></i>
                            <span class="ml-1">5 (104 reviews)</span>
                        </div>
                    </div>
                    
                    <div class="space-y-3 mb-6">
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Hourly rate</span>
                            <span class="font-bold">$30</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Response Time</span>
                            <span class="font-bold">5h</span>
                        </div>
                        <div class="flex justify-between text-sm">
                            <span class="text-gray-600">Number of students</span>
                            <span class="font-bold">50+</span>
                        </div>
                    </div>
                    
                    <button class="w-full bg-red-400 hover:bg-red-500 text-white py-3 rounded-md flex justify-center items-center mb-3">
                        <i class="far fa-envelope mr-2"></i>
                        Contact
                    </button>
                    
                    <p class="text-center text-sm text-red-500">
                        <i class="fas fa-gift mr-1"></i>
                        1<sup>st</sup> lesson free
                    </p>
                </div>
            </div>
        </div>
        
        <div class="mt-12 bg-white rounded-lg shadow p-6">
            <h2 class="text-xl font-bold mb-6">About the lesson</h2>
            
            <div class="flex flex-wrap gap-4 mb-6">
                <div class="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 text-sm">
                    <i class="fa fa-school mr-2 text-gray-500"></i>
                    <span>Middle School · Sophomore · Junior +6</span>
                </div>
                <div class="inline-flex items-center bg-gray-100 rounded-full px-4 py-1 text-sm">
                    <i class="fa fa-language mr-2 text-gray-500"></i>
                    <span>English</span>
                </div>
            </div>
            
            <div class="space-y-4 text-gray-700">
                <p>Have trouble understanding your workload? There are a million tutors, and you have landed on the right page.</p>
              
            </div>
        </div>
        
        <div class="mt-12">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold flex items-center">
                    Review
                    <i class="far fa-question-circle ml-2 text-gray-400"></i>
                </h2>
                <div class="flex items-center">
                    <i class="fas fa-star text-yellow-400 mr-1"></i>
                    <span>5 (104 reviews)</span>
                </div>
            </div>
            
            <div class="space-y-4">
                <div class="bg-white rounded-lg shadow p-4">
                    <div class="flex items-center mb-2">
                        <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white mr-2">K</div>
                        <span class="font-medium">Kirsty</span>
                        <div class="ml-auto flex">
                            <i class="fas fa-star text-yellow-400"></i>
                            <span class="ml-1">5</span>
                        </div>
                    </div>
                    <p><span class="font-medium">Perfect!</span> Davayne is great!</p>
                </div>
                
                <!-- Review 2 -->
                <div class="bg-white rounded-lg shadow p-4">
                    <div class="flex items-center mb-2">
                        <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white mr-2">K</div>
                        <span class="font-medium">Kozue</span>
                        <div class="ml-auto flex">
                            <i class="fas fa-star text-yellow-400"></i>
                            <span class="ml-1">5</span>
                        </div>
                    </div>
                    <p><span class="font-medium">Perfect!</span> He is amazing teacher who thinks about each individual students a lot and respect students with really great teaching skills.</p>
                </div>
                
                <!-- Review 3 -->
                <div class="bg-white rounded-lg shadow p-4">
                    <div class="flex items-center mb-2">
                        <div class="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white mr-2">S</div>
                        <span class="font-medium">Shandell</span>
                        <div class="ml-auto flex">
                            <i class="fas fa-star text-yellow-400"></i>
                            <span class="ml-1">5</span>
                        </div>
                    </div>
                    <p><span class="font-medium">Perfect!</span> Davayne was very knowledgeable about helping me with my literature review. Davayne is very patient, and I would use his services again.</p>
                </div>
                
                <div class="text-center">
                    <button class="text-gray-600 text-sm flex items-center mx-auto">
                        See more
                        <i class="fas fa-chevron-down ml-1"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="mt-12">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-bold flex items-center">
                    Recommendations
                    <i class="far fa-question-circle ml-2 text-gray-400"></i>
                </h2>
                <div class="flex items-center">
                    <i class="far fa-thumbs-up text-blue-500 mr-1"></i>
                    <span>18</span>
                </div>
            </div>
        
            </div>
        </div>
    );

}

export default detiles ;