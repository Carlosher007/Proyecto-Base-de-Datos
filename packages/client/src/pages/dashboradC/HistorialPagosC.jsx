/** @format */

import React from 'react';
import CardList from '../../components/CardList';
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';


const HistorialPagosC = () => {

    const { user, setUser } = useContext(AccountContext);

    useEffect(() => {
      loadContratos(user.id);
    }, []);

    const [pagos, setPagos] = useState([]);

    const loadContratos = async (cid) => {
      fetch(`http://localhost:8000/infoTransaccionC/${cid}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .catch((err) => {
          toast.warning('Error al traer los pagos');
          return;
        })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            toast.warning('Error al traer los pagos');
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          if (data.length === 0) {
            toast.warning('No tienes ningun pago');
          }
          setPagos(data);
        });
    };
  return <CardList data={pagos} renderType='historialPagosC' />;
};

export default HistorialPagosC;
