/** @format */

import React from 'react';
import { AccountContext } from '../../components/AccountContex';
import { useContext } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const Contratar = (props) => {
  
  const { user, setUser } = useContext(AccountContext);
  const { eid } = useParams();
  const [contrato, setContrato] = useState({});


  useEffect(() => {
    loadContrato();
  }, []);

  const loadContrato = async () => {
    setContrato({})
  };


  return <div>Contratar</div>;
};

export default Contratar;
