import React from 'react';
// import "../assets/style/style.css"
const Alert = ({ type = 'success', title, message, onClose }) => {
  // const baseStyle = {
  //   success: 'bg-green-100 border-l-4 border-green-500 text-green-700 ',
  //   error: 'bg-red-100 border-l-4 border-red-500 text-red-700',
  //   warning: 'bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700',
  //   info: 'bg-blue-100 border-l-4 border-blue-500 text-blue-700',
  // };

  return (
    // <div className={`absolute p-4 rounded-lg ${baseStyle[type]} max-w-xl mx-auto my-4 mr-8 right-0  `}>
    //   {onClose && (
    //     <button
    //       onClick={onClose}
    //       className="absolute top-2 right-2 text-xl font-bold focus:outline-none"
    //     >
    //       &times;
    //     </button>
    //   )}

    //   {title && <p className="text-lg font-semibold">{title}</p>}
    //   <p>{message}</p>
    // </div>

    <div class={`flex absolute items-center justify-between gap-4 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-[400px] border-l-4 
      ${type === 'success' ? 'bg-white border-green-500' : ''}
      ${type === 'error' ? 'bg-white border-red-500' : ''}
      ${type === 'warning' ? 'bg-white border-yellow-500' : ''}
    `}>
      <i class={`text-xl 
        ${type === 'success' ? 'text-green-500' : ''}
        ${type === 'error' ? 'text-red-500' : ''}
        ${type === 'warning' ? 'text-yellow-500' : ''}
        fa-solid fa-check-circle`}></i>

      <div class="flex-1">
        <div class="font-semibold text-gray-800">{title}</div>
        <span class="text-sm text-gray-600">{message}</span>
      </div>

      <i onClick={onClose} class="fa-solid fa-xmark text-gray-400 hover:text-black cursor-pointer"></i>
    </div>

  );
};

export default Alert;
