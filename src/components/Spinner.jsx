
import React from "react";

const Spinner = () => {
    return (
<div className="fixed top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-gradient-to-br from-gray-100 to-white z-50">
<div className="relative">
                <div className="animate-spin rounded-full h-20 w-20 border-4 border-red-400 border-t-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                        className="h-8 w-8 text-red-400"
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
            <p className="mt-4 text-red-400 text-lg font-semibold animate-pulse">
                Veuillez patienter...
            </p>
        </div>
    );
}
export default Spinner;