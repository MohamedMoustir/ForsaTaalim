import React from 'react';
import "../assets/style/style.css"
const Alert = ({ type = 'success', title, message, onClose }) => {

  return (
    <div class={`flex absolute  items-center justify-between gap-4 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-[400px] border-l-4 max-w-xl mx-auto my-4 mr-8 right-0 
      ${type === 'success' ? 'bg-white border-green-500' : ''}
      ${type === 'error' ? 'bg-white border-red-500 ' : ''}
      ${type === 'warning' ? 'bg-white border-yellow-500' : ''}
    `} style={{ zIndex: 1 }}>
      <i class={`text-xl 
        ${type === 'success' ? 'text-green-500' : ''}
        ${type === 'error' ? 'text-red-500' : ''}
        ${type === 'warning' ? 'text-yellow-500' : ''}
        fa-solid fa-check-circle`}></i>

      <div class="flex-1 ">
        <div class="font-semibold text-gray-800">{title}</div>
        <span class="text-sm text-gray-600">{message}</span>
      </div>

      <i onClick={onClose} class="fa-solid fa-xmark text-gray-400 hover:text-black cursor-pointer"></i>
    </div>

  );
};

export default Alert;
