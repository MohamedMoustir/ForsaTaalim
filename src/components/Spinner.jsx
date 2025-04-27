
import React from "react";
import "../assets/style/style.css"
const Spinner = () => {
    return (
       
       
              <div 
                className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-50 to-white z-50"
                style={{ 
                  fontFamily: 'Open Sans',
                  backdropFilter: 'blur(5px)'
                }}
              >
                <div className="relative">
                  <div className="animate-spin rounded-full h-24 w-24 border-4 border-red-400 border-t-transparent"></div>
                                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-300 border-b-transparent" 
                         style={{ animationDirection: 'reverse', animationDuration: '1.2s' }}></div>
                  </div>
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="h-8 w-8 text-red-500 loading-pulse"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v4m0 8v4m8-8h-4M4 12H0m17.657-6.343l-2.828 2.829M6.343 17.657l-2.828 2.829M17.657 17.657l-2.828-2.829M6.343 6.343L3.515 9.172"
                      />
                    </svg>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-red-500 text-lg font-semibold typing-animation">
                    Veuillez patienter...
                  </p>
                  <p className="text-gray-500 text-sm mt-2 fade-in-animation">
                    Chargement en cours
                  </p>
                </div>
                
                <div className="mt-6 w-64 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="loading-progress-bar h-full bg-red-400"></div>
                </div>
                
              
              </div>
            );
        
    
}
export default Spinner;