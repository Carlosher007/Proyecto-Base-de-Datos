/** @format */

import React from 'react';

const ButtonSeguir = ({ text, onClick = () => {} }) => {
  return (
    <button
      data-testid='button'
      onClick={onClick}
      className='bg-indigo-700 text-white font-bold text-lg py-3 px-6 rounded-xl hover:bg-indigo-500 shadow-md my-2'
    >
      {text}
    </button>
  );
};

export default ButtonSeguir;
