import React from "react";
import {
    faCheck 
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from "../components/Nav";
const BookingSuccess = () => {
  return (
    <div className="min-h-screen w-[70%] relative left-[15%]">
     
      <div className="flex items-center mb-6">
      <Nav></Nav>
        <button className="text-gray-600 hover:text-red-500 transition-colors">
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>

      <div className="mt-8 bg-white rounded-lg p-6">
        <div className="text-center py-8">
          <div className="w-24 h-24 bg-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <FontAwesomeIcon  icon={faCheck} className="text-white text-5xl"/>
        
          </div>
          <h2 className="text-2xl font-bold mb-2">Booking Successful!</h2>
          <p className="text-gray-600 mb-6">
            Your session with Davayne has been scheduled.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition-colors">
              Download PDF
            </button>
            <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-md font-medium transition-colors">
              View My Bookings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;
