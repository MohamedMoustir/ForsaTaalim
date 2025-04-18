import React from "react";
import '../assets/js/main';
import '../assets/style/style.css';
import image1 from '../../../forsaTaalim/resources/image/Frame 42731904.png';

import image2 from '../../../forsaTaalim/resources/image/Frame 427319048.png';

const Footer = () => {
  return (
    <footer className="bg-blue-900  text-white py-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
                    <div>
                        <h2 className="text-xl font-bold mb-3">FORSATAALIM</h2>
                        <p className="text-gray-300">Edumodo is perfectly suitable for school, college, and university
                            websites with
                            an online education system.</p>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-3">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:underline">Online Documentation</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">How to Start a Course</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Create a Support Ticket</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Our Refund Policy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-3">Resources</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-300 hover:underline">Upcoming Events</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Terms and Conditions</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Become a Teacher</a></li>
                            <li><a href="#" className="text-gray-300 hover:underline">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-bold mb-3">Recent Posts</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="#" className="flex items-center space-x-3">
                                    <img src={image1} alt="Post Image"
                                        className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="text-gray-300 font-semibold">Complete Blender Creator: Learn</p>
                                        <p className="text-sm text-gray-400">January 22, 2025</p>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center space-x-3">
                                    <img src={image2} alt="Post Image"
                                        className="w-16 h-16 object-cover rounded" />
                                    <div>
                                        <p className="text-gray-300 font-semibold">Traditional Elementary Education News</p>
                                        <p className="text-sm text-gray-400">January 22, 2025</p>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-10 pt-6">
                    <div
                        className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 text-sm text-gray-400">
                        <p>Copyright © ForsaTaalim 2025 | moustir</p>
                        <div className="flex space-x-4 mt-4 md:mt-0">
                            <a href="#" className="hover:text-gray-200"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" className="hover:text-gray-200"><i className="fab fa-twitter"></i></a>
                            <a href="#" className="hover:text-gray-200"><i className="fab fa-instagram"></i></a>
                            <a href="#" className="hover:text-gray-200"><i className="fab fa-youtube"></i></a>
                        </div>
                    </div>
                </div>
            </footer>
  );
};

export default Footer;
