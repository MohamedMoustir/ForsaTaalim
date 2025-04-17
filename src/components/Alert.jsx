import React from 'react';

const Alert = ({ type = 'success', title, message, onClose }) => {
  const baseStyle = {
    success: 'bg-green-100 border-l-4 border-green-500 text-green-700',
    error: 'bg-red-100 border-l-4 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-l-4 border-blue-500 text-blue-700',
  };

  return (
    <div className={`relative p-4 rounded-lg ${baseStyle[type]} max-w-xl mx-auto my-4`}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-xl font-bold focus:outline-none"
        >
          &times;
        </button>
      )}

      {title && <p className="text-lg font-semibold">{title}</p>}
      <p>{message}</p>
    </div>
  );
};

export default Alert;
