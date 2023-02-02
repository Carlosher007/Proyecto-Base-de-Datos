/** @format */

import React from 'react';
import CardList from '../../components/CardList';
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';

const DashboardC = () => {
  const { user, setUser } = useContext(AccountContext);

  useEffect(() => {
    loadContratos(user.id);
  }, []);

  const [contratos, setContratos] = useState([]);

  const loadContratos = async (cid) => {
    fetch(`http://localhost:8000/infoContratoC/${cid}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        toast.warning('Error al traer los contratos');
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          toast.warning('Error al traer los contratos');
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        if (data.length === 0) {
          toast.warning('No tienes ningun contrato');
        }
        setContratos(data);
      });
  };

  return <CardList data={contratos} renderType='misServiciosC' />;
};

export default DashboardC;
