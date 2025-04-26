import React from 'react';
import "../assets/style/style.css";

const Alert = ({ type = 'success', title, message, onClose }) => {
  const icons = {
    success: "fa-solid fa-circle-check",
    error: "fa-solid fa-circle-xmark",
    warning: "fa-solid fa-triangle-exclamation",
    info: "fa-solid fa-circle-info"
  };

  const colors = {
    success: {
      border: "border-green-500",
      bg: "bg-green-50",
      icon: "text-green-500",
      shadow: "shadow-green-100"
    },
    error: {
      border: "border-red-500",
      bg: "bg-red-50",
      icon: "text-red-500",
      shadow: "shadow-red-100"
    },
    warning: {
      border: "border-yellow-500",
      bg: "bg-yellow-50",
      icon: "text-yellow-500",
      shadow: "shadow-yellow-100"
    },
    info: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      icon: "text-blue-500",
      shadow: "shadow-blue-100"
    }
  };

  const colorSet = colors[type] || colors.info;
  const icon = icons[type] || icons.info;

  return (
    <div
      className={`flex absolute items-center gap-4 px-5 py-4 rounded-lg shadow-lg min-w-[320px] max-w-md mx-auto my-4 mr-8 right-0 top-6 border-l-4 ${colorSet.border} ${colorSet.bg} ${colorSet.shadow}`}
      style={{ zIndex: 10, fontFamily: 'Open Sans', animation: 'slideIn 0.3s ease-out forwards' }}
    >
      <i className={`text-xl ${colorSet.icon} ${icon}`}></i>

      <div className="flex-1">
        <div className="font-semibold text-gray-800">{title}</div>
        <span className="text-sm text-gray-600">{message}</span>
      </div>

      <button 
        onClick={onClose}
        className="ml-4 h-6 w-6 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors duration-200"
        aria-label="Close"
      >
        <i className="fa-solid fa-xmark text-gray-500"></i>
      </button>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default Alert;
