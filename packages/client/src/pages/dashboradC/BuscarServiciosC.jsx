/** @format */

import React from 'react';
import CardList from '../../components/CardList';
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';

const BuscarServiciosC = () => {
  const { user, setUser } = useContext(AccountContext);
  const [servicios, setServicios] = useState([]);
  const [labores, setLabores] = useState([]);
  const [selectedLabor, setSelectedLabor] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('');
  const [showCardList, setShowCardList] = useState(false);

  useEffect(() => {
    loadLabores();
  }, []);

  const loadLabores = async () => {
    fetch(`http://localhost:8000/laboresDisponibles`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        toast.warning('Error al traer los labores');
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          toast.warning('Error al traer los labores');
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.length === 0) {
          toast.warning('Es posible que no haya labores o debas elegir uno');
        }
        const laboresArray = data.map((item) => item.labor);
        setLabores(laboresArray); 
      });
  };

  const loadContratos = async (cid) => {
    fetch(`http://localhost:8000/buscarTrabajadores/${cid}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        labor: selectedLabor,
        filter: selectedFilter,
      }),
    })
      .catch((err) => {
        toast.warning('Error al buscar labores');
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          toast.warning('Error mas 40');
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        //si no hay labores disponibles es decir que la data es un array vacio hacemos un toast
        if (data.length === 0) {
          toast.warning('No hay labores disponibles');
          return;
        }
        //Ponemos los labores en setServicios
        setServicios(data);
        setShowCardList(true);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedLabor === '' || selectedFilter === '') {
      toast.error('Selecciona una labor y un filtro para continuar.');
      return;
    }
    setShowCardList(false);
    loadContratos(user.id);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className='flex items-center'>
        <div className='w-1/4 mr-4'>
          <label
            className='block text-white-700 font-medium mb-2'
            htmlFor='labor'
          >
            Labor
          </label>
          <select
            className='block w-full bg-white border border-gray-400 rounded-lg appearance-none py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='labor'
            value={selectedLabor}
            onChange={(e) => setSelectedLabor(e.target.value)}
          >
            <option value=''>Selecciona una labor</option>
            {labores.map((labor) => (
              <option key={labor} value={labor}>
                {labor}
              </option>
            ))}
          </select>
        </div>
        <div className='w-1/4 mr-4'>
          <label
            className='block text-white-700 font-medium mb-2'
            htmlFor='filter'
          >
            Filtro
          </label>
          <select
            className='block w-full bg-white border border-gray-400 rounded-lg appearance-none py-2 px-4 pr-8 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
            id='filter'
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value=''>Selecciona un filtro</option>
            <option value='distancia'>Distancia</option>
            <option value='calificacion'>Calificación</option>
            <option value='precio'>Precio</option>
          </select>
        </div>
        <div className='w-1/4'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Buscar
          </button>
        </div>
      </form>
      <div className='mt-4'>
        {showCardList && (
          <CardList
            data={servicios}
            renderType='buscarServicioC'
            criterio={selectedFilter}
          />
        )}
      </div>
    </>
  );
};

export default BuscarServiciosC;
