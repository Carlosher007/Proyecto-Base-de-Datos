/** @format */

import React from 'react';
import CardList from '../../components/CardList';
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';

const NotificacionesT = () => {
  const { user, setUser } = useContext(AccountContext);

  useEffect(() => {
    loadNotificaciones(user.id);
  }, []);

  const [notificaciones, setNotificaciones] = useState([]);


    const loadNotificaciones = async (tid) => {
      fetch(`http://localhost:8000/notificacionesT/${tid}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .catch((err) => {
          toast.warning('Error al traer las notificaciones');
          return;
        })
        .then((res) => {
          if (!res || !res.ok || res.status >= 400) {
            toast.warning('Error al traer las notificaciones');
            return;
          }
          return res.json();
        })
        .then((data) => {
          if (!data) return;
          if (data.length === 0) {
            toast.warning('No tienes ninguna notificacion');
          }
          setNotificaciones(data);
        });
    };

  return <CardList data={notificaciones} renderType='notificacionT' />;
};

export default NotificacionesT;
