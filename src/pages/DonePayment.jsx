import React from "react";
import {
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from "react-router-dom";
import { Nav } from '../components/Nav';



const BookingSuccess = () => {
    const navigate = useNavigate();
    const ViewBookings = () => {
        navigate('/Mespaiements');
    }

    return (
        <>
          <Nav />
    
          <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="rounded-lg  p-6 w-full sm:w-[70%] max-w-2xl mx-auto">
    
              <div className="text-center py-8">
                <div className="w-24 h-24 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FontAwesomeIcon icon={faCheck} className="text-white text-4xl" />
                </div>
    
                <h2 className="text-2xl font-bold mb-2 text-gray-800">Booking Successful!</h2>
    
                <p className="text-gray-600 mb-6">
                  Your session with Davayne has been scheduled.
                </p>
    
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500">
                    Download PDF
                  </button>
                  <button 
                    onClick={ViewBookings} 
                    className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    View My Bookings
                  </button>
                </div>
              </div>
    
            </div>
          </div>
        </>
      );
};

export default BookingSuccess;
