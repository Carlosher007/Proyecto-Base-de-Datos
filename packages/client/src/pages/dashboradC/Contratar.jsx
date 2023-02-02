/** @format */

import React from 'react';
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomCardContrato from '../../components/CustomCardContrato';

const Contratar = (props) => {
  
  const { user, setUser } = useContext(AccountContext);
  const { eid } = useParams();
  const [contrato, setContrato] = useState({});


  useEffect(() => {
    loadContrato(eid);
  }, []);

  const loadContrato = async (eid) => {
    fetch(`http://localhost:8000/infoServicio/${eid}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch((err) => {
        toast.warning('Error al traer el contrato');
        return;
      })
      .then((res) => {
        if (!res || !res.ok || res.status >= 400) {
          toast.warning('Error al traer el contrato');
          return;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) return;
        // console.log(data[0])
        setContrato(data[0]);
      });
  };


  return (
    <div className='grid-container'>
        {/* <div className='grid-item' key={index}> */}
          <CustomCardContrato 
            nombre={contrato.nombre}
            descripcion={contrato.descripcion}
            apellido={contrato.apellido}
            labor={contrato.labor}
            tipo_trabajo={contrato.tipo_trabajo}
            precio={contrato.precio}
            ejerce_id={contrato.ejerce_id}
            trabajador_id={contrato.trabajador_id}
          />
        {/* </div> */}
    </div>
  );
};

export default Contratar;
