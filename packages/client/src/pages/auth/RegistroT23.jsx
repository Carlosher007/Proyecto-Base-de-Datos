/** @format */

import React, { useState } from 'react';

const RegistroT = () => {
  const [file, setFile] = useState(null);
  const [file2, setFile2] = useState(null);

  const handleClick = async (e) => {
    e.preventDefault();
    if (!file || !file2) return alert('Debe elegir ambas imágenes');

    try {
      const formData = new FormData();
      formData.append('doc_foto', file);
      formData.append('foto_perfil', file2);
      formData.append('oy', "ooo");

      const response = await fetch('http://localhost:8000/auth/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }

      alert('Archivos subidos con éxito');
    } catch (error) {
      console.error(error);
      alert('Hubo un error al subir los archivos');
    }
  };

  const handleChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleChange2 = (event) => {
    setFile2(event.target.files[0]);
  };

  return (
    <div className='container mx-auto p-10'>
      <div className='flex flex-col items-center'>
        <h3 className='text-2xl font-medium mb-5'>React File Upload</h3>
        <form className='w-full max-w-sm'>
          <div className='mb-5'>
            <input
              type='file'
              className='p-2 border rounded'
              onChange={handleChange}
            />
          </div>
          <div className='mb-5'>
            <input
              type='file'
              className='p-2 border rounded'
              onChange={handleChange2}
            />
          </div>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded'
            type='submit'
            onClick={handleClick}
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistroT;
